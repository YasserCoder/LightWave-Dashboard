import { useState } from "react";

import { useSendMessage } from "../../hook/message/useSendMessage";
import { isWhitespace } from "../../utils/helpers";
import { emailRegex, phoneRegex } from "../../utils/constants";

import Form from "../../ui/Form";
import InputBox from "../../ui/InputBox";
import BottomForm from "../../ui/BottomForm";

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
                    <InputBox
                        label={"Name"}
                        value={form.name}
                        setValue={setForm}
                        theKey={"name"}
                        width={"w-full"}
                        style="w-full xs:w-64"
                    />
                    <InputBox
                        label={"Email"}
                        value={form.email}
                        setValue={setForm}
                        theKey={"email"}
                        width={"w-full"}
                        style="w-full xs:w-64"
                    />
                </div>
                <div className="flex flex-col md:flex-row items-center gap-5">
                    <InputBox
                        label={"Phone"}
                        value={form.phone}
                        setValue={setForm}
                        theKey={"phone"}
                        width={"w-full"}
                        style="w-full xs:w-64"
                    />
                    <InputBox
                        label={"Destination"}
                        value={form.destination}
                        setValue={setForm}
                        theKey={"destination"}
                        width={"w-full"}
                        style="w-full xs:w-64"
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
            <BottomForm
                isLoading={isSending}
                error={error}
                handleSubmit={handleSubmit}
                onReset={() => onClose?.()}
                label={"send Message"}
            />
        </Form>
    );
}

export default InboxForm;
