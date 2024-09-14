import { useEffect, useState } from "react";

import { useProductDetails } from "../../hook/product/useProductDetails";
import { useEditProduct } from "../../hook/product/useEditProduct";
import { isWhitespace } from "../../utils/helpers";

import Loader from "../../ui/Loader";
import ProductForm from "./ProductForm";

const initialForm = {
    name: "",
    price: "",
    sale: "",
    soldOut: false,
    garantee: "No",
    brand: "",
    description: "",
    categoryId: "",
    specifications: [],
    imgs: [],
};

function EditProduct({ id, onClose }) {
    const { isLoading, productInfo } = useProductDetails(id);

    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const { editProduct } = useEditProduct();

    useEffect(() => {
        setForm(productInfo);
    }, [productInfo]);

    function handleSubmit(e) {
        e.preventDefault();
        setIsEditing(true);
        if (!form.name || !form.price) {
            setError("fill all the necessary cases");
            setIsEditing(false);
            return;
        }
        if (
            isWhitespace(form.name) ||
            !isNaN(form.name) ||
            form.name.length < 6
        ) {
            setError("Invalide name");
            setIsEditing(false);
            return;
        }
        if (isNaN(Number(form.price))) {
            setError("Invalide price");
            setIsEditing(false);
            return;
        }
        if (form.sale !== "") {
            if (isNaN(Number(form.sale)) || Number(form.sale) >= 100) {
                setError("Invalide sale");
                setIsEditing(false);
                return;
            }
        }
        let updateObj = {
            name: form.name,
            price: Number(form.price),
            sale: Number(form.sale),
            description: form.description,
            categoryId:
                Number(form.categoryId) === 0 ? "" : Number(form.categoryId),
            garantee: form.garantee,
            soldOut: form.soldOut,
            brand: form.brand,
        };
        Object.keys(updateObj).forEach((item) => {
            if (
                updateObj[item] === "" ||
                updateObj[item] === productInfo[item]
            ) {
                delete updateObj[item];
            }
        });
        const updatedImgs = compareArrays(productInfo.imgs, form.imgs);
        const updatedSpecs = compareKeyValueArrays(
            productInfo.specifications,
            form.specifications
        );

        editProduct(
            {
                prodData: updateObj,
                imgs: updatedImgs,
                specs: updatedSpecs,
                id: id,
            },
            {
                onSettled: () => {
                    setIsEditing(false);
                    onClose?.();
                },
            }
        );
    }
    if (isLoading) return <Loader />;

    return (
        <ProductForm
            isWorking={isEditing}
            onClose={onClose}
            handleSubmit={handleSubmit}
            form={form}
            setForm={setForm}
            error={error}
            edit={true}
        />
    );
}

function compareKeyValueArrays(array1, array2) {
    const added = [];
    const deleted = [];

    // Create a Set of IDs from the second array for efficient lookup
    const array2Ids = new Set(
        array2.filter((item) => item.id).map((item) => item.id)
    );

    // Find the deleted items (ids exist in array1 but not in array2)
    array1.forEach((item1) => {
        if (!array2Ids.has(item1.id)) {
            deleted.push(item1.id);
        }
    });

    // Find the added {key, value} pairs in array2
    array2.forEach((item2) => {
        // If the item in array2 has no ID, compare by {key, value}
        if (!item2.id) {
            const existsInArray1 = array1.some(
                (item1) =>
                    item1.key === item2.key && item1.value === item2.value
            );
            if (!existsInArray1) {
                added.push({ key: item2.key, value: item2.value });
            }
        }
    });

    // Sort the added items by 'key'
    added.sort((a, b) => a.key.localeCompare(b.key));

    return { added, deleted };
}

function compareArrays(array1, array2) {
    const added = [];
    const deleted = [];

    // Create a Set of IDs from the second array for efficient lookup
    const array2Ids = new Set(
        array2.filter((item) => item.id).map((item) => item.id)
    );

    // Find the deleted items (exist in array1 but not in array2)
    array1.forEach((item1) => {
        if (!array2Ids.has(item1.id)) {
            deleted.push(item1.id);
        }
    });

    // Find the added items (those with name and path in array2)
    array2.forEach((item2) => {
        if (item2.name) {
            added.push(item2);
        }
    });

    return { added, deleted };
}
export default EditProduct;
