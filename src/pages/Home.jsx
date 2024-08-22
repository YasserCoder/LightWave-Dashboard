import {
    addDays,
    eachDayOfInterval,
    format,
    isSameDay,
    subDays,
} from "date-fns";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { useRecentOrders } from "../hook/order/useRecentOrders";

import Loader from "../ui/Loader";

import {
    FaArrowTrendDown,
    FaArrowTrendUp,
    FaChartLine,
    FaUsers,
} from "react-icons/fa6";
import { IoCubeSharp } from "react-icons/io5";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { useSearchParams } from "react-router-dom";

function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const last = searchParams.get("last") || "7";
    return (
        <div className="container py-7 flex flex-col gap-y-[30px]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl xs:text-4xl md:text-5xl font-extrabold capitalize">
                    dashbord
                </h1>
                <select
                    value={last}
                    className="p-1 cursor-pointer capitalize xs:text-lg bg-transparent outline-none"
                    onChange={(e) => {
                        searchParams.set("last", e.target.value);
                        setSearchParams(searchParams);
                    }}
                >
                    <option value="7" className="bg-input">
                        this week
                    </option>
                    <option value="30" className="bg-input">
                        this month
                    </option>
                    <option value="90" className="bg-input">
                        this trim
                    </option>
                </select>
            </div>
            <StatCards />
            <Charts />
        </div>
    );
}

function Charts() {
    const { isLoading, orders, isLoadingOne, ordersOne, numDays } =
        useRecentOrders();
    if (isLoading || isLoadingOne) return <Loader />;
    const allDates = eachDayOfInterval({
        start: subDays(new Date(), numDays - 1),
        end: new Date(),
    });
    const data = allDates.map((date) => {
        return {
            label: format(date, "MMM dd"),
            totalSales: orders
                .filter((order) => isSameDay(date, new Date(order.created_at)))
                .reduce((acc, cur) => acc + cur.totalAmount, 0),
            previousSales: ordersOne
                ?.filter((order) =>
                    isSameDay(
                        date,
                        addDays(new Date(order.created_at), numDays)
                    )
                )
                ?.reduce((acc, cur) => acc + cur.totalAmount, 0),
        };
    });
    return (
        <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
                <CartesianGrid stroke="#ccc" />
                <Tooltip />
                <Legend />
                <XAxis dataKey="label" />
                <YAxis unit="$" />
                <Area
                    type="monotone"
                    dataKey="previousSales"
                    stroke="#22c55e"
                    fill="#22c55e"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    name={`Last ${
                        numDays === 7
                            ? "Week"
                            : numDays === 30
                            ? "Month"
                            : "Trim"
                    }`}
                    unit="$"
                />
                <Area
                    type="monotone"
                    dataKey="totalSales"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    name={`This ${
                        numDays === 7
                            ? "Week"
                            : numDays === 30
                            ? "Month"
                            : "Trim"
                    }`}
                    unit="$"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
function StatCards() {
    return (
        <div className="flex items-center justify-between flex-wrap gap-y-4 sm:gap-y-6 lg:gap-y-8">
            <div className="bg-bkg-main rounded-xl p-4 space-y-[30px] basis-[100%] sm:basis-[48%] md:basis-[47%] xl:basis-[24%]">
                <div className="flex justify-between">
                    <div className="space-y-4">
                        <p className="font-light capitalize">total user</p>
                        <h2 className="text-2xl font-extrabold">1,200</h2>
                    </div>
                    <div className="p-4 rounded-3xl bg-indigo-600 bg-opacity-30 h-fit">
                        <FaUsers className="text-indigo-600 text-3xl" />
                    </div>
                </div>
                <p className="flex gap-1 items-center">
                    <span className="flex gap-2 items-center text-green-600">
                        <span>
                            <FaArrowTrendUp />
                        </span>
                        <span>8.6%</span>
                    </span>
                    <span>Up from yesterday</span>
                </p>
            </div>
            <div className="bg-bkg-main rounded-xl p-4 space-y-[30px] basis-[100%] sm:basis-[48%] md:basis-[47%] xl:basis-[24%]">
                <div className="flex justify-between">
                    <div className="w-[100px] space-y-4">
                        <p className="font-light capitalize">total orders</p>
                        <h2 className="text-2xl font-extrabold">10,293</h2>
                    </div>
                    <div className="p-4 rounded-3xl bg-yellow-500 bg-opacity-30 h-fit">
                        <IoCubeSharp className="text-yellow-500 text-3xl" />
                    </div>
                </div>
                <p className="flex gap-1 items-center">
                    <span className="flex gap-2 items-center text-green-600">
                        <span>
                            <FaArrowTrendUp />
                        </span>
                        <span>1.3%</span>
                    </span>
                    <span>Up from past week</span>
                </p>
            </div>
            <div className="bg-bkg-main rounded-xl p-4 space-y-[30px] basis-[100%] sm:basis-[48%] md:basis-[47%] xl:basis-[24%]">
                <div className="flex justify-between">
                    <div className="w-[100px] space-y-4">
                        <p className="font-light capitalize">total sales</p>
                        <h2 className="text-2xl font-extrabold">$65,000</h2>
                    </div>
                    <div className="p-4 rounded-3xl bg-green-400 bg-opacity-30 h-fit">
                        <FaChartLine className="text-green-400 text-3xl" />
                    </div>
                </div>
                <p className="flex gap-1 items-center">
                    <span className="flex gap-2 items-center text-red-500">
                        <span>
                            <FaArrowTrendDown />
                        </span>
                        <span>4.3%</span>
                    </span>
                    <span>Down from Yesterday</span>
                </p>
            </div>
            <div className="bg-bkg-main rounded-xl p-4 space-y-[30px] basis-[100%] sm:basis-[48%] md:basis-[47%] xl:basis-[24%]">
                <div className="flex justify-between">
                    <div className="w-[100px] space-y-4">
                        <p className="font-light capitalize">total pending</p>
                        <h2 className="text-2xl font-extrabold">10,293</h2>
                    </div>
                    <div className="p-4 rounded-3xl bg-red-400 bg-opacity-30 h-fit">
                        <RxCounterClockwiseClock className="text-red-400 text-3xl" />
                    </div>
                </div>
                <p className="flex gap-1 items-center">
                    <span className="flex gap-2 items-center text-green-600">
                        <span>
                            <FaArrowTrendUp />
                        </span>
                        <span>1.3%</span>
                    </span>
                    <span>Up from past week</span>
                </p>
            </div>
        </div>
    );
}
export default Home;
