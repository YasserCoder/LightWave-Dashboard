import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";

function AppLayout() {
    const [dark, setDark] = useState(false);
    return (
        <>
            <Header />
            <Outlet />
            <button
                className="fixed bottom-7 right-7 bg-gray-400 p-4 rounded-full"
                onClick={() => {
                    setDark(!dark);
                    document.documentElement.classList.toggle("dark");
                }}
            >
                {dark ? "light" : "dark"}
            </button>
        </>
    );
}

export default AppLayout;
