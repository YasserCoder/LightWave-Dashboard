import { useState } from "react";

import { useSelectCategories } from "../../hook/category/useSelectCategories";

import AvailabilityToggleSwitch from "../../ui/AvailabilityToggleSwitch";
import Loader from "../../ui/Loader";

const initialForm = {
    name: "",
    price: 0,
    sale: 0,
    soldOut: false,
    garantee: "No",
    brand: "",
    description: "",
    category: "",
};

function ProductForm() {
    const [form, setForm] = useState(initialForm);
    const { isLoading, cats } = useSelectCategories();
    if (isLoading) return <Loader />;
    return (
        <form className="flex flex-col gap-y-5 w-full">
            <h1 className="text-3xl capitalize font-bold">add new product</h1>
            <div className="flex gap-y-8 flex-wrap gap-x-5 justify-between ">
                <InputCase
                    label={"Name"}
                    value={form.name}
                    setValue={setForm}
                    theKey={"name"}
                    width={"w-72"}
                />
                <InputCase
                    label={"Brand"}
                    value={form.brand}
                    setValue={setForm}
                    theKey={"brand"}
                    width={"w-56"}
                />
                <InputCase
                    label={"Garantee"}
                    value={form.garantee}
                    setValue={setForm}
                    theKey={"garantee"}
                    width={"w-56"}
                />
                <InputCase
                    label={"Price ($)"}
                    value={form.price}
                    setValue={setForm}
                    theKey={"price"}
                    width={"w-48"}
                />
                <InputCase
                    label={"Sale % (< 100)"}
                    value={form.sale}
                    setValue={setForm}
                    theKey={"sale"}
                    width={"w-44"}
                />
                <Categories
                    value={form.category}
                    cats={cats}
                    setValue={setForm}
                />
                <Description value={form.description} setForm={setForm} />
                <div className="flex gap-3 items-center self-end">
                    <span className="font-semibold xs:font-extrabold capitalize">
                        on stock :
                    </span>
                    <AvailabilityToggleSwitch
                        value={form.soldOut}
                        setValue={setForm}
                        theKey={"soldOut"}
                    />
                </div>
            </div>
        </form>
    );
}

function InputCase({ label, value, setValue, width, theKey }) {
    return (
        <div className="flex flex-col gap-y-2.5 ">
            <label className="font-semibold xs:font-extrabold capitalize">
                {label}
            </label>
            <input
                value={value}
                placeholder={label}
                className={`${width} px-4 py-1.5 bg-input border border-content text-sm xs:text-base outline-colored`}
                onChange={(e) => {
                    setValue((prevValue) => ({
                        ...prevValue,
                        [theKey]: e.target.value,
                    }));
                }}
            />
        </div>
    );
}
function Description({ value, setForm }) {
    return (
        <div className="flex flex-col gap-y-2.5 ">
            <label className="font-semibold xs:font-extrabold capitalize">
                Description
            </label>
            <textarea
                value={value}
                onChange={(e) =>
                    setForm((prevValue) => ({
                        ...prevValue,
                        description: e.target.value,
                    }))
                }
                placeholder="Description"
                className="w-[250px] sm:w-72 px-4 py-1.5 bg-input border border-content text-sm xs:text-base outline-colored"
                rows={5}
            />
        </div>
    );
}

function Categories({ value, setValue, cats }) {
    return (
        <div className="flex flex-col gap-y-2.5 ">
            <label className="font-semibold xs:font-extrabold capitalize">
                Categories
            </label>
            <select
                value={value}
                onChange={(e) => {
                    setValue((prevValue) => ({
                        ...prevValue,
                        category: e.target.value,
                    }));
                }}
                className="w-64 px-4 py-1.5 bg-input border border-content text-sm xs:text-base outline-colored"
            >
                <option value={null}></option>
                {cats.map((option) => (
                    <option value={option.id} key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
export default ProductForm;
