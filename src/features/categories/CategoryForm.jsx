import { useState } from "react";

import { useSelectCategories } from "../../hook/category/useSelectCategories";
import { useAddCategory } from "../../hook/category/useAddCategory";
import { isWhitespace } from "../../utils/helpers";

import Form from "../../ui/Form";
import Loader from "../../ui/Loader";
import InputBox from "../../ui/InputBox";
import SelectBox from "../../ui/SelectBox";
import BottomForm from "../../ui/BottomForm";

const initialForm = {
    name: "",
    parent: "",
};

function CategoryForm({ onClose }) {
    const [error, setError] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [form, setForm] = useState(initialForm);

    const { isLoading, cats } = useSelectCategories();
    const { addCategory } = useAddCategory();

    function handleSubmit(e) {
        e.preventDefault();
        setIsCreating(true);
        if (
            form.name === "" ||
            isWhitespace(form.name) ||
            !isNaN(form.name) ||
            form.name.length < 3
        ) {
            setError("Invalide name");
            setIsCreating(false);
            return;
        }
        let category = {
            name: form.name,
        };
        if (Number(form.parent) !== 0)
            category = { ...category, parentId: Number(form.parent) };

        addCategory(category, {
            onSettled: () => {
                setForm(initialForm);
                setError("");
                setIsCreating(false);
                onClose?.();
            },
        });
    }
    if (isLoading) return <Loader />;
    return (
        <Form handleSubmit={handleSubmit} title={"add new Category"}>
            <div className="flex flex-col sm:flex-row gap-y-8 gap-x-10 my-5">
                <InputBox
                    label={"Name"}
                    value={form.name}
                    setValue={setForm}
                    theKey={"name"}
                    width={"w-full"}
                    style="w-full xs:w-56 lg:w-64"
                />
                <SelectBox
                    value={form.parent}
                    setValue={setForm}
                    theKey="parent"
                    label="Parent Category"
                    width="w-full xs:w-56 lg:w-64"
                >
                    <option value={""}></option>
                    {cats.map((option) => (
                        <option value={option.id} key={option.id}>
                            {option.name}
                        </option>
                    ))}
                </SelectBox>
            </div>
            <BottomForm
                isLoading={isCreating}
                error={error}
                handleSubmit={handleSubmit}
                onReset={() => onClose?.()}
                label={"add new category"}
            />
        </Form>
    );
}

export default CategoryForm;
