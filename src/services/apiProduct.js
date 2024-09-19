import supabase, { supabaseUrl } from "./supabase";
import { ANON_PROD_URL } from "../utils/constants";
import { getToday } from "../utils/helpers";

export async function getMostSoldProduct(date) {
    const { data, error } = await supabase
        .from("orderItems")
        .select(
            "created_at, productId,quantity,product(name,imgs:prodImage(imgUrl,imgAlt))"
        )
        .gte("created_at", date)
        .lte("created_at", getToday({ end: true }));

    if (error) {
        console.error(error);
        throw new Error("Orders could not get loaded");
    }

    const aggregatedData = data.reduce((acc, item) => {
        if (acc[item.productId]) {
            acc[item.productId].quantity += item.quantity;
        } else {
            acc[item.productId] = {
                name: item.product.name,
                quantity: item.quantity,
                imgUrl: item.product.imgs.at(0).imgUrl,
                imgAlt: item.product.imgs.at(0).imgAlt,
            };
        }
        return acc;
    }, {});

    // Convert aggregated data to an array of objects
    const result = Object.entries(aggregatedData).map(
        ([id, { name, quantity, imgUrl, imgAlt }]) => ({
            id,
            name,
            quantity,
            imgUrl,
            imgAlt,
        })
    );

    // Sort by quantity in descending order
    result.sort((a, b) => b.quantity - a.quantity);

    return result.slice(0, 6);
}

export async function getProductInfo(prodId) {
    let { data, error } = await supabase
        .from("product")
        .select(
            "*,imgs:prodImage(id,imgUrl,imgAlt),specifications:prodSpecifications(id,key,value)"
        )
        .eq("id", prodId)
        .single();
    if (error) {
        console.error(error);
        throw new Error("Product could not be loaded");
    }

    const category =
        data.categoryId === null
            ? ["all"]
            : await getCategoryPath(data.categoryId);

    const result = {
        ...data,
        category,
    };

    return result;
}

async function getCategoryPath(prodId) {
    const catsPath = [];

    async function getCategory(id) {
        let { data, error } = await supabase
            .from("category")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            console.error(error);
            throw new Error("Categories's path could not be loaded");
        }

        catsPath.push(data.name);
        if (data.parentId !== null) {
            await getCategory(data.parentId);
        }
    }

    await getCategory(prodId);

    return catsPath.reverse();
}

export async function getProducts({ category, page, pageSize, searchQuery }) {
    let query;
    if (category === "all" || category === "products") {
        query = supabase.from("product").select("id,name", { count: "exact" });
    } else {
        let categoryArr = [];
        let { data: categoryData, error: categoryError } = await supabase
            .from("category")
            .select("*");

        if (categoryError) {
            console.error(categoryError.message);
            throw new Error("Products could not be loaded");
        }
        let parentCategoryId = categoryData.find(
            (item) => item.name === category
        )?.id;
        categoryArr.push(parentCategoryId);
        findChildren(categoryData, parentCategoryId, categoryArr);

        query = supabase
            .from("product")
            .select("id,name,categoryId", {
                count: "exact",
            })
            .in(
                "categoryId",
                categoryArr.map((catId) => catId)
            );
    }
    if (page) {
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        query = query.range(from, to);
    }
    if (searchQuery) {
        query = query.or(
            `name.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%`
        );
    }

    let { data, error, count } = await query;
    if (error) {
        console.error(error);
        throw new Error("Products could not be loaded");
    }

    return { data, count };
}

function findChildren(data, idParent, categoryArr) {
    for (const category of data) {
        if (category.parentId === idParent) {
            categoryArr.push(category.id);
            findChildren(data, category.id, categoryArr);
        }
    }
}
export async function addNewProduct({ imgs, specs, prodData }) {
    const { data, error } = await supabase
        .from("product")
        .insert([prodData])
        .select()
        .single();
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
    let imgsUrl = [];
    for (const img of imgs) {
        const imgName = `${Math.random()}-${img.name}`.replaceAll("/", "");
        const imgUrl = `${supabaseUrl}/storage/v1/object/public/productImgs/${imgName}`;

        const { error: storageError } = await supabase.storage
            .from("productImgs")
            .upload(imgName, img);

        if (storageError) {
            await supabase.from("product").delete().eq("id", data.id);
            console.error(storageError);
            throw new Error(
                "Product image could not be uploaded and the product was not created"
            );
        }

        imgsUrl.push({ imgUrl, imgAlt: imgName, productId: data.id });
    }
    if (imgsUrl.length === 0) {
        imgsUrl.push({
            imgUrl: ANON_PROD_URL,
            imgAlt: "prodct_image",
            productId: data.id,
        });
    }
    const { error: imgError } = await supabase
        .from("prodImage")
        .insert(imgsUrl);
    if (imgError) {
        console.log(imgError.message);
        throw new Error(imgError.message);
    }

    if (specs.length > 0) {
        const updatedSpecs = specs.map((obj) => ({
            ...obj,
            productId: data.id,
        }));
        const { error: specError } = await supabase
            .from("prodSpecifications")
            .insert(updatedSpecs);
        if (specError) {
            console.log(specError.message);
            throw new Error(specError.message);
        }
    }
}
export async function deleteProduct(id) {
    const { error } = await supabase.from("product").delete().eq("id", id);
    if (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

export async function editProduct({ imgs, specs, prodData, id }) {
    if (Object.keys(prodData).length !== 0) {
        const { error } = await supabase
            .from("product")
            .update(prodData)
            .eq("id", id);
        if (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }
    let imgsUrl = [];
    for (const img of imgs.added) {
        const imgName = `${Math.random()}-${img.name}`.replaceAll("/", "");
        const imgUrl = `${supabaseUrl}/storage/v1/object/public/productImgs/${imgName}`;

        const { error: storageError } = await supabase.storage
            .from("productImgs")
            .upload(imgName, img);

        if (storageError) {
            throw new Error("Product image could not be uploaded");
        }

        imgsUrl.push({ imgUrl, imgAlt: imgName, productId: id });
    }
    if (imgsUrl.length > 0) {
        const { error: imgError } = await supabase
            .from("prodImage")
            .insert(imgsUrl);
        if (imgError) {
            console.log(imgError.message);
            throw new Error(imgError.message);
        }
    }
    if (imgs.deleted.length > 0) {
        const { error: imgError } = await supabase
            .from("prodImage")
            .delete()
            .in("id", imgs.deleted);
        if (imgError) {
            console.log(imgError.message);
            throw new Error(imgError.message);
        }
    }

    if (specs.added.length > 0) {
        const updatedSpecs = specs.added.map((obj) => ({
            ...obj,
            productId: id,
        }));
        const { error: specError } = await supabase
            .from("prodSpecifications")
            .insert(updatedSpecs);
        if (specError) {
            console.log(specError.message);
            throw new Error(specError.message);
        }
    }
    if (specs.deleted.length > 0) {
        const { error: specError } = await supabase
            .from("prodSpecifications")
            .delete()
            .in("id", specs.deleted);
        if (specError) {
            console.log(specError.message);
            throw new Error(specError.message);
        }
    }
    return id;
}
