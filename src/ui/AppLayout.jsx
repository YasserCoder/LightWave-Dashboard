import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import Sidebar from "./Sidebar";

function AppLayout() {
    const [dark, setDark] = useState(false);
    return (
        <>
            <Header />
            <main className="flex h-[calc(100vh-117px)] xs:h-[calc(100vh-132px)] md:h-[calc(100vh-70px)]">
                <Sidebar />
                <div className="w-full overflow-auto bg-bkg-secondary">
                    <Outlet />
                </div>
            </main>
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
