import { useGetOrders } from "../hook/order/useGetOrders";
import { useScreenSize } from "../hook/useScreenSize";
import { TABLE_PAGE_SIZE } from "../utils/constants";

import Pagination from "../ui/Pagination";
import Loader from "../ui/Loader";
import OrderTable from "../features/orders/OrderTable";
import SelectOrder from "../features/orders/SelectOrder";
import Main from "../ui/Main";
import MainHeader from "../ui/MainHeader";

function Orders() {
    const { screenSize: isMediumScreen } = useScreenSize(1024);
    const { isLoading, orders, count } = useGetOrders(TABLE_PAGE_SIZE);
    return (
        <Main>
            <MainHeader title={"orders"}>
                {!isMediumScreen && <SelectOrder />}
            </MainHeader>
            {isMediumScreen && <SelectOrder />}
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <OrderTable orders={orders} />
                    <Pagination count={count} pageSize={TABLE_PAGE_SIZE} />
                </>
            )}
        </Main>
    );
}
export default Orders;
