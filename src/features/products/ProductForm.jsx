import { useState } from "react";

import { useSelectCategories } from "../../hook/category/useSelectCategories";

import AvailabilityToggleSwitch from "../../ui/AvailabilityToggleSwitch";
import Loader from "../../ui/Loader";

import { FaPlus, FaX } from "react-icons/fa6";
import { BsPlusCircle } from "react-icons/bs";

const initialForm = {
    name: "",
    price: "",
    sale: "",
    soldOut: false,
    garantee: "No",
    brand: "",
    description: "",
    category: "",
    specifications: [],
    imgs: [],
};

function ProductForm() {
    const [form, setForm] = useState(initialForm);
    const { isLoading, cats } = useSelectCategories();
    if (isLoading) return <Loader />;
    return (
        <form
            className="flex flex-col gap-y-5 w-full"
            onSubmit={() => console.log("Submit")}
        >
            <h1 className="text-3xl capitalize font-bold">add new product</h1>
            <div className="flex gap-y-8 flex-wrap gap-x-5 justify-between ">
                <Images imgs={form.imgs} setImgs={setForm} />
                <InputCase
                    label={"Name"}
                    value={form.name}
                    setValue={setForm}
                    theKey={"name"}
                    width={"w-full xs:w-64"}
                />
                <InputCase
                    label={"Brand"}
                    value={form.brand}
                    setValue={setForm}
                    theKey={"brand"}
                    width={"w-full xs:w-56"}
                />
                <InputCase
                    label={"Garantee"}
                    value={form.garantee}
                    setValue={setForm}
                    theKey={"garantee"}
                    width={"w-full xs:w-56"}
                />
                <InputCase
                    label={"Price ($)"}
                    value={form.price}
                    setValue={setForm}
                    theKey={"price"}
                    width={"w-full xs:w-48"}
                />
                <InputCase
                    label={"Sale % (< 100)"}
                    value={form.sale}
                    setValue={setForm}
                    theKey={"sale"}
                    width={"w-full xs:w-44"}
                />
                <Categories
                    value={form.category}
                    cats={cats}
                    setValue={setForm}
                />
                <Description value={form.description} setForm={setForm} />
                <Specifications
                    specs={form.specifications}
                    setSpecs={setForm}
                />
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
function Images({ imgs, setImgs }) {
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImgs((prevImages) => ({ ...prevImages, imgs: [...imgs, ...files] }));
    };

    const removeImage = (index) => {
        const newImgs = imgs.filter((_, imgIndex) => imgIndex !== index);
        setImgs((prevImages) => ({ ...prevImages, imgs: newImgs }));
    };

    return (
        <div className="flex flex-col gap-y-2 sm:w-64">
            <label className="font-semibold xs:font-extrabold capitalize mb-0.5">
                Images
            </label>
            <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleImageChange}
                className="hidden"
            />
            <div className="flex flex-wrap gap-2">
                {imgs.map((image, index) => (
                    <div key={index} className="relative">
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Product Preview"
                            className="h-20 w-20 object-cover rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full size-4 text-xs hover:bg-red-700"
                        >
                            &times;
                        </button>
                    </div>
                ))}
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-bkg-secondary text-5xl flex justify-center items-center text-content h-20 w-20 rounded-lg bg-opacity-45 duration-300 hover:text-white hover:bg-opacity-100"
                >
                    <BsPlusCircle />
                </label>
            </div>
        </div>
    );
}
function Specifications({ specs, setSpecs }) {
    const [content, setContent] = useState({ key: "", value: "" });

    const addSpecification = () => {
        if (content.value !== "") {
            setSpecs((prevValue) => ({
                ...prevValue,
                specifications: [...specs, content],
            }));
            setContent({ key: "", value: "" });
        }
    };

    const removeSpecification = (index) => {
        const newSpecifications = specs.filter(
            (_, specIndex) => specIndex !== index
        );
        setSpecs((prevValue) => ({
            ...prevValue,
            specifications: newSpecifications,
        }));
    };
    const handleEnterPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            addSpecification();
        }
    };
    return (
        <div className="flex flex-col gap-y-2 w-full xs:w-auto">
            <label className="font-semibold xs:font-extrabold capitalize mb-0.5">
                Specifications
            </label>
            <div className="flex space-x-2 mb-2">
                <p className="w-16 xs:w-24 text-sm font-bold capitalize">key</p>
                <p className="flex-1 block w-full xs:flex-none xs:w-44 text-sm font-bold capitalize">
                    value
                </p>
            </div>
            {specs.map((spec, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                    <p
                        title={spec.key}
                        className="w-16 xs:w-24 text-sm line-clamp-1 overflow-hidden font-semibold"
                    >
                        {`${spec.key}`}
                    </p>
                    <p
                        title={spec.value}
                        className="flex-1 block w-full xs:flex-none xs:w-44 text-sm line-clamp-1 overflow-hidden"
                    >
                        {spec.value}
                    </p>
                    <button
                        type="button"
                        onClick={() => removeSpecification(index)}
                        className="text-red-500 hover:text-red-700"
                    >
                        <FaX />
                    </button>
                </div>
            ))}
            <div className="flex space-x-2 mb-2">
                <input
                    type="text"
                    placeholder="Key"
                    value={content.key}
                    onChange={(e) => {
                        setContent((prevValue) => ({
                            ...prevValue,
                            key: e.target.value,
                        }));
                    }}
                    onKeyDown={(e) => handleEnterPress(e)}
                    className="w-16 xs:w-24 py-0.5 px-1.5 bg-input border border-content text-sm outline-colored"
                />
                <input
                    type="text"
                    placeholder="Value"
                    value={content.value}
                    onChange={(e) =>
                        setContent((prevValue) => ({
                            ...prevValue,
                            value: e.target.value,
                        }))
                    }
                    onKeyDown={(e) => handleEnterPress(e)}
                    className="flex-1 block w-full xs:flex-none xs:w-44 py-0.5 px-1.5 bg-input border border-content text-sm outline-colored"
                />
                <button
                    type="button"
                    onClick={addSpecification}
                    className="text-green-500 hover:text-green-700"
                >
                    <FaPlus className="text-xl" />
                </button>
            </div>
        </div>
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
                className="w-full xs:w-[250px] sm:w-72 px-4 py-1.5 bg-input border border-content text-sm xs:text-base outline-colored"
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
                className="w-full xs:w-64 px-4 py-1.5 bg-input border border-content text-sm xs:text-base outline-colored"
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
