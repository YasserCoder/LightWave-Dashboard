import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import { FaTrash } from "react-icons/fa6";

const tHead = ["Name", "Source", "Content", "Date", ""];

function MessageTable({ messages }) {
    const navigate = useNavigate();
    return (
        <table className="w-full min-w-max table-auto text-left bg-bkg-main rounded-tl-lg rounded-tr-lg">
            <thead>
                <tr>
                    {tHead.map((heading, index) => (
                        <th
                            key={index}
                            className={`border-b border-content bg-slate-200 dark:bg-slate-800 px-2 sm:px-4 py-4 ${
                                heading === "Name"
                                    ? "hidden xs:table-cell"
                                    : heading === "Date"
                                    ? "hidden sm:table-cell"
                                    : heading === "Content"
                                    ? "hidden xxs:table-cell"
                                    : ""
                            }`}
                        >
                            <p className={`block text-sm font-bold uppercase`}>
                                {heading}
                            </p>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
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
                                    console.log("delete");
                                }}
                                // disabled={disabled}
                            >
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default MessageTable;
