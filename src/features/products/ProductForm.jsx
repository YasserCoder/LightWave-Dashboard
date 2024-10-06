import { useRef, useState } from "react";

import { useSelectCategories } from "../../hook/category/useSelectCategories";

import AvailabilityToggleSwitch from "../../ui/AvailabilityToggleSwitch";
import Loader from "../../ui/Loader";
import Form from "../../ui/Form";
import InputBox from "../../ui/InputBox";
import BottomForm from "../../ui/BottomForm";
import SelectBox from "../../ui/SelectBox";

import { FaPlus, FaX } from "react-icons/fa6";
import { BsPlusCircle } from "react-icons/bs";

function ProductForm({
    onClose,
    handleSubmit,
    form,
    setForm,
    error,
    isWorking,
    edit,
}) {
    const { isLoading, cats } = useSelectCategories();
    if (isLoading) return <Loader />;
    return (
        <Form title={"add new product"} handleSubmit={handleSubmit}>
            <div className="flex gap-y-10 flex-col">
                <div className="flex gap-x-5 gap-y-7 justify-between flex-wrap">
                    <InputBox
                        label={"Name"}
                        value={form.name}
                        setValue={setForm}
                        theKey={"name"}
                        width={"w-full"}
                        style="w-full xs:w-64"
                    />
                    <SelectBox
                        value={form.categoryId}
                        setValue={setForm}
                        theKey={"categoryId"}
                        label="categories"
                        width="w-full xs:w-64"
                    >
                        <option value={""}></option>
                        {cats.map((option) => (
                            <option value={option.id} key={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </SelectBox>

                    <InputBox
                        label={"Brand"}
                        value={form.brand}
                        setValue={setForm}
                        theKey={"brand"}
                        width={"w-full xs:w-44"}
                    />
                    <InputBox
                        label={"Garantee"}
                        value={form.garantee}
                        setValue={setForm}
                        theKey={"garantee"}
                        width={"w-full xs:w-44"}
                    />
                    <InputBox
                        label={"Price ($)"}
                        value={form.price}
                        setValue={setForm}
                        theKey={"price"}
                        width={"w-full xs:w-48"}
                    />
                    <InputBox
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
            <BottomForm
                isLoading={isWorking}
                error={error}
                handleSubmit={handleSubmit}
                onReset={() => onClose?.()}
                label={edit ? "edit product" : "add product"}
            />
        </Form>
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
                {imgs?.map((image, index) => (
                    <div key={index} className="relative">
                        <img
                            src={
                                image?.imgUrl
                                    ? image.imgUrl
                                    : URL.createObjectURL(image)
                            }
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
            {specs?.map((spec, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                    <p
                        title={spec.key}
                        className="w-16 xs:w-24 text-sm line-clamp-1 overflow-hidden font-semibold"
                    >
                        {`${spec.key === null ? "" : spec.key}`}
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
function Description({ value, setForm }) {
    return (
        <div className="flex flex-col gap-y-2.5 w-full xs:w-[250px] sm:w-72">
            <label className="font-semibold xs:font-extrabold capitalize">
                Description
            </label>
            <textarea
                value={value === null ? "" : value}
                onChange={(e) =>
                    setForm((prevValue) => ({
                        ...prevValue,
                        description: e.target.value,
                    }))
                }
                placeholder="Description"
                className="w-full h-full  px-4 py-1.5 bg-input border border-content text-sm xs:text-base outline-colored"
            />
        </div>
    );
}
export default ProductForm;
