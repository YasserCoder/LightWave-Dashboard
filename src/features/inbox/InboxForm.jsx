import { useState } from "react";

import { useSendMessage } from "../../hook/message/useSendMessage";
import { isWhitespace } from "../../utils/helpers";
import { emailRegex, phoneRegex } from "../../utils/constants";

import FormBtn from "../../ui/FormBtn";
import MiniLoader from "../../ui/MiniLoader";
import Form from "../../ui/Form";

const initialForm = {
    name: "",
    phone: "",
    email: "",
    destination: "ALL",
    content: "",
};

function InboxForm({ user, onClose }) {
    const [form, setForm] = useState({
        name: user?.user_metadata?.name,
        phone: user?.user_metadata?.phone,
        email: user?.email,
        destination: "ALL",
        content: "",
    });
    const [error, setError] = useState("");
    const [isSending, setIsSending] = useState(false);

    const { sendMessage } = useSendMessage();

    function handleSubmit(e) {
        e.preventDefault();
        setIsSending(true);
        if (
            !form.name ||
            !form.content ||
            !form.phone ||
            !form.email ||
            !form.destination
        ) {
            setError("fill all the nessecary cases");
            setIsSending(false);
            return;
        }
        if (
            isWhitespace(form.name) ||
            !isNaN(form.name) ||
            form.name.length < 6
        ) {
            setError("Invalide name");
            setIsSending(false);
            return;
        }
        if (!emailRegex.test(form.email)) {
            setError("Invalid email");
            setIsSending(false);
            return;
        }
        if (!phoneRegex.test(form.phone)) {
            setError("Invalid phone number");
            setIsSending(false);
            return;
        }
        let msgData = {
            email: form.email,
            name: form.name,
            phone: form.phone,
            content: form.content,
            destination: form.destination,
            source: "admin",
        };
        sendMessage(msgData, {
            onSettled: () => {
                setIsSending(false);
                setForm(initialForm);
                setError("");
                onClose?.();
            },
        });
    }
    return (
        <Form handleSubmit={handleSubmit} title={"send message"}>
            <div className="flex flex-col xl:flex-row gap-5 w-fit">
                <div className="flex flex-col md:flex-row items-center gap-5">
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
                </div>
                <div className="flex flex-col md:flex-row items-center gap-5">
                    <InputCase
                        label={"Phone"}
                        value={form.phone}
                        setValue={setForm}
                        theKey={"phone"}
                        width={"w-full"}
                    />
                    <InputCase
                        label={"Destination"}
                        value={form.destination}
                        setValue={setForm}
                        theKey={"destination"}
                        width={"w-full"}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-y-2.5 w-full xs:w-64 md:w-full lg:w-[650px]">
                <label className="font-semibold xs:font-extrabold capitalize">
                    Message
                </label>
                <textarea
                    value={form.content}
                    onChange={(e) =>
                        setForm((prevValue) => ({
                            ...prevValue,
                            content: e.target.value,
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
        </Form>
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
