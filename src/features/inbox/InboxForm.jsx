import { useState } from "react";
import FormBtn from "../../ui/FormBtn";
import MiniLoader from "../../ui/MiniLoader";

const initialForm = {
    name: "",
    phone: "",
    email: "",
    message: "",
};

function InboxForm({ onClose }) {
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState("");
    const [isSending, setIsSending] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
    }
    return (
        <form
            className="flex flex-col gap-y-5 items-center w-full"
            onSubmit={handleSubmit}
        >
            <h1 className="text-3xl capitalize font-bold self-start">
                Send Message
            </h1>
            <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-5 w-fit">
                <InputCase
                    label={"Name"}
                    value={form.name}
                    setValue={setForm}
                    theKey={"name"}
                    width={"w-full"}
                />
                <InputCase
                    label={"Email"}
                    value={form.email}
                    setValue={setForm}
                    theKey={"email"}
                    width={"w-full"}
                />
                <InputCase
                    label={"Phone"}
                    value={form.phone}
                    setValue={setForm}
                    theKey={"phone"}
                    width={"w-full"}
                />
            </div>
            <div className="flex flex-col gap-y-2.5 w-full xs:w-64 md:w-full lg:w-[650px]">
                <label className="font-semibold xs:font-extrabold capitalize">
                    Message
                </label>
                <textarea
                    value={form.message}
                    onChange={(e) =>
                        setForm((prevValue) => ({
                            ...prevValue,
                            description: e.target.value,
                        }))
                    }
                    placeholder="Message"
                    className="w-full h-full px-4 py-1.5 bg-input border border-content text-sm xs:text-base outline-colored"
                    rows={4}
                />
            </div>
            <div
                className={`flex flex-col gap-y-4 sm:flex-row ${
                    error ? "sm:justify-between" : "justify-end"
                } sm:items-center w-full border-t border-content mt-2 pt-4 pb-2`}
            >
                {error && <p className="text-red-500 ">{`** ${error}`}</p>}
                <div className="flex gap-3 items-center self-end flex-wrap">
                    {isSending && <MiniLoader />}
                    <FormBtn
                        type={"reset"}
                        label={"cancel"}
                        onClick={() => onClose?.()}
                        disabled={isSending}
                    />
                    <FormBtn
                        type={"submit"}
                        label={"Send Message"}
                        onClick={handleSubmit}
                        disabled={isSending}
                    />
                </div>
            </div>
        </form>
    );
}
function InputCase({ label, value, setValue, width, theKey }) {
    return (
        <div className={`flex flex-col gap-y-2.5 w-full xs:w-64`}>
            <label className="font-semibold xs:font-extrabold capitalize">
                {label}
            </label>
            <input
                value={value === null ? "" : value}
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

export default InboxForm;
