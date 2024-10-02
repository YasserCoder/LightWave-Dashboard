import Swal from "sweetalert2";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";

import { useGetDeal } from "../../hook/deal/useGetDeal";
import { useDeleteDeal } from "../../hook/deal/useDeleteDeal";
import Loader from "../../ui/Loader";

import { FaAngleLeft, FaAngleRight, FaTrash } from "react-icons/fa6";

function DisplayDeals({ deals }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <div className="relative w-[80%] mx-auto mt-10">
            <button
                ref={prevRef}
                className={`absolute top-[50%] z-20 translate-y-[-50%] -left-[42px] sm:-left-13 md:-left-16 lg:-left-20 xl:text-5xl size-8 md:size-12 xl:size-16 items-center justify-center rounded-full hover:bg-colored hover:text-white hover:scale-110 text-xl md:text-3xl cursor-pointer duration-300 disabled:hidden ${
                    deals.length > 2 ? "flex" : "hidden"
                }`}
            >
                <FaAngleLeft />
            </button>
            <button
                ref={nextRef}
                className={`absolute top-[50%] z-20 translate-y-[-50%] -right-[42px] sm:-right-13 md:-right-16 lg:-right-20 xl:text-5xl size-8 md:size-12 xl:size-16 items-center justify-center rounded-full hover:bg-colored hover:text-white hover:scale-110 text-xl md:text-3xl cursor-pointer duration-300 disabled:hidden ${
                    deals.length > 2 ? "flex" : "hidden"
                }`}
            >
                <FaAngleRight />
            </button>
            <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                centeredSlides={deals.length === 1}
                loop={deals.length > 1}
                grabCursor={true}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                        loop: deals.length > 1,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                        loop: deals.length > 2,
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                        loop: deals.length > 3,
                    },
                }}
            >
                {deals.map((deal) => {
                    return (
                        <SwiperSlide key={deal.id}>
                            <Deal id={deal.id} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
function Deal({ id }) {
    const { isGetting, deal } = useGetDeal(id);
    const { isDeleting, deleteDeal } = useDeleteDeal();
    function handleDelete(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "Delete Deal Definitively!",
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
                deleteDeal(id);
            }
        });
    }

    if (isGetting) return <Loader />;
    return (
        <div className="border relative shadow-lg">
            <button
                className="absolute top-1 right-1 text-red-500 hover:scale-105 text-lg duration-200"
                disabled={isDeleting}
                onClick={() => handleDelete(deal.id)}
            >
                <FaTrash />
            </button>
            <img
                src={deal.img}
                alt="announce"
                className="h-full object-contain"
            />
        </div>
    );
}
export default DisplayDeals;
