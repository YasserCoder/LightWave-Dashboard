import { useRecentOrders } from "../hook/order/useRecentOrders";
import { useRecentUsers } from "../hook/auth/useRecentUsers";
import { useUsers } from "../hook/auth/useUsers";

import Loader from "../ui/Loader";
import StatCards from "../features/dashbord/StatCards";
import TotalSales from "../features/dashbord/TotalSales";
import MostSoldBarChart from "../features/dashbord/MostSoldBarChart";
import MostSoldProducts from "../features/dashbord/MostSoldProducts";
import SelectDuration from "../features/dashbord/SelectDuration";

function Home() {
    const { isLoading, orders, isLoading2, lastOrders, numDays } =
        useRecentOrders();
    const { isLoading3, isLoading4, users, lastUsers } = useRecentUsers();
    const { isLoading: isCounting, count } = useUsers();
    return (
        <div className="container py-7 flex flex-col gap-y-[30px] overflow-x-hidden">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl xs:text-4xl md:text-5xl font-extrabold capitalize">
                    dashbord
                </h1>
                <SelectDuration />
            </div>
            {isLoading ||
            isLoading2 ||
            isLoading3 ||
            isLoading4 ||
            isCounting ? (
                <Loader />
            ) : (
                <>
                    <StatCards
                        count={count}
                        users={users}
                        lastUsers={lastUsers}
                        orders={orders}
                        lastOrders={lastOrders}
                        numDays={numDays}
                    />
                    <TotalSales
                        orders={orders}
                        lastOrders={lastOrders}
                        numDays={numDays}
                    />
                    <div className="flex flex-col gap-8 lg:flex-row justify-between">
                        <MostSoldBarChart />
                        <MostSoldProducts />
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;
