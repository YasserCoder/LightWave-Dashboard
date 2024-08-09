import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useScreenSize } from "../hook/useScreenSize";

function AppLayout() {
    const [dark, setDark] = useState(false);
    const [open, setOpen] = useState(false);
    const { screenSize: isSmallScreen } = useScreenSize(768);

    return (
        <>
            <Header open={open} setOpen={setOpen} />
            <main className="flex h-[calc(100vh-117px)] xs:h-[calc(100vh-132px)] md:h-[calc(100vh-70px)]">
                {!isSmallScreen && <Sidebar />}
                <div className="w-full overflow-auto bg-bkg-secondary relative">
                    {isSmallScreen && <Sidebar open={open} />}
                    {open && isSmallScreen && (
                        <div
                            className="absolute w-full h-full top-0 left-0 bg-colored opacity-40 z-20"
                            onClick={() => {
                                setOpen(false);
                            }}
                        ></div>
                    )}
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
