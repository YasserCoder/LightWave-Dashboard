import { useState } from "react";

import { useSelectCategories } from "../../hook/category/useSelectCategories";
import { useAddCategory } from "../../hook/category/useAddCategory";
import { isWhitespace } from "../../utils/helpers";

import Form from "../../ui/Form";
import FormBtn from "../../ui/FormBtn";
import MiniLoader from "../../ui/MiniLoader";
import Loader from "../../ui/Loader";

function CategoryForm({ onClose }) {
    const [error, setError] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [name, setName] = useState("");
    const [parent, setParent] = useState("");

    const { isLoading, cats } = useSelectCategories();
    const { addCategory } = useAddCategory();

    function handleSubmit(e) {
        e.preventDefault();
        setIsCreating(true);
        if (
            name === "" ||
            isWhitespace(name) ||
            !isNaN(name) ||
            name.length < 3
        ) {
            setError("Invalide name");
            setIsCreating(false);
            return;
        }
        let category = {
            name,
        };
        if (Number(parent) !== 0)
            category = { ...category, parentId: Number(parent) };

        addCategory(category, {
            onSettled: () => {
                setName("");
                setParent("");
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
                <div
                    className={`flex flex-col gap-y-2.5 w-full xs:w-56 lg:w-64`}
                >
                    <label className="font-semibold xs:font-extrabold capitalize">
                        name
                    </label>
                    <input
                        value={name}
                        placeholder={"Name"}
                        className={`w-full px-4 py-1.5 bg-input border border-content text-sm xs:text-base outline-colored`}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className="flex flex-col gap-y-2.5">
                    <label className="font-semibold xs:font-extrabold capitalize">
                        Parent Category
                    </label>
                    <select
                        value={parent}
                        onChange={(e) => {
                            setParent(e.target.value);
                        }}
                        className="w-full xs:w-56 lg:w-64 px-4 py-1.5 bg-input border border-content text-sm xs:text-base outline-colored"
                    >
                        <option value={""}></option>
                        {cats.map((option) => (
                            <option value={option.id} key={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div
                className={`flex flex-col gap-y-4 sm:flex-row ${
                    error ? "sm:justify-between" : "justify-end"
                } sm:items-center w-full border-t border-content mt-2 pt-4 pb-2`}
            >
                {error && <p className="text-red-500 ">{`** ${error}`}</p>}
                <div className="flex gap-3 items-center self-end flex-wrap">
                    {isCreating && <MiniLoader />}
                    <FormBtn
                        type={"reset"}
                        label={"cancel"}
                        onClick={() => onClose?.()}
                        disabled={isCreating}
                    />
                    <FormBtn
                        type={"submit"}
                        label={"add new category"}
                        onClick={handleSubmit}
                        disabled={isCreating}
                    />
                </div>
            </div>
        </Form>
    );
}

export default CategoryForm;
