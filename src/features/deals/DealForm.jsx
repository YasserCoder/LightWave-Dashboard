import { useRef, useState } from "react";

import { useAddDeal } from "../../hook/deal/useAddDeal";

import Form from "../../ui/Form";
import InputBox from "../../ui/InputBox";
import SelectBox from "../../ui/SelectBox";
import BottomForm from "../../ui/BottomForm";

import { BsPlusCircle } from "react-icons/bs";
import { FaPlus, FaX } from "react-icons/fa6";

const initialDeal = {
    img: {},
    amount: "",
    deliveryCost: "normal",
};

function DealForm({ onClose }) {
    const [error, setError] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [deal, setDeal] = useState(initialDeal);
    const [dealItems, setDealItems] = useState([]);

    const { addDeal } = useAddDeal();

    function handleSubmit(e) {
        e.preventDefault();
        setIsCreating(true);
        if (!deal.amount || dealItems.length === 0) {
            setError("fill all the cases");
            setIsCreating(false);
            return;
        }
        if (!deal.img.name) {
            setError("upload the image");
            setIsCreating(false);
            return;
        }
        if (isNaN(Number(deal.amount))) {
            setError("Invalide amount");
            setIsCreating(false);
            return;
        }
        addDeal(
            {
                dealData: deal,
                dealItems,
            },
            {
                onSettled: () => {
                    setDeal(initialDeal);
                    setDealItems([]);
                    setError("");
                    setIsCreating(false);
                    onClose?.();
                },
            }
        );
    }
    return (
        <Form handleSubmit={handleSubmit} title={"add new deal"}>
            <div className="flex flex-col sm:flex-row  gap-y-5 gap-x-10 md:gap-x-14 xl:gap-x-20">
                <Image image={deal} setImage={setDeal} />
                <div className="flex flex-col gap-5">
                    <Products
                        dealItems={dealItems}
                        setDealItems={setDealItems}
                    />
                    <div className="flex gap-5 flex-wrap">
                        <InputBox
                            label={"Total Amount"}
                            value={deal.amount}
                            setValue={setDeal}
                            theKey={"amount"}
                            width={"w-full !py-1"}
                            style="w-full xs:w-40"
                        />
                        <SelectBox
                            value={deal.deliveryCost}
                            setValue={setDeal}
                            theKey="deliveryCost"
                            label="Delivery Cost"
                            width="w-full xs:w-40"
                            style="!py-1"
                        >
                            <option value={"normal"}>Normal</option>
                            <option value={"free"}>Free</option>
                        </SelectBox>
                    </div>
                </div>
            </div>
            <BottomForm
                isLoading={isCreating}
                error={error}
                handleSubmit={handleSubmit}
                onReset={() => onClose?.()}
                label={"add new deal"}
            />
        </Form>
    );
}
function Image({ image, setImage }) {
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage((prevImages) => ({
            ...prevImages,
            img: file,
        }));
    };
    const removeImage = () => {
        setImage((prevImages) => ({
            ...prevImages,
            img: {},
        }));
    };
    return (
        <div className="flex flex-col gap-y-2 min-w-20">
            <label className="font-semibold xs:font-extrabold capitalize mb-0.5">
                Image
            </label>
            <input
                id="img-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />
            <div className="flex flex-wrap gap-2">
                {!!image.img.name && (
                    <div className="relative">
                        <img
                            src={URL.createObjectURL(image.img)}
                            alt="Avatar Preview"
                            className="h-40 w-40 xs:h-56 xs:w-56 object-contain rounded-sm"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full size-5 text-sm hover:bg-red-700"
                        >
                            &times;
                        </button>
                    </div>
                )}

                {!image.img.name && (
                    <label
                        htmlFor="img-upload"
                        className="cursor-pointer bg-bkg-secondary text-3xl flex justify-center items-center text-content h-40 w-40 xs:h-56 xs:w-56 rounded-sm duration-300 hover:text-gray-300 hover:bg-input"
                    >
                        <BsPlusCircle />
                    </label>
                )}
            </div>
        </div>
    );
}

function Products({ dealItems, setDealItems }) {
    const [content, setContent] = useState({ id: "", qte: 1 });
    const inputKey = useRef(null);

    const addProduct = () => {
        if (content.id !== "" && content.qte !== "") {
            setDealItems((prevValue) => [...prevValue, content]);
            setContent({ id: "", qte: 1 });
            if (inputKey.current) {
                inputKey.current.focus();
            }
        }
    };

    const removeProduct = (index) => {
        const newProducts = dealItems.filter(
            (_, specIndex) => specIndex !== index
        );
        setDealItems(newProducts);
    };
    const handleEnterPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            addProduct();
        }
    };
    return (
        <div className="flex flex-col gap-y-2 w-full xs:w-auto">
            <label className="font-semibold xs:font-extrabold capitalize mb-0.5">
                Products
            </label>
            <div className="flex space-x-2 mb-2">
                <p className="w-16 xs:w-20 text-sm font-bold capitalize">
                    product Id
                </p>
                <p className="flex-1 block w-full xs:flex-none xs:w-20 text-sm font-bold capitalize">
                    quantity
                </p>
            </div>
            {dealItems?.map((spec, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                    <p
                        title={spec.id}
                        className="w-16 xs:w-20 text-sm line-clamp-1 overflow-hidden font-semibold"
                    >
                        {`${spec.id}`}
                    </p>
                    <p
                        title={spec.qte}
                        className="flex-1 block w-full xs:flex-none xs:w-20 text-sm line-clamp-1 overflow-hidden"
                    >
                        {spec.qte}
                    </p>
                    <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="text-red-500 hover:text-red-700"
                    >
                        <FaX />
                    </button>
                </div>
            ))}
            <div className="flex space-x-2 mb-2">
                <input
                    type="number"
                    placeholder="Id"
                    value={content.id}
                    onChange={(e) => {
                        setContent((prevValue) => ({
                            ...prevValue,
                            id: e.target.value,
                        }));
                    }}
                    onKeyDown={(e) => handleEnterPress(e)}
                    className="w-16 xs:w-20 py-0.5 px-1.5 bg-input border border-content text-sm outline-colored"
                    ref={inputKey}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={content.qte}
                    onChange={(e) =>
                        setContent((prevValue) => ({
                            ...prevValue,
                            qte: e.target.value,
                        }))
                    }
                    onKeyDown={(e) => handleEnterPress(e)}
                    className="flex-1 block w-full xs:flex-none xs:w-20 py-0.5 px-1.5 bg-input border border-content text-sm outline-colored"
                />
                <button
                    type="button"
                    onClick={addProduct}
                    className="text-green-500 hover:text-green-700"
                >
                    <FaPlus className="text-xl" />
                </button>
            </div>
        </div>
    );
}

export default DealForm;
