import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import InputText from "./InputText";

import { IoIosSearch } from "react-icons/io";

function SearchBar() {
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { pathname } = useLocation();

    const inProducts = pathname.split("/").includes("products");
    function handleSearch(e) {
        e.preventDefault();
        if (inProducts) {
            searchParams.set("q", value);
            setSearchParams(searchParams);
        } else {
            navigate(`/products?q=${value}`);
        }
    }
    useEffect(() => {
        if (!searchParams.get("q")) {
            setValue("");
        }
    }, [searchParams]);
    return (
        <form className="flex-1 md:flex-auto" onSubmit={handleSearch}>
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

export default SearchBar;
