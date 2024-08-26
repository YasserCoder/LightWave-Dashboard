import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getMostSoldCategory(date) {
    let { data: categoryData, error: categoryError } = await supabase
        .from("category")
        .select("*");

    if (categoryError) {
        console.error(categoryError.message);
        throw new Error("Products could not be loaded");
    }

    const { data: orderItems, error } = await supabase
        .from("orderItems")
        .select(
            "created_at,quantity,product:productId (category:categoryId (id,parentId))"
        )
        .gte("created_at", date)
        .lte("created_at", getToday({ end: true }));

    if (error) {
        console.error(error);
        throw new Error("Orders could not get loaded");
    }

    const aggregatedData = {};

    for (const item of orderItems) {
        const parentCategory =
            item.product.category.parentId === null
                ? item.product.category.name
                : findParent(categoryData, item.product.category.parentId);

        if (aggregatedData[parentCategory]) {
            aggregatedData[parentCategory] += item.quantity;
        } else {
            aggregatedData[parentCategory] = item.quantity;
        }
    }

    // Convert aggregated data to an array of objects
    const result = Object.entries(aggregatedData).map(
        ([category, quantity]) => ({
            category,
            quantity,
        })
    );

    return result;
}
function findParent(data, idParent) {
    let parentCategoryId = idParent;
    let childId = 0;
    while (parentCategoryId !== null) {
        childId = parentCategoryId;
        parentCategoryId = data.find(
            (item) => item.id === parentCategoryId
        )?.parentId;
    }
    let parentName = data.find((item) => item.id === childId)?.name;
    return parentName;
}
