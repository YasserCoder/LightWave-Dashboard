import { useGetOrders } from "../hook/order/useGetOrders";
import { useScreenSize } from "../hook/useScreenSize";
import SortBy from "../ui/SortBy";
import { FaFilter } from "react-icons/fa6";
import { PAGE_SIZE } from "../utils/constants";
import Loader from "../ui/Loader";

function Orders() {
    const { screenSize: isMediumScreen } = useScreenSize(1024);
    const { isLoading, orders } = useGetOrders(PAGE_SIZE);
    console.log(orders);
    return (
        <div className="container py-7 flex flex-col gap-y-[30px] overflow-x-hidden">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl xs:text-4xl md:text-5xl font-extrabold capitalize">
                    orders
                </h1>
                {!isMediumScreen && <SelectOrder />}
            </div>
            {isMediumScreen && <SelectOrder />}
            {isLoading && <Loader />}
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

export default Orders;
