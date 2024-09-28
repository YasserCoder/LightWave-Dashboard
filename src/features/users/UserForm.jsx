import { useState } from "react";

import { useSignUp } from "../../hook/auth/useSignup";
import { useLogout } from "../../hook/auth/useLogout";
import { isWhitespace } from "../../utils/helpers";
import { emailRegex, phoneRegex } from "../../utils/constants";

import Form from "../../ui/Form";
import FormBtn from "../../ui/FormBtn";
import MiniLoader from "../../ui/MiniLoader";
import RadioBtns from "../../ui/RadioBtns";

import { BsPlusCircle } from "react-icons/bs";

const initialForm = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    country: "",
    city: "",
    adress: "",
    postCode: "",
    authority: "user",
    avatar: {},
};
const options = ["admin", "user"];
const style = "flex flex-col xs:flex-row gap-x-2 h-fit ";

function UserForm({ onClose }) {
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const { signup } = useSignUp();
    const { logout } = useLogout();

    function handleAuthority(value) {
        setForm((prevItems) => ({ ...prevItems, authority: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsCreating(true);
        if (!form.name || !form.password || !form.phone || !form.email) {
            setError("fill all the cases");
            setIsCreating(false);
            return;
        }
        if (
            isWhitespace(form.name) ||
            !isNaN(form.name) ||
            form.name.length < 6
        ) {
            setError("Invalide name");
            setIsCreating(false);
            return;
        }

        if (!emailRegex.test(form.email)) {
            setError("Invalid email");
            setIsCreating(false);
            return;
        }
        if (!phoneRegex.test(form.phone)) {
            setError("Invalid phone number");
            setIsCreating(false);
            return;
        }
        if (form.password !== form.cpassword) {
            setError("Passwords do not match");
            setIsCreating(false);
            return;
        }
        if (form.postCode !== "" && isNaN(form.postCode)) {
            setError("invalide Post Code");
            setIsCreating(false);
            return;
        }
        let updateObj = {
            email: form.email,
            password: form.password,
            name: form.name,
            phone: form.phone,
            postCode: form.postCode,
            adress: form.adress,
            country: form.country,
            city: form.country,
            authority: form.authority,
            avatar: form.avatar,
        };
        Object.keys(updateObj).forEach((item) => {
            if (updateObj[item] === "") {
                delete updateObj[item];
            }
        });
        if (!updateObj["avatar"].name) {
            delete updateObj["avatar"];
        }
        signup(
            updateObj,
            {
                onSuccess: () => {
                    logout();
                },
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
    return (
        <Form title={"sign up"} handleSubmit={handleSubmit}>
            <div className="flex gap-x-5 gap-y-8 justify-between flex-wrap">
                <Avatar avatar={form.avatar} setAvatar={setForm} />
                <InputCase
                    label={"Name"}
                    value={form.name}
                    setValue={setForm}
                    theKey={"name"}
                    width={"w-full xs:w-52"}
                />
                <InputCase
                    label={"Email"}
                    value={form.email}
                    setValue={setForm}
                    theKey={"email"}
                    width={"w-full xs:w-52"}
                />
                <InputCase
                    label={"Password"}
                    value={form.password}
                    setValue={setForm}
                    theKey={"password"}
                    type="password"
                    width={"w-full xs:w-52"}
                />
                <InputCase
                    label={"Confirm Password"}
                    value={form.cpassword}
                    setValue={setForm}
                    theKey={"cpassword"}
                    type="password"
                    width={"w-full xs:w-52"}
                />
                <InputCase
                    label={"Phone"}
                    value={form.phone}
                    setValue={setForm}
                    theKey={"phone"}
                    width={"w-full xs:w-48"}
                />
                <InputCase
                    label={"Country"}
                    value={form.country}
                    setValue={setForm}
                    theKey={"country"}
                    width={"w-full xs:w-44"}
                />
                <InputCase
                    label={"City"}
                    value={form.city}
                    setValue={setForm}
                    theKey={"city"}
                    width={"w-full xs:w-36"}
                />
                <InputCase
                    label={"Adress"}
                    value={form.adress}
                    setValue={setForm}
                    theKey={"adress"}
                    width={"w-full xs:w-52"}
                />
                <InputCase
                    label={"Post Code"}
                    value={form.postCode}
                    setValue={setForm}
                    theKey={"postCode"}
                    width={"w-full xs:w-28"}
                />
                <div className={`flex flex-col gap-y-2.5`}>
                    <label className="font-semibold xs:font-extrabold capitalize">
                        {"Role"}
                    </label>
                    <RadioBtns
                        value={form.authority}
                        setValue={handleAuthority}
                        options={options}
                        style={style}
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
                    <FormBtn
                        type={"reset"}
                        label={"cancel"}
                        onClick={() => onClose?.()}
                        disabled={isCreating}
                    />
                    <FormBtn
                        type={"submit"}
                        label={"sign up"}
                        onClick={handleSubmit}
                        disabled={isCreating}
                    />
                </div>
            </div>
        </Form>
    );
}

function InputCase({ label, value, setValue, width, theKey, type = "text" }) {
    return (
        <div className={`flex flex-col gap-y-2.5 `}>
            <label className="font-semibold xs:font-extrabold capitalize">
                {label}
            </label>
            <input
                value={value === null ? "" : value}
                type={type}
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

function Avatar({ avatar, setAvatar }) {
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setAvatar((prevItems) => ({ ...prevItems, avatar: file }));
    };
    const removeImage = () => {
        setAvatar((prevItems) => ({ ...prevItems, avatar: {} }));
    };
    return (
        <div className="flex flex-col gap-y-2 min-w-20">
            <label className="font-semibold xs:font-extrabold capitalize mb-0.5">
                Avatar
            </label>
            <input
                id="avtr-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />
            <div className="flex flex-wrap gap-2">
                {!!avatar.name && (
                    <div className="relative">
                        <img
                            src={URL.createObjectURL(avatar)}
                            alt="Avatar Preview"
                            className="h-16 w-16 object-cover rounded-full"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full size-4 text-xs hover:bg-red-700"
                        >
                            &times;
                        </button>
                    </div>
                )}

                {!avatar.name && (
                    <label
                        htmlFor="avtr-upload"
                        className="cursor-pointer bg-bkg-secondary text-3xl flex justify-center items-center text-content h-16 w-16 rounded-full duration-300 hover:text-gray-300 hover:bg-input"
                    >
                        <BsPlusCircle />
                    </label>
                )}
            </div>
        </div>
    );
}

export default UserForm;
