import { format } from "date-fns";

import { useGetOrders } from "../hook/order/useGetOrders";
import { useScreenSize } from "../hook/useScreenSize";
import { PAGE_SIZE } from "../utils/constants";
import { formatCurrency } from "../utils/helpers";

import SortBy from "../ui/SortBy";
import Pagination from "../ui/Pagination";
import Loader from "../ui/Loader";

import { FaFilter, FaRegEye, FaTrash } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";

function Orders() {
    const { screenSize: isMediumScreen } = useScreenSize(1024);
    const { isLoading, orders, count } = useGetOrders(PAGE_SIZE);
    return (
        <div className="container py-7 flex flex-col gap-y-[30px] overflow-x-hidden">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl xs:text-4xl md:text-5xl font-extrabold capitalize">
                    orders
                </h1>
                {!isMediumScreen && <SelectOrder />}
            </div>
            {isMediumScreen && <SelectOrder />}
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <OrderTable orders={orders} />
                    <Pagination count={count} />
                </>
            )}
        </div>
    );
}
function SelectOrder() {
    return (
        <div className="flex sm:items-center gap-2 flex-col sm:flex-row border border-content rounded-md px-2 py-1 shadow-md w-fit text-sm sm:text-base">
            <div className="flex items-center justify-between xs:gap-2">
                <p className="capitalize flex items-center font-semibold gap-2">
                    <FaFilter />
                    <span>Filtred by :</span>
                </p>
                <SortBy
                    name={"sortBy"}
                    options={[
                        {
                            value: "created_at-desc",
                            label: "Date : Most Recent",
                        },
                        {
                            value: "created_at-asc",
                            label: "Date : Oldest",
                        },
                        {
                            value: "totalAmount-desc",
                            label: "Amount : Heigh-Low ",
                        },
                        {
                            value: "totalAmount-asc",
                            label: "Amount : Low-Heigh ",
                        },
                    ]}
                />
            </div>
            <span className="h-10 w-[2px] bg-content hidden sm:block"></span>
            <div className="flex items-center justify-between xs:gap-2">
                <p className="capitalize font-semibold">
                    <span>** order type :</span>
                </p>
                <SortBy
                    name={"status"}
                    options={[
                        { value: "", label: "All" },
                        { value: "pending", label: "Pending" },
                        { value: "confirmed", label: "confirmed" },
                        { value: "shipped", label: "shipped" },
                        { value: "delivered", label: "delivered" },
                    ]}
                />
            </div>
        </div>
    );
}

function OrderTable({ orders }) {
    return (
        <table className="w-full min-w-max table-auto text-left bg-bkg-main rounded-tl-lg rounded-tr-lg">
            <thead>
                <tr>
                    {["Name", "Place", "Date", "Status", "Amount", ""].map(
                        (heading, index) => (
                            <th
                                key={index}
                                className={`border-b border-content bg-slate-200 dark:bg-slate-800 px-2 sm:px-4 py-4 ${
                                    heading === "Place"
                                        ? "hidden lg:table-cell"
                                        : heading === "Name"
                                        ? "hidden xs:table-cell"
                                        : heading === "Date"
                                        ? "hidden sm:table-cell"
                                        : heading === "Amount"
                                        ? "hidden xxs:table-cell"
                                        : ""
                                }`}
                            >
                                <p
                                    className={`block text-sm font-bold uppercase`}
                                >
                                    {heading}
                                </p>
                            </th>
                        )
                    )}
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td className="px-2 sm:px-4 py-4 border-b border-content hidden xs:table-cell max-w-[80px] sm:max-w-[110px] lg:max-w-[160px] xl:max-w-none">
                            <p className="block text-sm text-nowrap line-clamp-1 font-medium">
                                {order.customerName}
                            </p>
                        </td>
                        <td className="px-2 sm:px-4 py-4 border-b border-content hidden lg:table-cell">
                            <p className="bloc text-sm ">
                                {order.deliveryPlace}
                            </p>
                        </td>
                        <td className="px-2 sm:px-4 py-4 border-b border-content hidden sm:table-cell">
                            <p className="flex gap-1 text-sm">
                                <span>
                                    {format(
                                        new Date(order.created_at),
                                        "dd MMM yyyy"
                                    )}
                                </span>
                                <span className="hidden lg:block">
                                    {`, ${format(
                                        new Date(order.created_at),
                                        "HH:mm"
                                    )}`}
                                </span>
                            </p>
                        </td>
                        <td className="px-2 sm:px-4 py-4 border-b border-content">
                            <div className="w-max">
                                <div
                                    className={`grid items-center font-sans font-bold uppercase whitespace-nowrap py-1 px-2 text-xs rounded-md ${
                                        order.status === "pending"
                                            ? "bg-orange-300 text-orange-700"
                                            : order.status === "delivred"
                                            ? "bg-green-300 text-green-700"
                                            : order.status === "confirmed"
                                            ? "bg-sky-300 text-sky-700"
                                            : order.status === "shipped"
                                            ? "bg-violet-300 text-violet-700"
                                            : "bg-red-300 text-red-700"
                                    }`}
                                >
                                    <span>{order.status}</span>
                                </div>
                            </div>
                        </td>
                        <td className="px-2 sm:px-4 py-4 border-b border-content hidden xxs:table-cell">
                            <p className="text-sm">
                                {formatCurrency(order.totalAmount)}
                            </p>
                        </td>
                        <td className="px-2 lg:px-4 py-4  border-b border-content">
                            <div className="flex items-center gap-1 xl:gap-2">
                                <button className="p-1 hover:bg-bkg-secondary hover:text-main text-content rounded-md">
                                    <FaRegEye />
                                </button>
                                <button className="p-1 hover:bg-bkg-secondary hover:text-main text-content  rounded-md">
                                    <MdOutlineEdit />
                                </button>
                                <button className="p-1 hover:bg-bkg-secondary hover:text-main text-content rounded-md">
                                    <FaTrash />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Orders;
