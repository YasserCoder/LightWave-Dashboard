import { useState } from "react";

import { useScreenSize } from "../hook/useScreenSize";
import { useLogin } from "../hook/auth/useLogin";

import { FaLock, FaUser } from "react-icons/fa";
import vector from "../assets/dashbordVector.svg";
import bg from "../assets/dashbordBg.jpg";
function Login() {
    const [email, setEmail] = useState("admin@lightwave.com");
    const [pwd, setPwd] = useState("lightwavedashbord");
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPwdFocused, setIsPwdFocused] = useState(false);
    const { screenSize: isSmallScreen } = useScreenSize(768);
    const { login, isLoading } = useLogin();
    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !pwd) return;
        login(
            { email, password: pwd },
            {
                onSettled: () => {
                    setEmail("");
                    setPwd("");
                },
            }
        );
    }
    return (
        <div className="h-screen w-screen flex justify-center items-center relative">
            <img
                src={bg}
                alt="bg"
                className="absolute w-full h-full object-cover top-0 right-0 blur-md z-0"
            />
            <span className="absolute w-full h-full bg-colored dark:bg-black top-0 right-0 opacity-30 z-10"></span>
            <div className="container z-20 flex justify-center">
                <div
                    className={`${
                        isSmallScreen
                            ? "w-fit"
                            : "bg-bkg-main flex p-5 rounded-lg items-center gap-10"
                    }`}
                >
                    <form
                        className=" bg-[#f9f9f9] dark:bg-[#c4c8cf66] px-5 xs:px-8 py-8 sm:px-10  rounded-lg flex flex-col justify-center items-center gap-y-5"
                        onSubmit={handleSubmit}
                    >
                        <h1 className="text-2xl xs:text-4xl font-extrabold flex gap-x-[1px] uppercase">
                            <span className="text-colored">light</span>
                            <span className=" text-slate-500 dark:text-slate-200">
                                wave
                            </span>
                        </h1>
                        <p className="mb-2 xs:mb-4 text-sm xs:text-base">
                            log in to your account
                        </p>
                        <div className="flex flex-col gap-y-2.5 ">
                            <label className="font-semibold xs:font-extrabold capitalize ml-3">
                                email
                            </label>
                            <div
                                className={`flex gap-x-4 items-center py-2  px-3 rounded-full ${
                                    isEmailFocused
                                        ? "outline outline-[3px] outline-colored"
                                        : "border border-content"
                                } bg-input`}
                            >
                                <FaUser className="xs:text-lg" />
                                <input
                                    value={email}
                                    type="text"
                                    placeholder="Email"
                                    className="w-40 xs:w-48 sm:w-64 bg-input outline-none text-sm xs:text-base"
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setIsEmailFocused(true)}
                                    onBlur={() => setIsEmailFocused(false)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2.5 ">
                            <label className="font-semibold xs:font-extrabold capitalize ml-3">
                                password
                            </label>
                            <div
                                className={`flex gap-x-4 items-center py-2  px-3 rounded-full ${
                                    isPwdFocused
                                        ? "outline outline-[3px] outline-colored"
                                        : "border border-content"
                                } bg-input`}
                            >
                                <FaLock className="xs:text-lg" />
                                <input
                                    value={pwd}
                                    type="password"
                                    placeholder="Password"
                                    className="w-40 xs:w-48 sm:w-64 bg-input outline-none text-sm xs:text-base"
                                    onChange={(e) => setPwd(e.target.value)}
                                    onFocus={() => setIsPwdFocused(true)}
                                    onBlur={() => setIsPwdFocused(false)}
                                />
                            </div>
                        </div>
                        <button
                            disabled={isLoading}
                            className="bg-colored px-14 py-1.5 xs:py-2.5 rounded-full text-white text-lg font-semibold mt-4 hover:bg-sky-700 duration-200 active:translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-400"
                        >
                            Login
                        </button>
                    </form>
                    {!isSmallScreen && (
                        <div className="flex flex-col gap-y-5 items-center">
                            <div className="flex flex-col gap-y-3 items-start w-full self-start pt-10 pl-6">
                                <h1 className="font-extrabold text-4xl">
                                    <span className="capitalize text-colored">
                                        ad
                                    </span>
                                    <span>min</span>
                                </h1>
                                <h1 className="font-extrabold text-4xl self-center">
                                    <span className="capitalize">dash</span>
                                    <span className=" text-colored">bord</span>
                                </h1>
                            </div>
                            <img
                                src={vector}
                                alt="vector"
                                className="size-72"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
