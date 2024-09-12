import { useRef, useState } from "react";

import { useSelectCategories } from "../../hook/category/useSelectCategories";
import { useAddProduct } from "../../hook/product/useAddProduct";
import { isWhitespace } from "../../utils/helpers";

import AvailabilityToggleSwitch from "../../ui/AvailabilityToggleSwitch";
import Loader from "../../ui/Loader";
import MiniLoader from "../../ui/MiniLoader";

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

function ProductForm({ onClose }) {
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const { isLoading, cats } = useSelectCategories();
    const { createProduct } = useAddProduct();

    function handleSubmit(e) {
        e.preventDefault();
        setIsCreating(true);
        if (!form.name || !form.price) {
            setError("fill all the necessary cases");
            return;
        }
        if (
            isWhitespace(form.name) ||
            !isNaN(form.name) ||
            form.name.length < 6
        ) {
            setError("Invalide name");
            return;
        }
        if (isNaN(Number(form.price))) {
            setError("Invalide price");
            return;
        }
        if (form.sale !== "") {
            if (isNaN(Number(form.sale)) || Number(form.sale) >= 100) {
                setError("Invalide sale");
                return;
            }
        }
        let updateObj = {
            name: form.name,
            price: Number(form.price),
            sale: Number(form.sale),
            description: form.description,
            categoryId:
                Number(form.category) === 0 ? "" : Number(form.category),
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
    if (isLoading) return <Loader />;
    return (
        <form className="flex flex-col gap-y-5 w-full" onSubmit={handleSubmit}>
            <h1 className="text-3xl capitalize font-bold">add new product</h1>
            <div className="flex gap-y-10 flex-col">
                <div className="flex gap-x-5 gap-y-7 justify-between flex-wrap">
                    <InputCase
                        label={"Name"}
                        value={form.name}
                        setValue={setForm}
                        theKey={"name"}
                        width={"w-full"}
                    />
                    <Categories
                        value={form.category}
                        cats={cats}
                        setValue={setForm}
                    />
                    <InputCase
                        label={"Brand"}
                        value={form.brand}
                        setValue={setForm}
                        theKey={"brand"}
                        width={"w-full xs:w-44"}
                    />
                    <InputCase
                        label={"Garantee"}
                        value={form.garantee}
                        setValue={setForm}
                        theKey={"garantee"}
                        width={"w-full xs:w-44"}
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
                        width={"w-full xs:w-40"}
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
                <div className="flex gap-x-5 gap-y-7 flex-wrap justify-between">
                    <Images imgs={form.imgs} setImgs={setForm} />
                    <Description value={form.description} setForm={setForm} />
                    <Specifications
                        specs={form.specifications}
                        setSpecs={setForm}
                    />
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
                    <Btn
                        type={"reset"}
                        label={"cancel"}
                        onClick={() => onClose?.()}
                        disabled={isCreating}
                    />
                    <Btn
                        type={"submit"}
                        label={"add product"}
                        onClick={handleSubmit}
                        disabled={isCreating}
                    />
                </div>
            </div>
        </form>
    );
}
function Btn({ onClick, type, label, disabled }) {
    return (
        <button
            type={type}
            className={`capitalize font-semibold py-1 px-2 xs:text-lg xs:py-1.5 xs:px-5 rounded-lg disabled:bg-opacity-30 disabled:cursor-not-allowed ${
                type === "submit"
                    ? "bg-colored text-white hover:bg-sky-600"
                    : "bg-transparent border border-content hover:bg-main hover:text-bkg-main"
            }`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
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
        <div className="flex flex-col gap-y-2 lg:max-w-64">
            <label className="font-semibold xs:font-extrabold capitalize mb-0.5">
                Images
            </label>
            <input
                id="img-upload"
                type="file"
                accept="image/*"
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
                    htmlFor="img-upload"
                    className="cursor-pointer bg-bkg-secondary text-5xl flex justify-center items-center text-content h-20 w-20 rounded-lg duration-300 hover:text-gray-300 hover:bg-input"
                >
                    <BsPlusCircle />
                </label>
            </div>
        </div>
    );
}
function Specifications({ specs, setSpecs }) {
    const [content, setContent] = useState({ key: "", value: "" });
    const inputKey = useRef(null);

    const addSpecification = () => {
        if (content.value !== "") {
            setSpecs((prevValue) => ({
                ...prevValue,
                specifications: [...specs, content],
            }));
            setContent({ key: "", value: "" });
            if (inputKey.current) {
                inputKey.current.focus();
            }
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
                    ref={inputKey}
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
        <div
            className={`flex flex-col gap-y-2.5 ${
                label === "Name" && "w-full xs:w-64"
            }`}
        >
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
        <div className="flex flex-col gap-y-2.5 w-full xs:w-[250px] sm:w-72">
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
                className="w-full h-full  px-4 py-1.5 bg-input border border-content text-sm xs:text-base outline-colored"
                // rows={3}
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
