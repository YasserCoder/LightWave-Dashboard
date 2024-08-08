import { IoSettingsOutline, IoStatsChart } from "react-icons/io5";
import { LiaPowerOffSolid } from "react-icons/lia";
import {
    PiChats,
    PiListChecksLight,
    PiSquaresFourLight,
    PiUserListLight,
} from "react-icons/pi";
import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="bg-bkg-main pt-4 h-[calc(100vh-117px)] xs:h-[calc(100vh-132px)] md:h-[calc(100vh-70px)]">
            <ul className="flex flex-col gap-y-4">
                <li className="flex flex-row-reverse gap-x-3 mr-5">
                    <NavLink
                        to={"/home"}
                        className={`flex gap-2 py-2 w-[160px] pl-3 rounded-md items-center`}
                    >
                        <span>
                            <IoStatsChart />
                        </span>
                        <span>Dashbord</span>
                    </NavLink>
                    <span className="w-1 bg-transparent rounded-md"></span>
                </li>
                <li className="flex flex-row-reverse gap-x-3 mr-5">
                    <NavLink
                        to={"/products"}
                        className={`flex gap-2 py-2 w-[160px] pl-3 rounded-md items-center`}
                    >
                        <span>
                            <PiSquaresFourLight />
                        </span>
                        <span>Products</span>
                    </NavLink>
                    <span className="w-1 bg-transparent rounded-md"></span>
                </li>
                <li className="flex flex-row-reverse gap-x-3 mr-5">
                    <NavLink
                        to={"/orders"}
                        className={`flex gap-2 py-2 w-[160px] pl-3 rounded-md items-center`}
                    >
                        <span>
                            <PiListChecksLight />
                        </span>
                        <span>Orders List</span>
                    </NavLink>
                    <span className="w-1 bg-transparent rounded-md"></span>
                </li>
                <li className="flex flex-row-reverse gap-x-3 mr-5">
                    <NavLink
                        to={"/inbox"}
                        className={`flex gap-2 py-2 w-[160px] pl-3 rounded-md items-center `}
                    >
                        <span>
                            <PiChats />
                        </span>
                        <span>Inbox</span>
                    </NavLink>
                    <span className="w-1 bg-transparent rounded-md "></span>
                </li>
                <li className="flex flex-row-reverse gap-x-3 mr-5">
                    <NavLink
                        to={"/users"}
                        className={`flex gap-2 py-2 w-[160px] pl-3 rounded-md items-center`}
                    >
                        <span>
                            <PiUserListLight />
                        </span>
                        <span>Users</span>
                    </NavLink>
                    <span className="w-1 bg-transparent rounded-md"></span>
                </li>
                <span className="w-full h-[1px] bg-content"></span>
                <li className="flex flex-row-reverse gap-x-3 mr-5">
                    <NavLink
                        to={"/settings"}
                        className={`flex gap-2 py-2 w-[160px] pl-3 rounded-md items-center`}
                    >
                        <span>
                            <IoSettingsOutline />
                        </span>
                        <span>Settings</span>
                    </NavLink>
                    <span className="w-1 bg-transparent rounded-md"></span>
                </li>
                <li className="flex flex-row-reverse gap-x-3 mr-5">
                    <button
                        className={`flex gap-2 py-2 w-[160px] pl-3 rounded-md items-center hover:bg-content hover:text-white`}
                    >
                        <span>
                            <LiaPowerOffSolid className="text-xl" />
                        </span>
                        <span>Logout</span>
                    </button>
                    <span className="w-1 bg-transparent rounded-md"></span>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
