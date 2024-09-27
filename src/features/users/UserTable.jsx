import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useEditRole } from "../../hook/user/useEditRole";

import Table from "../../ui/Table";

const tHead = ["Name", "Email", "Phone", "Role", "Joined At", ""];
const objStyle = {
    Name: "hidden xxs:table-cell",
    "Joined At": "hidden lg:table-cell",
    Email: "hidden sm:table-cell",
    Phone: "hidden lg:table-cell",
};

function UserTable({ users }) {
    const navigate = useNavigate();
    const { isEditing, editRole } = useEditRole();

    function handleEditRole(id, role) {
        Swal.fire({
            title: "Are you sure?",
            text:
                role === "user"
                    ? "promote that user into admin , and give him full access to the dashboard"
                    : "demote that admin to base user , and prevent him from accessing the dashboard",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: `Yes, ${
                role === "user" ? "promote" : "demote"
            }  him!`,
            customClass: {
                popup: "dark:bg-gray-800 dark:text-white",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                editRole({ id, role: role === "user" ? "admin" : "user" });
            }
        });
    }
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
                        className={`px-2 sm:px-4 py-4 border-b border-content hidden sm:table-cell max-w-[120px] sm:max-w-[160px] lg:max-w-[230px] xl:max-w-[320px] `}
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
                                        : "bg-red-300 text-red-700"
                                }`}
                            >
                                <span>{user.authority}</span>
                            </div>
                        </div>
                    </td>
                    <td
                        className={`px-2 sm:px-4 py-4 border-b border-content hidden lg:table-cell `}
                    >
                        <p className="block text-sm">
                            {format(new Date(user.created_at), "dd MMM yyyy")}
                        </p>
                    </td>
                    <td className="px-2 lg:px-4 py-4  border-b border-content">
                        <button
                            className="py-1 w-[115px] flex justify-center capitalize text-sm shadow-md duration-300 bg-bkg-secondary border border-content  hover:shadow-xl hover:-translate-y-px active:translate-y-0.5 disabled:text-content rounded-md disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:cursor-not-allowed"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEditRole(user.id, user.authority);
                            }}
                            disabled={isEditing}
                        >
                            {user.authority === "user"
                                ? "make admin"
                                : "remove admin"}
                        </button>
                    </td>
                </tr>
            ))}
        </Table>
    );
}

export default UserTable;
