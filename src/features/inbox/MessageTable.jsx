import Swal from "sweetalert2";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import { useRead } from "../../hook/message/useRead";
import { useDeleteMessage } from "../../hook/message/useDeleteMessage";

import Table from "../../ui/Table";

import { FaTrash } from "react-icons/fa6";

const tHead = ["Name", "Source", "Content", "Date", ""];
const objStyle = {
    Name: "hidden xs:table-cell",
    Date: "hidden sm:table-cell",
    Content: "hidden xxs:table-cell",
};

function MessageTable({ messages }) {
    const navigate = useNavigate();
    const { makeSeen } = useRead();
    const { isDeleting, deleteMessage } = useDeleteMessage();

    function handleDelete(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "Delete Message Definitively!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            customClass: {
                popup: "dark:bg-gray-800 dark:text-white",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMessage(id);
            }
        });
    }
    return (
        <Table obj={objStyle} tHead={tHead}>
            {messages.map((message, index) => (
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
                        if (!message.read) {
                            makeSeen(message.id);
                        }
                        navigate(`message/${message.id}`);
                    }}
                >
                    <td
                        className={`px-2 sm:px-4 py-4 border-b border-content hidden xs:table-cell max-w-[80px] sm:max-w-[110px] lg:max-w-[160px] xl:max-w-none ${
                            !message.read && "font-extrabold"
                        }`}
                    >
                        <p className="block text-sm text-nowrap line-clamp-1">
                            {message.name}
                        </p>
                    </td>
                    <td className="px-2 sm:px-4 py-4 border-b border-content">
                        <div className="w-max">
                            <div
                                className={`grid items-center font-sans font-bold uppercase whitespace-nowrap py-1 px-2 text-xs rounded-md ${
                                    message.source === "client"
                                        ? "bg-green-300 text-green-700"
                                        : message.source === "admin"
                                        ? "bg-red-300 text-red-700"
                                        : ""
                                }`}
                            >
                                <span>{message.source}</span>
                            </div>
                        </div>
                    </td>
                    <td
                        className={`px-2 sm:px-4 py-4 border-b border-content hidden xxs:table-cell max-w-[120px] sm:max-w-[160px] lg:max-w-[230px] xl:max-w-[320px] ${
                            !message.read && "font-extrabold"
                        }`}
                    >
                        <p className="bloc text-sm line-clamp-1">
                            {message.content}
                        </p>
                    </td>
                    <td
                        className={`px-2 sm:px-4 py-4 border-b border-content hidden sm:table-cell ${
                            !message.read && "font-extrabold"
                        }`}
                    >
                        <p className="flex gap-1 text-sm">
                            <span>
                                {format(
                                    new Date(message.created_at),
                                    "dd MMM yyyy"
                                )}
                            </span>
                            <span className="hidden lg:block">
                                {`, ${format(
                                    new Date(message.created_at),
                                    "HH:mm"
                                )}`}
                            </span>
                        </p>
                    </td>

                    <td className="px-2 lg:px-4 py-4  border-b border-content">
                        <button
                            className="p-1 hover:bg-bkg-secondary hover:text-main text-slate-500 dark:text-content rounded-md disabled:cursor-not-allowed"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(message.id);
                            }}
                            disabled={isDeleting}
                        >
                            <FaTrash />
                        </button>
                    </td>
                </tr>
            ))}
        </Table>
    );
}

export default MessageTable;
