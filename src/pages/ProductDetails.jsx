import Swal from "sweetalert2";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Modal from "../ui/Modal";
import ProductForm from "../features/products/ProductForm";
import Loader from "../ui/Loader";

import { useProductDetails } from "../hook/product/useProductDetails";
import { useDeleteProduct } from "../hook/product/useDeleteProduct";
import { calculateNewPrice, formatCurrency } from "../utils/helpers";
import { useMoveBack } from "../hook/useMoveBack";
import { FREE_DELIVERY } from "../utils/constants";
import {
    FaAngleRight,
    FaArrowLeft,
    FaRegEdit,
    FaRegTrashAlt,
} from "react-icons/fa";
import { IoIosPricetag } from "react-icons/io";

function ProductDetails() {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const productId = Number(pathSegments[pathSegments.length - 1]);

    const { isLoading, productInfo } = useProductDetails(productId);
    const { isDeleting, deleteProduct } = useDeleteProduct();

    const moveBack = useMoveBack();

    const {
        brand,
        category,
        imgs,
        description,
        sale,
        price,
        specifications,
        garantee,
        name,
    } = { ...productInfo };

    if (isLoading) return <Loader />;

    return (
        <>
            <div className="container py-7 flex flex-col gap-y-5 overflow-x-clip">
                <button
                    onClick={moveBack}
                    className="text-2xl flex items-center gap-2 hover:text-content font-semibold capitalize self-start"
                >
                    <FaArrowLeft /> <span>Back</span>
                </button>
                <div className="flex flex-col gap-10 lg:justify-between lg:flex-row">
                    <ProdImg imgs={imgs} />
                    <div className="flex flex-col gap-y-3 ">
                        <div className="flex gap-2 items-center text-content">
                            <CategoryPath category={category} />
                        </div>
                        <p className="text-3xl font-bold">{name}</p>
                        <p className="capitalize flex gap-2 font-medium">
                            <span>brand</span>
                            <span className="text-colored font-semibold">
                                {brand}
                            </span>
                        </p>
                        <div className="my-[12px] sm:my-[22px] flex justify-between items-center flex-wrap overflow-hidden">
                            <div className="">
                                {sale > 0 && (
                                    <div className="flex gap-2 items-baseline">
                                        <span className="text-xs bg-yellow-300 text-white p-1 font-extrabold">{`-${sale}%`}</span>
                                        <span className="line-through text-content self-end">
                                            {formatCurrency(
                                                calculateNewPrice(price, 0)
                                            )}
                                        </span>
                                    </div>
                                )}
                                <p className="text-4xl mt-2 font-bold ">
                                    {formatCurrency(
                                        calculateNewPrice(price, sale)
                                    )}
                                </p>
                            </div>
                            <div className="flex items-center gap-4 pb-2 self-end">
                                <Modal>
                                    <Modal.Open opens="product-form">
                                        <button className=" text-colored hover:scale-105 duration-300">
                                            <FaRegEdit className="size-10" />
                                        </button>
                                    </Modal.Open>
                                    <Modal.Window name="product-form">
                                        <ProductForm />
                                    </Modal.Window>
                                </Modal>

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
                                            confirmButtonText:
                                                "Yes, delete it!",
                                            customClass: {
                                                popup: "dark:bg-gray-800 dark:text-white",
                                            },
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                deleteProduct(productId);
                                                moveBack();
                                            }
                                        });
                                    }}
                                >
                                    <FaRegTrashAlt className="size-10" />
                                </button>
                            </div>
                        </div>
                        <div className="border-y py-4 flex gap-x-2 gap-y-3 flex-wrap items-center">
                            <div className="w-[180px] bg-purple-300 pl-3 text-sm capitalize py-2 rounded-md text-[#333333] bg-opacity-50 dark:bg-opacity-100">
                                {`${garantee} warranty`}
                            </div>
                            <div className="w-[210px] bg-orange-200 text-sm capitalize pl-3 py-2 rounded-md text-[#333333] bg-opacity-50 dark:bg-opacity-100">
                                {`Certified products`}
                            </div>
                            <div className="w-[320px] bg-green-200 text-sm capitalize pl-3 py-2 rounded-md text-[#333333] bg-opacity-50 dark:bg-opacity-100">
                                {`Free delivery for orders over $${calculateNewPrice(
                                    FREE_DELIVERY,
                                    0
                                )}`}
                            </div>
                        </div>
                        {description !== null && (
                            <p className="my-[10px]  space-x-2">
                                <strong className="font-semibold text-lg">
                                    Description :{" "}
                                </strong>
                                <span>{`${description}`}</span>
                            </p>
                        )}
                        <ul>
                            {specifications.map((spec, i) => {
                                return (
                                    <li className="" key={i}>
                                        <span>-</span>
                                        {spec.key !== null && (
                                            <span className="font-semibold capitalize mr-2">{` ${spec.key} :`}</span>
                                        )}
                                        <span className="">{` ${spec.value} `}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

function ProdImg({ imgs }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="h-fit lg:sticky lg:top-5">
            <Swiper
                style={{
                    "--swiper-navigation-color": "#4880ff",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{
                    swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                            ? thumbsSwiper
                            : null,
                }}
                grabCursor={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="h-80  lg:w-[430px] xl:w-[550px]"
            >
                {imgs.map((pic, i) => {
                    return (
                        <SwiperSlide
                            className="flex justify-center items-center w-fit"
                            key={i}
                        >
                            <img
                                src={pic.imgUrl}
                                alt={pic.imgAlt}
                                className="h-full w-fit  object-contain"
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            <Swiper
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                onSwiper={setThumbsSwiper}
                className={`lg:w-[430px] xl:w-[550px] bg-slate-200 dark:bg-black py-2 ${
                    imgs.length < 1 && "hidden"
                }`}
            >
                {imgs.map((pic, i) => {
                    return (
                        <SwiperSlide
                            className="cursor-pointer opacity-40"
                            key={i}
                        >
                            <img
                                src={pic.imgUrl}
                                alt={pic.imgAlt}
                                className="h-full object-contain shadow-md"
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
function CategoryPath({ category }) {
    return category.map((e, i) => {
        return (
            <p key={i} className="flex gap-1 text-[15px] items-center">
                {i === 0 && (
                    <span>
                        <IoIosPricetag />
                    </span>
                )}

                <Link
                    to={`/products/${category.slice(0, i + 1).join("/")}`}
                    className="capitalize hover:font-semibold duration-300"
                >
                    {e}
                </Link>

                {category.length !== i + 1 && (
                    <span>
                        <FaAngleRight />
                    </span>
                )}
            </p>
        );
    });
}

export default ProductDetails;
