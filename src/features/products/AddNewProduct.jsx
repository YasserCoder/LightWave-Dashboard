import { useState } from "react";

import { useAddProduct } from "../../hook/product/useAddProduct";
import { isWhitespace } from "../../utils/helpers";

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

function AddNewProduct({ onClose }) {
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const { createProduct } = useAddProduct();

    function handleSubmit(e) {
        e.preventDefault();
        setIsCreating(true);
        if (!form.name || !form.price) {
            setError("fill all the necessary cases");
            setIsCreating(false);
            return;
        }
        if (
            isWhitespace(form.name) ||
            !isNaN(form.name) ||
            form.name.length < 6
        ) {
            setError("Invalide name");
            setIsCreating(false);
            return;
        }
        if (isNaN(Number(form.price))) {
            setError("Invalide price");
            setIsCreating(false);
            return;
        }
        if (form.sale !== "") {
            if (isNaN(Number(form.sale)) || Number(form.sale) >= 100) {
                setError("Invalide sale");
                setIsCreating(false);
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
            if (updateObj[item].length === 0) {
                delete updateObj[item];
            }
        });
        createProduct(
            {
                prodData: updateObj,
                imgs: form.imgs,
                specs: form.specifications,
            },
            {
                onSettled: () => {
                    setForm(initialForm);
                    setIsCreating(false);
                    onClose?.();
                },
            }
        );
    }
    return (
        <ProductForm
            isWorking={isCreating}
            onClose={onClose}
            handleSubmit={handleSubmit}
            form={form}
            setForm={setForm}
            error={error}
            edit={false}
        />
    );
}

export default AddNewProduct;
