import { useGetOrders } from "../hook/order/useGetOrders";
import { useScreenSize } from "../hook/useScreenSize";
import { ORDER_PAGE_SIZE } from "../utils/constants";

import Pagination from "../ui/Pagination";
import Loader from "../ui/Loader";
import OrderTable from "../features/order/OrderTable";
import SelectOrder from "../features/order/SelectOrder";

function Orders() {
    const { screenSize: isMediumScreen } = useScreenSize(1024);
    const { isLoading, orders, count } = useGetOrders(ORDER_PAGE_SIZE);
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
                    <Pagination count={count} pageSize={ORDER_PAGE_SIZE} />
                </>
            )}
        </div>
    );
}
export default Orders;
