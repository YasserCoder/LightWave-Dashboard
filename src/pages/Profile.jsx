import { useEffect, useState } from "react";

import { useUser } from "../hook/auth/useUser";
import { useUpdateUser } from "../hook/auth/useUpdateUser";
import { isWhitespace } from "../utils/helpers";
import { emailRegex, phoneRegex } from "../utils/constants";

import Main from "../ui/Main";
import MainHeader from "../ui/MainHeader";
import Loader from "../ui/Loader";
import MiniLoader from "../ui/MiniLoader";
import FormBtn from "../ui/FormBtn";
import InputBox from "../ui/InputBox";
import Avatar from "../ui/Avatar";

function Profile() {
    const { isLoading, user } = useUser();
    const { updateUser } = useUpdateUser();
    const initialForm = {
        name: user?.user_metadata?.name || "",
        email: user?.email || "",
        password: "",
        npassword: "",
        cpassword: "",
        phone: user?.user_metadata?.phone || "",
        country: user?.user_metadata?.country || "",
        city: user?.user_metadata?.city || "",
        adress: user?.user_metadata?.adress || "",
        postCode: user?.user_metadata?.postCode || "",
        avatar: user?.user_metadata?.avatar || "",
    };
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        setForm({
            name: user?.user_metadata?.name || "",
            email: user?.email || "",
            password: "",
            npassword: "",
            cpassword: "",
            phone: user?.user_metadata?.phone || "",
            country: user?.user_metadata?.country || "",
            city: user?.user_metadata?.city || "",
            adress: user?.user_metadata?.adress || "",
            postCode: user?.user_metadata?.postCode || "",
            avatar: user?.user_metadata?.avatar || "",
        });
    }, [user]);

    function handleSubmit(e) {
        e.preventDefault();
        setIsUpdating(true);
        if (!form.name || !form.password || !form.phone || !form.email) {
            setError("fill all the nessecary cases");
            setIsUpdating(false);
            return;
        }
        if (
            isWhitespace(form.name) ||
            !isNaN(form.name) ||
            form.name.length < 6
        ) {
            setError("Invalide name");
            setIsUpdating(false);
            return;
        }
        if (!emailRegex.test(form.email)) {
            setError("Invalid email");
            setIsUpdating(false);
            return;
        }
        if (
            user?.user_metadata?.pwd &&
            form.password !== user?.user_metadata?.pwd
        ) {
            setError("wrong old password");
            setIsUpdating(false);
            return;
        }
        if (!phoneRegex.test(form.phone)) {
            setError("Invalid phone number");
            setIsUpdating(false);
            return;
        }
        if (form.npassword !== form.cpassword) {
            setError("Passwords do not match");
            setIsUpdating(false);
            return;
        }
        if (form.postCode !== "" && isNaN(form.postCode)) {
            setError("invalide Post Code");
            setIsUpdating(false);
            return;
        }
        let updateObj = {
            email: form.email,
            newPassword: form.npassword,
            name: form.name,
            phone: form.phone,
            postCode: form.postCode,
            adress: form.adress,
            country: form.country,
            city: form.city,
        };
        Object.keys(updateObj).forEach((item) => {
            if (
                updateObj[item] === "" ||
                updateObj[item] === user?.user_metadata[item]
            ) {
                delete updateObj[item];
            }
        });
        updateObj = {
            ...updateObj,
            avatar:
                form.avatar === user?.user_metadata?.avatar
                    ? undefined
                    : form.avatar,
        };
        updateUser(updateObj, {
            onSettled: () => {
                setIsUpdating(false);
            },
        });
    }
    return (
        <Main>
            <MainHeader title={"profile"}></MainHeader>
            {isLoading ? (
                <Loader />
            ) : (
                <form
                    className="w-full flex flex-col gap-y-7  mt-2"
                    onSubmit={handleSubmit}
                >
                    <div className="flex gap-y-7 flex-wrap gap-x-5 xl:gap-x-12 justify-center items-end">
                        <div className="flex flex-col gap-7">
                            <Avatar
                                avatar={form.avatar}
                                setAvatar={setForm}
                                style={"sm:self-center"}
                            />
                            <div className="flex gap-y-7 gap-x-8 flex-wrap">
                                <InputBox
                                    label="name"
                                    value={form.name}
                                    setValue={setForm}
                                    width={"w-full xs:w-56"}
                                    theKey={"name"}
                                />
                                <InputBox
                                    label="old password"
                                    type="password"
                                    value={form.password}
                                    setValue={setForm}
                                    width={"w-full xs:w-56"}
                                    theKey={"password"}
                                />
                            </div>
                            <div className="flex gap-y-7 gap-x-8 flex-wrap">
                                <InputBox
                                    label="new password"
                                    type="password"
                                    value={form.npassword}
                                    setValue={setForm}
                                    width={"w-full xs:w-56"}
                                    theKey={"npassword"}
                                />
                                <InputBox
                                    label="repeat password"
                                    type="password"
                                    value={form.cpassword}
                                    setValue={setForm}
                                    width={"w-full xs:w-56"}
                                    theKey={"cpassword"}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-8 ">
                            <div className="flex gap-y-7 gap-x-8 flex-wrap">
                                <InputBox
                                    label="email"
                                    type="email"
                                    value={form.email}
                                    setValue={setForm}
                                    width={"w-full xs:w-56"}
                                    theKey={"email"}
                                />
                                <InputBox
                                    label="Phone Number"
                                    value={form.phone}
                                    setValue={setForm}
                                    width={"w-full xs:w-56"}
                                    theKey={"phone"}
                                />
                            </div>
                            <div className="flex gap-y-7 gap-x-8 flex-wrap">
                                <InputBox
                                    label="Country"
                                    value={form.country}
                                    setValue={setForm}
                                    width={"w-full xs:w-56"}
                                    theKey={"country"}
                                />
                                <InputBox
                                    label="City / State"
                                    value={form.city}
                                    setValue={setForm}
                                    width={"w-full xs:w-56"}
                                    theKey={"city"}
                                />
                            </div>
                            <div className="flex gap-x-8 gap-y-7 flex-wrap">
                                <InputBox
                                    label="Post Code"
                                    value={form.postCode}
                                    setValue={setForm}
                                    width={"w-full xs:w-56"}
                                    theKey={"postCode"}
                                />
                                <InputBox
                                    label="Adress"
                                    value={form.adress}
                                    setValue={setForm}
                                    width={"w-full xs:w-56"}
                                    theKey={"adress"}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={`flex flex-col gap-y-4 sm:flex-row ${
                            error ? "sm:justify-between" : "justify-end"
                        } sm:items-center w-full border-t border-content mt-2 pt-4`}
                    >
                        {error && (
                            <p className="text-red-500 ">{`** ${error}`}</p>
                        )}
                        <div className="flex gap-3 items-center self-end flex-wrap">
                            {isUpdating && <MiniLoader />}
                            <FormBtn
                                type={"reset"}
                                label={"Reset"}
                                onClick={() => setForm(initialForm)}
                                disabled={isUpdating}
                            />
                            <FormBtn
                                type={"submit"}
                                label={"save information"}
                                onClick={handleSubmit}
                                disabled={isUpdating || form.password === ""}
                            />
                        </div>
                    </div>
                </form>
            )}
        </Main>
    );
}

export default Profile;
