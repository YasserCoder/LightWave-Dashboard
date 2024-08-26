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
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { useRecentOrders } from "../hook/order/useRecentOrders";
import { useMostSoldeCat } from "../hook/category/useMostSoldeCat";
import { calculatePercentageChange, formatCurrency } from "../utils/helpers";

import Loader from "../ui/Loader";
import SelectDuration from "../ui/SelectDuration";

import {
    FaArrowTrendDown,
    FaArrowTrendUp,
    FaChartLine,
    FaUsers,
} from "react-icons/fa6";
import { IoCubeSharp } from "react-icons/io5";
import { RxCounterClockwiseClock } from "react-icons/rx";

function Home() {
    const { isLoading, orders, isLoading2, lastOrders, numDays } =
        useRecentOrders();
    return (
        <div className="container py-7 flex flex-col gap-y-[30px]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl xs:text-4xl md:text-5xl font-extrabold capitalize">
                    dashbord
                </h1>
                <SelectDuration />
            </div>
            {isLoading || isLoading2 ? (
                <Loader />
            ) : (
                <>
                    <StatCards
                        orders={orders}
                        lastOrders={lastOrders}
                        numDays={numDays}
                    />
                    <TotalSales
                        orders={orders}
                        lastOrders={lastOrders}
                        numDays={numDays}
                    />
                    <div className="flex flex-col gap-y-8 lg:flex-row justify-between">
                        <MostSolde />
                        <div className=""></div>
                    </div>
                </>
            )}
        </div>
    );
}

function MostSolde() {
    const { isLoading, categories } = useMostSoldeCat();
    const renderCustomAxisTick = ({ x, y, payload }) => {
        let path = "";

        switch (payload.value) {
            case "Lighting":
                path =
                    "M899.072 99.328q9.216 13.312 17.92 48.128t16.384 81.92 13.824 100.352 11.264 102.912 9.216 90.112 6.144 60.928q4.096 30.72 7.168 70.656t5.632 79.872 4.096 75.264 2.56 56.832q-13.312 16.384-30.208 25.6t-34.304 11.264-34.304-2.56-30.208-16.896q-1.024-10.24-3.584-33.28t-6.144-53.76-8.192-66.56-8.704-71.68q-11.264-83.968-23.552-184.32-7.168 37.888-11.264 74.752-4.096 31.744-6.656 66.56t-0.512 62.464q1.024 18.432 3.072 29.184t4.608 19.968 5.12 21.504 5.12 34.304 5.12 56.832 4.608 90.112q-11.264 24.576-50.688 42.496t-88.576 29.696-97.28 16.896-74.752 5.12q-18.432 0-46.08-2.56t-60.416-7.168-66.048-12.288-61.952-17.92-49.664-24.064-28.16-30.208q2.048-55.296 5.12-90.112t5.632-56.832 5.12-34.304 5.12-21.504 4.096-19.968 3.584-29.184q2.048-27.648-0.512-62.464t-6.656-66.56q-4.096-36.864-11.264-74.752-13.312 100.352-24.576 184.32-5.12 35.84-9.216 71.68t-8.192 66.56-6.656 53.76-2.56 33.28q-13.312 12.288-30.208 16.896t-34.304 2.56-33.792-11.264-29.696-25.6q0-21.504 2.048-56.832t4.096-75.264 5.632-79.872 6.656-70.656q2.048-20.48 6.144-60.928t9.728-90.112 11.776-102.912 13.824-100.352 16.384-81.92 17.92-48.128q20.48-12.288 56.32-25.6t73.216-26.624 71.168-25.088 50.176-22.016q10.24 13.312 16.896 61.44t13.312 115.712 15.36 146.432 23.04 153.6l38.912-334.848-29.696-25.6 43.008-54.272 15.36 2.048 15.36-2.048 43.008 54.272-29.696 25.6 38.912 334.848q14.336-74.752 23.04-153.6t15.36-146.432 13.312-115.712 16.896-61.44q16.384 10.24 50.176 22.016t71.168 25.088 73.216 26.624 56.32 25.6";
                break;
            case "Home Automation":
                path =
                    "M662.528 451.584q10.24 5.12 30.208 16.384t46.08 31.744 57.856 52.736 65.024 80.896 67.072 115.2 64.512 154.624q-15.36 9.216-31.232 21.504t-31.232 22.016-31.744 15.36-32.768 2.56q-44.032-9.216-78.336-8.192t-62.976 7.68-53.248 16.896-47.616 19.968-46.08 16.384-49.664 6.656q-57.344-1.024-110.592-16.896t-101.376-32.256-89.6-25.088-75.264 4.608q-20.48 8.192-41.984 1.024t-38.912-18.432q-20.48-13.312-39.936-33.792 37.888-116.736 86.016-199.68t92.672-136.704 78.848-81.408 43.52-33.792q9.216-5.12 10.24-25.088t-1.024-40.448q-3.072-24.576-9.216-54.272l-150.528-302.08 180.224-29.696q27.648 52.224 53.76 79.36t50.176 36.864 45.568 5.12 39.936-17.92q43.008-30.72 80.896-103.424l181.248 29.696q-20.48 48.128-45.056 99.328-20.48 44.032-47.616 97.28t-57.856 105.472q-12.288 34.816-13.824 57.344t1.536 36.864q4.096 16.384 12.288 25.6z";
                break;
            case "Batteries and Chargers":
                path =
                    "M168.063 21.844c-25.008 0-47.713 5.09-64.97 13.968-16.938 8.716-29.722 21.962-30.187 38.626h-.03v93.625C59.258 180.325 46.9 197.92 37.75 219.032c-9.94 22.934-14.284 45.82-13 65.187 1.25 18.84 8.173 35.74 23 42.905l.344.156c.302.143.598.274.906.408l23.875 10.343v108.814h.03c.675 16.458 13.396 29.547 30.19 38.187 17.257 8.88 39.97 13.97 64.968 13.97 24.996 0 47.71-5.09 64.968-13.97 16.794-8.64 29.515-21.728 30.19-38.186h.03V420.56l42.844 18.563.22.094 74.56 32.31 7.72 3.345.844.375v-.03c15.48 6.212 32.73-.264 47.468-12.345 15.01-12.302 28.71-31.118 38.656-54.063 9.946-22.944 14.315-45.823 13.032-65.187-1.26-19.01-8.33-36.01-23.438-43.063v-.03l-8.562-3.72L382.03 264.5l-118.78-51.47V76.97c.025-.53.03-1.06.03-1.595 0-.315-.02-.625-.03-.938-.465-16.663-13.248-29.91-30.188-38.624-17.256-8.88-39.992-13.97-65-13.97zM140.25 43.062c.03-.005.064.006.094 0-6.743 3.237-10.906 7.637-10.906 12.5 0 9.93 17.292 17.97 38.625 17.97 21.332 0 38.625-8.04 38.625-17.97 0-4.863-4.164-9.263-10.907-12.5 11.11 2.093 20.927 5.366 28.72 9.376 13.818 7.11 20.094 15.646 20.094 22.937 0 7.29-6.276 15.797-20.094 22.906-13.818 7.11-34.028 11.907-56.438 11.907-22.41 0-42.62-4.797-56.437-11.906-13.818-7.108-20.063-15.614-20.063-22.905 0-7.29 6.245-15.828 20.063-22.938 7.772-3.998 17.554-7.28 28.625-9.374zM72.875 195.656v122l-16.438-7.125c-6.678-2.894-12.003-12.02-13.03-27.53-1.03-15.51 2.593-35.983 11.5-56.53 5.082-11.73 11.316-22.17 17.968-30.814zm171.688 1.75V445.47c0 7.278-6.24 15.825-20.063 22.936-13.822 7.112-34.042 11.906-56.438 11.906-22.395 0-42.615-4.794-56.437-11.906-13.822-7.11-20.063-15.658-20.063-22.937V200.31L145.375 280l-36.844 12.875L229.75 420.25l-51.72-105.78 23.907-11.845-40.156-84.188c2.082.073 4.168.125 6.282.125 24.997 0 47.71-5.09 64.97-13.968 4.134-2.128 8.008-4.537 11.53-7.188zm18.687 36l79 34.25-79 14.78v-49.03zm187.97 82.78c2.094.035 3.983.433 5.655 1.158 6.69 2.9 12.035 12.026 13.063 27.53.577 8.715-.333 18.995-2.813 29.97-.305-7.425-2.682-12.95-7.125-14.875-9.11-3.95-23.39 8.707-31.875 28.28-8.484 19.573-7.953 38.645 1.156 42.594 4.45 1.928 10.12-.104 15.75-4.97-6.316 9.33-13.207 17.023-19.967 22.563-12.02 9.85-22.342 12.18-29.032 9.282-6.688-2.9-12.034-12.027-13.06-27.533-1.03-15.505 2.618-35.94 11.53-56.5 8.912-20.56 21.357-37.21 33.375-47.062 9.014-7.388 17.058-10.537 23.344-10.438zm-153.5 8.658c-.9 1.89-1.78 3.8-2.626 5.75-9.94 22.935-14.315 45.79-13.03 65.156.307 4.65.966 9.173 1.998 13.47l-20.812-9v-74.126l34.47-1.25z";
                break;
            default:
                path = "";
        }

        return (
            <svg
                x={x - 12}
                y={y + 4}
                width={24}
                height={24}
                viewBox="0 0 1024 1024"
                fill="#666"
            >
                <path d={path} />
            </svg>
        );
    };
    if (isLoading) return <Loader />;
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart height={300} data={categories}>
                <XAxis dataKey="category" tick={renderCustomAxisTick} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" barSize={30} fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}

function TotalSales({ orders, lastOrders, numDays }) {
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
            previousSales: lastOrders
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
        <div className="space-y-8 mt-5">
            <h1 className="text-2xl xs:text-3xl capitalize font-bold xs:ml-5">
                total sales :
            </h1>
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
                                : "Quarter"
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
                                : "Quarter"
                        }`}
                        unit="$"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
function StatCards({ orders, lastOrders, numDays }) {
    const duration =
        numDays === 7 ? "Week" : numDays === 30 ? "Month" : "Quarter";
    const ordersSales = orders.reduce((acc, cur) => acc + cur.totalAmount, 0);
    const lastOrdersSales = lastOrders.reduce(
        (acc, cur) => acc + cur.totalAmount,
        0
    );

    const pendingOrders = orders.filter(
        (order) => order.status === "pending"
    ).length;
    const lastPendingOrders = lastOrders.filter(
        (order) => order.status === "pending"
    ).length;

    const ordersPer = calculatePercentageChange(
        lastOrders.length,
        orders.length
    );
    const salesPer = calculatePercentageChange(lastOrdersSales, ordersSales);
    const pendingPer = calculatePercentageChange(
        lastPendingOrders,
        pendingOrders
    );
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
                        <h2 className="text-2xl font-extrabold">
                            {orders.length}
                        </h2>
                    </div>
                    <div className="p-4 rounded-3xl bg-yellow-500 bg-opacity-30 h-fit">
                        <IoCubeSharp className="text-yellow-500 text-3xl" />
                    </div>
                </div>
                <p className="flex gap-1 items-center">
                    {ordersPer !== 0 && (
                        <span
                            className={`flex gap-2 items-center ${
                                ordersPer > 0
                                    ? "text-green-600"
                                    : "text-red-500"
                            } `}
                        >
                            <span>
                                {ordersPer > 0 ? (
                                    <FaArrowTrendUp />
                                ) : (
                                    <FaArrowTrendDown />
                                )}
                            </span>
                            <span>{`${Math.abs(ordersPer).toFixed(1)}%`}</span>
                        </span>
                    )}
                    <span>{`${
                        ordersPer === 0 ? "Same" : ordersPer > 0 ? "Up" : "Down"
                    } from past ${duration}`}</span>
                </p>
            </div>
            <div className="bg-bkg-main rounded-xl p-4 space-y-[30px] basis-[100%] sm:basis-[48%] md:basis-[47%] xl:basis-[24%]">
                <div className="flex justify-between">
                    <div className="w-[100px] space-y-4">
                        <p className="font-light capitalize">total sales</p>
                        <h2 className="text-2xl font-extrabold">
                            {formatCurrency(ordersSales)}
                        </h2>
                    </div>
                    <div className="p-4 rounded-3xl bg-green-400 bg-opacity-30 h-fit">
                        <FaChartLine className="text-green-400 text-3xl" />
                    </div>
                </div>
                <p className="flex gap-1 items-center">
                    {salesPer !== 0 && (
                        <span
                            className={`flex gap-2 items-center ${
                                salesPer > 0 ? "text-green-600" : "text-red-500"
                            } `}
                        >
                            <span>
                                {salesPer > 0 ? (
                                    <FaArrowTrendUp />
                                ) : (
                                    <FaArrowTrendDown />
                                )}
                            </span>
                            <span>{`${Math.abs(salesPer).toFixed(1)}%`}</span>
                        </span>
                    )}
                    <span>{`${
                        salesPer === 0 ? "Same" : salesPer > 0 ? "Up" : "Down"
                    } from past ${duration}`}</span>
                </p>
            </div>
            <div className="bg-bkg-main rounded-xl p-4 space-y-[30px] basis-[100%] sm:basis-[48%] md:basis-[47%] xl:basis-[24%]">
                <div className="flex justify-between">
                    <div className="w-[100px] space-y-4">
                        <p className="font-light capitalize">total pending</p>
                        <h2 className="text-2xl font-extrabold">
                            {pendingOrders}
                        </h2>
                    </div>
                    <div className="p-4 rounded-3xl bg-red-400 bg-opacity-30 h-fit">
                        <RxCounterClockwiseClock className="text-red-400 text-3xl" />
                    </div>
                </div>
                <p className="flex gap-1 items-center">
                    {pendingPer !== 0 && (
                        <span
                            className={`flex gap-2 items-center ${
                                pendingPer > 0
                                    ? "text-green-600"
                                    : "text-red-500"
                            } `}
                        >
                            <span>
                                {pendingPer > 0 ? (
                                    <FaArrowTrendUp />
                                ) : (
                                    <FaArrowTrendDown />
                                )}
                            </span>
                            <span>{`${Math.abs(pendingPer).toFixed(1)}%`}</span>
                        </span>
                    )}
                    <span>{`${
                        pendingPer === 0
                            ? "Same"
                            : pendingPer > 0
                            ? "Up"
                            : "Down"
                    } from past ${duration}`}</span>
                </p>
            </div>
        </div>
    );
}
export default Home;
