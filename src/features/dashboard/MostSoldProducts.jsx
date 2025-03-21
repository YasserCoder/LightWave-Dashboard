import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { useMostSoldeProduct } from "../../hook/product/useMostSoldeProduct";

import Loader from "../../ui/Loader";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import "swiper/css";

function MostSoldProducts() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const { isLoading, products } = useMostSoldeProduct();
    if (isLoading) return <Loader />;
    return (
        <div className="lg:w-[310px] xl:w-[400px] 2xl:w-[450px]">
            <div className="bg-bkg-main relative rounded-xl shadow-lg py-4 px-2 xs:p-4 flex flex-col gap-y-5">
                <button
                    ref={prevRef}
                    className={`absolute top-[50%] z-20 translate-y-[-50%] left-2 size-8 text-xl md:text-2xl flex items-center justify-center rounded-full hover:bg-colored hover:text-white hover:scale-105 cursor-pointer duration-300 disabled:hidden`}
                >
                    <FaAngleLeft />
                </button>
                <button
                    ref={nextRef}
                    className={`absolute top-[50%] z-20 translate-y-[-50%] right-2 size-8 text-xl md:text-2xl flex items-center justify-center rounded-full hover:bg-colored hover:text-white hover:scale-105 cursor-pointer duration-300 disabled:hidden`}
                >
                    <FaAngleRight />
                </button>
                <h1 className="text-2xl capitalize font-bold">
                    most sold products
                </h1>
                <div className="">
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={1}
                        spaceBetween={20}
                        grabCursor={true}
                        onInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 1,
                            },
                        }}
                        className=""
                    >
                        {products.map((prod, i) => {
                            return (
                                <SwiperSlide key={prod.id} className="w-fit">
                                    <div
                                        data-test={prod.name
                                            .split(" ")
                                            .join("-")}
                                        className="w-[80%] mx-auto h-[312px] bg-white flex flex-col rounded-xl border-2"
                                    >
                                        <div className="relative flex flex-col">
                                            <img
                                                src={prod.imgUrl}
                                                alt={prod.imgAlt}
                                                className="h-[200px] object-contain"
                                            />
                                            <span
                                                data-test="prod-order"
                                                className="absolute -top-2 right-3 h-11 pt-3 bg-red-600 text-white text-lg font-bold z-20 px-2"
                                            >
                                                {i + 1}
                                            </span>
                                        </div>
                                        <div className="border-t mt-1 py-2 px-4 flex flex-col items-center justify-between flex-1">
                                            <h3 className="font-semibold text-black line-clamp-2 text-center">
                                                {prod.name}
                                            </h3>
                                            <p className="text-black text-lg font-semibold space-x-2 content-end mb-2 lg:mb-1">
                                                <span
                                                    data-test="prod-quantity"
                                                    className="text-red-600"
                                                >
                                                    {prod.quantity}
                                                </span>
                                                <span>Sales</span>
                                            </p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default MostSoldProducts;
