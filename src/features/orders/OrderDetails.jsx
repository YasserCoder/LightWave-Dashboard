import Swal from "sweetalert2";
import { Link, useLocation } from "react-router-dom";

import { useMoveBack } from "../../hook/useMoveBack";
import { useDeleteOrder } from "../../hook/order/useDeleteOrder";
import { useOrderDetails } from "../../hook/order/useOrderDetails";
import { formatCurrency } from "../../utils/helpers";

import Loader from "../../ui/Loader";
import Main from "../../ui/Main";
import BackButton from "../../ui/BackButton";
import OrderForm from "./OrderForm";
import Modal from "../../ui/Modal";

import { FaTrash } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";

function OrderDetails() {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const orderId = Number(pathSegments[pathSegments.length - 1]);

    const { isLoading, orderInfo } = useOrderDetails(orderId);

    return (
        <Main>
            <BackButton />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="flex flex-col items-start xxs:flex-row  xxs:justify-between  xxs:items-center mt-3 gap-y-2">
                        <h1 className="text-2xl xs:text-4xl lg:text-6xl font-bold capitalize">
                            {`Order#${orderId}`}
                        </h1>
                        <div className="flex items-center gap-x-2 self-end">
                            <div
                                className={`uppercase py-0.5 lg:py-1 px-2 xs:px-4 lg:px-6 rounded-full text-xs xs:text-sm lg:text-lg shadow-md font-semibold ${
                                    orderInfo.status === "pending"
                                        ? "bg-orange-300 text-orange-700 border-2 border-orange-700"
                                        : orderInfo.status === "delivred"
                                        ? "bg-green-300 text-green-700 border-2 border-green-700"
                                        : orderInfo.status === "confirmed"
                                        ? "bg-sky-300 text-sky-700 border-2 border-sky-700"
                                        : orderInfo.status === "shipped"
                                        ? "bg-violet-300 text-violet-700 border-2 border-violet-700"
                                        : "bg-red-300 text-red-700 border-2 border-red-700"
                                }`}
                            >
                                {orderInfo.status}
                            </div>
                            <Features
                                id={orderInfo.id}
                                status={orderInfo.status}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 lg:flex-row justify-between gap-x-6 mt-3 lg:relative">
                        <CustomerInfo orderInfo={orderInfo} />
                        <div className="flex flex-col gap-y-2 flex-1">
                            <h6 className="capitalize font-bold text-xl sm:text-3xl">
                                products
                            </h6>
                            <div className="flex flex-col gap-y-2">
                                {orderInfo.items?.map((item, i) => {
                                    return <Product item={item} key={i} />;
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-6 border-t border-content pt-8 ">
                        <p className="flex flex-col xxs:flex-row items-center gap-2 font-bold xs:font-extrabold text-xl xs:text-2xl sm:text-3xl capitalize mx-auto w-fit">
                            <span>total amount :</span>
                            <span className="text-colored text-2xl sm:text-3xl">
                                {formatCurrency(orderInfo.totalAmount)}
                            </span>
                        </p>
                    </div>
                </>
            )}
        </Main>
    );
}
function CustomerInfo({ orderInfo }) {
    return (
        <div className="bg-bkg-main rounded-lg py-5 px-1.5 xxs:px-2 xs:px-4  flex items-center flex-col gap-y-3 shadow-md lg:max-w-[370px] xl:max-w-[400px] h-fit lg:sticky lg:top-1">
            <h4 className="capitalize font-bold text-xl">customer info</h4>
            <div className="flex flex-wrap lg:flex-col lg:flex-nowrap gap-y-3 gap-x-5 self-start">
                <div className="flex gap-x-2 flex-wrap text-sm xs:text-base">
                    <label className="font-semibold xs:font-bold capitalize">
                        Name :
                    </label>
                    <p className=" max-w-[200px] overflow-x-clip">
                        {orderInfo.customerName}
                    </p>
                </div>
                <div className="flex gap-x-2 flex-wrap text-sm xs:text-base">
                    <label className="font-semibold xs:font-bold capitalize">
                        Phone :
                    </label>
                    <p className="">{orderInfo.customerPhone}</p>
                </div>
                <div className="flex gap-x-2 flex-wrap text-sm xs:text-base">
                    <label className="font-semibold xs:font-bold capitalize">
                        Email :
                    </label>
                    <p className="">{orderInfo.customerEmail}</p>
                </div>
                <div className="flex gap-x-2 flex-wrap text-sm xs:text-base">
                    <label className="font-semibold xs:font-bold capitalize">
                        place of delivery :
                    </label>
                    <p className="">{orderInfo.deliveryPlace}</p>
                </div>
                <div className="flex gap-x-2 flex-wrap text-sm xs:text-base">
                    <label className="font-semibold xs:font-bold capitalize">
                        Adress :
                    </label>
                    <p className="">{orderInfo.shippingAdress}</p>
                </div>
                {orderInfo.note !== "" && (
                    <div className="flex gap-x-2 flex-wrap text-sm xs:text-base">
                        <label className="font-semibold xs:font-bold capitalize">
                            Adress :
                        </label>
                        <p className="">{orderInfo.note}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
function Features({ id, status }) {
    const moveBack = useMoveBack();
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
                moveBack();
            }
        });
    }
    return (
        <div className="flex items-center gap-2">
            <Modal>
                <Modal.Open opens="order-form">
                    <button
                        className=" text-colored hover:scale-105 duration-300"
                        title="Edit"
                    >
                        <MdOutlineEdit className="size-5 xs:size-6 lg:size-9" />
                    </button>
                </Modal.Open>
                <Modal.Window name="order-form">
                    <OrderForm status={status} id={id} />
                </Modal.Window>
            </Modal>

            <button
                className=" text-red-500 hover:scale-105 duration-300"
                title="Delete"
                disabled={isDeleting}
                onClick={handleDelete}
            >
                <FaTrash className="size-5 xs:size-6 lg:size-9" />
            </button>
        </div>
    );
}
function Product({ item }) {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between gap-y-4 gap-x-6 items-center overflow-hidden border border-content py-4 px-2 sm:px-4 xl:px-6 rounded-md shadow-md bg-bkg-main">
            <div className="flex gap-[15px] flex-col xxs:flex-row items-center">
                {item.product.imgs.length > 0 && (
                    <div className="flex  items-center">
                        <img
                            src={item.product.imgs[0].imgUrl}
                            alt={item.product.imgs[0].imgAlt}
                            className="object-contain h-28 min-w-24 xs:min-w-36 sm:min-w-40 xl:min-w-48"
                        />
                    </div>
                )}
                <p className="text-sm xs:text-base flex items-end lg:text-lg font-bold flex-1">
                    <Link
                        to={`/products/product/${item.productId}`}
                        className="hover:text-colored line-clamp-3"
                        title={item.quantity}
                    >
                        {item.product.name}
                        <span className="text-colored">{` (X${item.quantity})`}</span>
                    </Link>
                </p>
            </div>
            {item.price !== null && (
                <div className="flex items-center gap-3">
                    <p className="capitalize text-lg font-semibold sm:hidden">
                        price :
                    </p>
                    <p className="font-bold text-lg xs:text-xl md:text-2xl text-colored">
                        {formatCurrency(item.price)}
                    </p>
                </div>
            )}
        </div>
    );
}

export default OrderDetails;
