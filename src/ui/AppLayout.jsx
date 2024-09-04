import { useState } from "react";
import { Outlet } from "react-router-dom";

import { useScreenSize } from "../hook/useScreenSize";

import Header from "./Header";
import Sidebar from "./Sidebar";
import useOrderSubscription from "../hook/order/useOrderSubscription";

function AppLayout() {
    const [open, setOpen] = useState(false);
    const { screenSize: isSmallScreen } = useScreenSize(768);
    useOrderSubscription();
    return (
        <>
            <Header open={open} setOpen={setOpen} />
            <main className="flex h-[calc(100vh-117px)] xs:h-[calc(100vh-132px)] md:h-[calc(100vh-70px)] xl:h-[calc(100vh-72px)] relative">
                <Sidebar open={isSmallScreen ? open : false} />
                {open && isSmallScreen && (
                    <div
                        className="absolute w-full h-full top-0 left-0 bg-colored opacity-40 z-20"
                        onClick={() => {
                            setOpen(false);
                        }}
                    ></div>
                )}
                <div
                    className={`flex-1 ${
                        open && isSmallScreen
                            ? "overflow-hidden"
                            : "overflow-auto"
                    }  bg-bkg-secondary`}
                    id="main"
                >
                    <Outlet />
                </div>
            </main>
        </>
    );
}

export default AppLayout;
