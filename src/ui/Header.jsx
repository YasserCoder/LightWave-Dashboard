import { useState } from "react";
import { Link } from "react-router-dom";

import { useScreenSize } from "../hook/useScreenSize";
import { useUser } from "../hook/auth/useUser";

import DarkToggleSwitch from "./DarkToggleSwitch";
import InputText from "./InputText";

import styles from "./hamburger.module.css";

import { IoIosSearch } from "react-icons/io";

function Header({ open, setOpen }) {
    const { screenSize: isSmallScreen } = useScreenSize(768);
    const { user } = useUser();
    return (
        <header className="flex flex-col gap-y-5 items-center bg-bkg-main py-3">
            <div className="container flex flex-col gap-y-4 xxs:flex-row xxs:justify-between items-center w-full">
                <h1 className="font-extrabold text-xl xs:text-3xl">
                    <Link to={"/home"}>
                        <span className="capitalize text-colored">dash</span>
                        <span>board</span>
                    </Link>
                </h1>
                {!isSmallScreen && (
                    <div>
                        <SearchBar />
                    </div>
                )}
                <div className="flex items-center w-full justify-between xxs:w-auto xxs:gap-x-6">
                    <div className="flex items-center gap-x-2">
                        <div
                            className={`capitalize text-lg xs:text-2xl size-7 xs:size-10 flex justify-center items-center rounded-full ${
                                !user.user_metadata?.avatar &&
                                "text-white bg-orange-400"
                            }`}
                        >
                            {user.user_metadata?.avatar ? (
                                <img
                                    src={user.user_metadata?.avatar}
                                    alt="avatar"
                                    className="h-full w-full object-cover rounded-full"
                                />
                            ) : (
                                <span>{user.user_metadata.name.charAt(0)}</span>
                            )}
                        </div>
                        <div className="sm:space-y-[2px]">
                            <h3 className="capitalize text-sm xs:text-base font-semibold">
                                {user.user_metadata.name.split(" ")[0]}
                            </h3>
                            <p className="text-content text-[10px] font-light xs:text-sm ">
                                Admin
                            </p>
                        </div>
                    </div>
                    <DarkToggleSwitch />
                </div>
            </div>
            {isSmallScreen && (
                <div className="container flex items-center gap-x-4 sm:gap-x-10  w-full">
                    <HamburgerIcon open={open} setOpen={setOpen} />
                    <SearchBar />
                </div>
            )}
        </header>
    );
}
function HamburgerIcon({ open, setOpen }) {
    return (
        <label className={styles.buttonsBurger} htmlFor={styles.burger}>
            <input
                type="checkbox"
                id={styles.burger}
                checked={open}
                onChange={(event) => {
                    setOpen(event.target.checked);
                }}
            />
            <span></span>
            <span></span>
            <span></span>
        </label>
    );
}
function SearchBar() {
    const [value, setValue] = useState("");
    // const [isFocused, setIsFocused] = useState(false);
    return (
        <form
            className="flex-1 md:flex-auto"
            onSubmit={(e) => {
                e.preventDefault();
                console.log(value);
            }}
        >
            <InputText
                value={value}
                setValue={setValue}
                type={"text"}
                label={"Search..."}
                width={"w-full md:w-72 lg:w-80 xl:w-96"}
            >
                <IoIosSearch className="text-lg" />
            </InputText>
        </form>
    );
}

export default Header;
