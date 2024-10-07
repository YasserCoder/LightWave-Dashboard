import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import { useProductDetails } from "../hook/product/useProductDetails";
import { calculateNewPrice, formatCurrency } from "../utils/helpers";
import { useDeleteProduct } from "../hook/product/useDeleteProduct";

import EditProduct from "../features/products/EditProduct";
import Modal from "./Modal";
import CardLoader from "./CardLoader";

import { IoIosPricetag } from "react-icons/io";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

function ProdCard({ id }) {
    const { isLoading, productInfo } = useProductDetails(id);
    const { name, price, sale, soldOut, category, imgs } = {
        ...productInfo,
    };

    if (isLoading) return <CardLoader />;

    return (
        <div className={`shadow-xl flex flex-col relative z-0 bg-bkg-main`}>
            <div className={`relative h-56 overflow-hidden bg-white`}>
                {imgs.length > 0 && (
                    <Link
                        to={`product/${id}`}
                        className="h-full flex justify-center"
                    >
                        <img
                            src={imgs.at(0).imgUrl}
                            alt={imgs.at(0).imgAlt}
                            className="object-contain"
                            loading="lazy"
                        />
                    </Link>
                )}
                {sale !== 0 && (
                    <span className="absolute w-[44px] h-6 text-sm flex justify-center items-center right-2 top-3 bg-red-600 text-white">
                        {`-${sale}%`}
                    </span>
                )}
                {soldOut && (
                    <span className="absolute uppercase w-full h-8 text-2xl flex justify-center items-center z-30 top-[60%] translate-y-[-60%] bg-content text-input">
                        {`not available`}
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-1 px-4 py-2 border-y border-content flex-grow ">
                <div className="flex gap-[2px] text-content items-center text-xs capitalize whitespace-nowrap overflow-hidden text-ellipsis">
                    <p className="flex gap-1 items-center">
                        <span>
                            <IoIosPricetag />
                        </span>

                        <Link
                            to={`/products/${category.join("/")}`}
                            className="capitalize hover:font-semibold duration-300"
                        >
                            {category.at(-1)}
                        </Link>
                    </p>
                </div>
                <Link
                    className=" font-semibold uppercase flex-grow line-clamp-2 hover:text-colored duration-300"
                    title={name}
                    to={`product/${id}`}
                >
                    {name}
                </Link>
                <div className="flex gap-2 items-baseline my-1">
                    <span className="font-bold text-colored">
                        {formatCurrency(calculateNewPrice(price, sale))}
                    </span>
                    {sale !== 0 && (
                        <span className="line-through text-xs text-content">
                            {formatCurrency(calculateNewPrice(price, 0))}
                        </span>
                    )}
                </div>
            </div>

            <Features id={id} />
        </div>
    );
}
function Features({ id }) {
    const { isDeleting, deleteProduct } = useDeleteProduct();
    return (
        <div className="px-9 sm:px-6 py-2 flex justify-between items-center ">
            <Link
                to={`product/${id}`}
                className=" text-colored hover:scale-105 duration-300"
            >
                <span>
                    <FaRegEye className="size-[25px]" />
                </span>
            </Link>
            <span className="w-[2px] h-6 bg-content"></span>

            <Modal>
                <Modal.Open opens="product-form">
                    <button
                        className=" text-colored hover:scale-105 duration-300"
                        title="Edit Product"
                    >
                        <FaRegEdit className="size-[25px]" />
                    </button>
                </Modal.Open>
                <Modal.Window name="product-form">
                    <EditProduct id={id} />
                </Modal.Window>
            </Modal>

            <span className="w-[2px] h-6 bg-content"></span>
            <button
                className=" text-red-500 hover:scale-105 duration-300"
                title="Delete"
                disabled={isDeleting}
                onClick={() => {
                    Swal.fire({
                        title: "Are you sure?",
                        text: "Delete Product Definitively!",
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
                            deleteProduct(id);
                        }
                    });
                }}
            >
                <FaRegTrashAlt className="size-[25px]" />
            </button>
        </div>
    );
}
export default ProdCard;
