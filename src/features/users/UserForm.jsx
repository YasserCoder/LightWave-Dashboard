import { useState } from "react";

import { useSignUp } from "../../hook/auth/useSignup";
import { useLogout } from "../../hook/auth/useLogout";
import { isWhitespace } from "../../utils/helpers";
import { emailRegex, phoneRegex } from "../../utils/constants";

import Form from "../../ui/Form";
import RadioBtns from "../../ui/RadioBtns";
import InputBox from "../../ui/InputBox";
import BottomForm from "../../ui/BottomForm";
import Avatar from "../../ui/Avatar";

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
    avatar: "",
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
            city: form.city,
            authority: form.authority,
            avatar: form.avatar,
        };
        Object.keys(updateObj).forEach((item) => {
            if (updateObj[item] === "") {
                delete updateObj[item];
            }
        });
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
                <Avatar
                    avatar={form.avatar}
                    setAvatar={setForm}
                    style="min-w-20"
                />
                <InputBox
                    label={"Name"}
                    value={form.name}
                    setValue={setForm}
                    theKey={"name"}
                    width={"w-full xs:w-52"}
                />
                <InputBox
                    label={"Email"}
                    value={form.email}
                    setValue={setForm}
                    theKey={"email"}
                    width={"w-full xs:w-52"}
                />
                <InputBox
                    label={"Password"}
                    value={form.password}
                    setValue={setForm}
                    theKey={"password"}
                    type="password"
                    width={"w-full xs:w-52"}
                />
                <InputBox
                    label={"Confirm Password"}
                    value={form.cpassword}
                    setValue={setForm}
                    theKey={"cpassword"}
                    type="password"
                    width={"w-full xs:w-52"}
                />
                <InputBox
                    label={"Phone"}
                    value={form.phone}
                    setValue={setForm}
                    theKey={"phone"}
                    width={"w-full xs:w-48"}
                />
                <InputBox
                    label={"Country"}
                    value={form.country}
                    setValue={setForm}
                    theKey={"country"}
                    width={"w-full xs:w-44"}
                />
                <InputBox
                    label={"City"}
                    value={form.city}
                    setValue={setForm}
                    theKey={"city"}
                    width={"w-full xs:w-36"}
                />
                <InputBox
                    label={"Adress"}
                    value={form.adress}
                    setValue={setForm}
                    theKey={"adress"}
                    width={"w-full xs:w-52"}
                />
                <InputBox
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
            <BottomForm
                isLoading={isCreating}
                error={error}
                handleSubmit={handleSubmit}
                onReset={() => onClose?.()}
                label={"sign up"}
            />
        </Form>
    );
}
export default UserForm;
