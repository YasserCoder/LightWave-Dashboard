import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import Table from "../../ui/Table";

import { BsThreeDotsVertical } from "react-icons/bs";

const tHead = ["Name", "Email", "Phone", "Role", "Join At", ""];
const objStyle = {
    Name: "hidden xxs:table-cell",
    "Join At": "hidden sm:table-cell",
    Email: "hidden xs:table-cell",
    Phone: "hidden lg:table-cell",
};
function UserTable({ users }) {
    const navigate = useNavigate();
    return (
        <Table obj={objStyle} tHead={tHead}>
            {users.map((user, index) => (
                <tr
                    key={index}
                    className="hover:bg-content cursor-pointer"
                    onClick={(e) => {
                        if (
                            e.target.tagName === "BUTTON" ||
                            e.target.closest("#modal")
                        ) {
                            return;
                        }
                        navigate(`user/${user.id}`);
                    }}
                >
                    <td
                        className={`px-2 sm:px-4 py-4 border-b border-content hidden xxs:table-cell max-w-[80px] sm:max-w-[110px] lg:max-w-[160px] xl:max-w-none `}
                    >
                        <p className="block text-sm text-nowrap line-clamp-1">
                            {user.name}
                        </p>
                    </td>
                    <td
                        className={`px-2 sm:px-4 py-4 border-b border-content hidden xs:table-cell max-w-[120px] sm:max-w-[160px] lg:max-w-[230px] xl:max-w-[320px] `}
                    >
                        <p className="block text-sm line-clamp-1">
                            {user.email}
                        </p>
                    </td>
                    <td
                        className={`px-2 sm:px-4 py-4 border-b border-content hidden lg:table-cell `}
                    >
                        <p className="block text-sm">{user.phone}</p>
                    </td>
                    <td className="px-2 sm:px-4 py-4 border-b border-content">
                        <div className="w-max">
                            <div
                                className={`grid items-center font-sans font-bold uppercase whitespace-nowrap py-1 px-2 text-xs rounded-md ${
                                    user.authority === "user"
                                        ? "bg-green-300 text-green-700"
                                        : user.source === "admin"
                                        ? "bg-red-300 text-red-700"
                                        : ""
                                }`}
                            >
                                <span>{user.authority}</span>
                            </div>
                        </div>
                    </td>
                    <td
                        className={`px-2 sm:px-4 py-4 border-b border-content hidden sm:table-cell `}
                    >
                        <p className="block text-sm">
                            {format(new Date(user.created_at), "dd MMM yyyy")}
                        </p>
                    </td>

                    <td className="px-2 lg:px-4 py-4  border-b border-content">
                        <button
                            className="p-1 hover:bg-bkg-secondary hover:text-main text-slate-500 dark:text-content rounded-md disabled:cursor-not-allowed"
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            // disabled={}
                        >
                            <BsThreeDotsVertical />
                        </button>
                    </td>
                </tr>
            ))}
        </Table>
    );
}

export default UserTable;
