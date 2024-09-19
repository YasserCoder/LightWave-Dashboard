import { useState } from "react";
import Swal from "sweetalert2";
import { format } from "date-fns";

import { useGetOrders } from "../hook/order/useGetOrders";
import { useDeleteOrder } from "../hook/order/useDeleteOrder";
import { useUpdateOrder } from "../hook/order/useUpdateOrder";
import { useScreenSize } from "../hook/useScreenSize";
import { PAGE_SIZE } from "../utils/constants";
import { formatCurrency } from "../utils/helpers";

import SortBy from "../ui/SortBy";
import Pagination from "../ui/Pagination";
import Loader from "../ui/Loader";
import RadioBtns from "../ui/RadioBtns";
import Modal from "../ui/Modal";
import MiniLoader from "../ui/MiniLoader";

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
                            <Features id={order.id} status={order.status} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
function Features({ id, status }) {
    const { isDeleting, deleteOrder } = useDeleteOrder();

    function handleDelete() {
        Swal.fire({
            title: "Are you sure?",
            text: "Delete Order Definitively!",
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
                deleteOrder(id);
            }
        });
    }
    return (
        <div className="flex items-center gap-1 xl:gap-2">
            <Icon disabled={isDeleting}>
                <FaRegEye />
            </Icon>
            <Modal>
                <Modal.Open opens="order-form">
                    <button className="p-1 hover:bg-bkg-secondary hover:text-main text-content rounded-md disabled:cursor-not-allowed">
                        <MdOutlineEdit />
                    </button>
                </Modal.Open>
                <Modal.Window name="order-form">
                    <OrderForm status={status} id={id} />
                </Modal.Window>
            </Modal>

            <Icon disabled={isDeleting} handleClick={handleDelete}>
                <FaTrash />
            </Icon>
        </div>
    );
}
function Icon({ handleClick, disabled, children }) {
    return (
        <button
            className="p-1 hover:bg-bkg-secondary hover:text-main text-content rounded-md disabled:cursor-not-allowed"
            onClick={handleClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

function OrderForm({ onClose, id, status }) {
    const [value, setValue] = useState(status);
    const [isEditing, setIsEditing] = useState(false);
    const { updateOrder } = useUpdateOrder();

    function handleSubmit(event) {
        event.preventDefault();
        setIsEditing(true);
        updateOrder(
            {
                status: value,
                id: id,
            },
            {
                onSettled: () => {
                    setIsEditing(false);
                    onClose?.();
                },
            }
        );
    }
    return (
        <form className="flex flex-col gap-y-5 w-full" onSubmit={handleSubmit}>
            <h1 className="text-3xl capitalize font-bold">
                update order status
            </h1>
            <RadioBtns value={value} setValue={setValue} />
            <div className="w-full border-t border-content mt-2 pt-3 pb-1 flex justify-end">
                <div className="flex gap-3 items-center flex-wrap">
                    {isEditing && <MiniLoader />}
                    <Btn
                        type={"reset"}
                        label={"cancel"}
                        onClick={() => onClose?.()}
                        disabled={isEditing}
                    />
                    <Btn
                        type={"submit"}
                        label={"update order"}
                        onClick={handleSubmit}
                        disabled={isEditing || value === status}
                    />
                </div>
            </div>
        </form>
    );
}
function Btn({ onClick, type, label, disabled }) {
    return (
        <button
            type={type}
            className={`capitalize font-semibold py-1 px-2 xs:text-lg xs:py-1.5 xs:px-5 rounded-lg disabled:bg-opacity-30 disabled:cursor-not-allowed ${
                type === "submit"
                    ? "bg-colored text-white hover:bg-sky-600"
                    : "bg-transparent border border-content hover:bg-main hover:text-bkg-main"
            }`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
}

export default Orders;
