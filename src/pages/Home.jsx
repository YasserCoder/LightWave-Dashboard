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
                    "M240.8 20.1h-1.9c-15.5.84-35.2 15.23-45 32.14-6.5 11.26-10.1 25.99-9.4 38.6.7 12.66 5.2 22.36 14.2 27.56 30.7 17.6 61.4 35.3 92.1 53l.7 4.5c3 21.4 12.5 43.1 27.7 61.9l97.9-169.58c-24-3.84-47.6-1.36-67.7 6.74l-4.3 1.7L253 23.58c-4-1.97-8.4-3.4-12.2-3.48zm252.6 45.12l-74.6 39.08c3.5 5.2 6.4 10.8 8.5 16.6l66.1-34.59zM407.6 122l-47.2 81.8c18.3-1.3 35.5-11.3 45.4-28.4 7.4-18 8.6-38.8 1.8-53.4zm24.4 22.1c.2 6.2-.3 12.5-1.6 18.7l63 1.5v-18.7c-20.5-.5-41-1-61.4-1.5zm-215.8 8.3c-3.3 7.2-6.3 14.3-9.1 21.4l27.4 10.5c2.6-6.3 5.3-12.7 8.2-19-9-4.8-18.7-9.1-26.5-12.9zM424 181c-2.8 5.6-6.7 11.2-10.4 15.5l79.8 49.9v-22c-23.1-14.5-46.2-29-69.4-43.4zm-223.7 10.2c-2.8 7.7-5.4 15.4-7.8 23.1l28.3 7.8c2.1-6.8 4.5-13.6 6.9-20.4-9.1-3.5-18.2-7-27.4-10.5zm202.4 15.6c-5 3.8-10.4 7-16.1 9.5l60.1 112.9 16.5-8.8c-20.1-37.8-40.3-75.7-60.5-113.6zm-33.4 14.6c-6.1 1-12.4 1.3-18.7.9l-4.3 124.1 18.7.7zm-182 10.9c-2 7.3-3.9 14.7-5.6 22.2l28.5 6.2c1.6-7 3.3-13.8 5.2-20.7-9.3-2.6-18.7-5.1-28.1-7.7zm-9.4 40.5c-1.4 7.4-2.6 14.8-3.8 22.3l29 3.1c1-6.5 2.1-12.9 3.3-19.2-9.5-2.1-19-4.2-28.5-6.2zm-6.2 40.9c-.9 7.4-1.7 14.9-2.3 22.5l29.1 1.5c.6-7.1 1.3-14.1 2.1-21-9.6-1-19.3-2-28.9-3zm-3.6 41.1s-.9 16.5-1.1 25l29.2-.5c.2-7.8.6-15.5 1-22.9-9.7-.6-19.4-1.1-29.1-1.6zm27.7 43.2l-29.2.5c-.1 5.7-.1 11.4-.1 17.3 9.8-1.8 19.5-3.3 29.3-4.5zm53.9 28.5c-38.1.2-76.4 5.6-114.7 15.5-4.9 14.7-8.9 32.3-11.6 52.4h252.4c-2.7-20.2-6.6-37.9-11.5-52.6-38.2-10.5-76.4-15.4-114.6-15.3zM83.23 446.8c-20.57-.1-41.18 3.1-64.34 9.2v19.4c34.27-9.5 60.58-12.2 89.91-7.5 1.3-6.5 2.8-12.7 4.4-18.6-10.2-1.7-20.07-2.5-29.97-2.5z";
                break;
            case "Home Automation":
                path =
                    "M138.188 38.875C67.478 79.483 19.624 155.295 19.624 242.688c0 87.858 48.383 163.966 119.72 204.406-47.45-46.694-78.25-120.545-78.25-204.406 0-83.27 30.218-157.06 77.093-203.813zm237.687 2.313c45.574 46.86 74.75 119.59 74.75 201.5 0 82.128-29.53 154.623-75.313 201.468C444 403.043 490.344 328.56 490.344 242.686c0-85.87-46.022-160.33-114.47-201.5zm-179.28 46.718c-61.425 24.617-105.126 84.56-105.126 154.78 0 70.413 43.995 130.262 105.686 154.75-41.348-30.252-69.47-88.174-69.47-154.748 0-66.367 27.774-124.45 68.908-154.782zm142.5 8.78c35.18 31.963 57.81 85.566 57.81 146 0 61.134-23.1 114.77-58.967 146.595 52.006-28.25 87.593-83.246 87.593-146.592 0-62.886-35.052-117.566-86.436-146zm-115.22 44.064c-42.65 14.34-73.125 54.454-73.125 101.938 0 47.91 30.968 88.504 74.22 102.5-27.047-18.556-45.97-57.28-45.97-102.5 0-44.573 18.457-83.072 44.875-101.938zm78.094 3.344c23.836 19.926 39.342 56.72 39.342 98.594 0 42.514-15.99 79.48-40.437 99.187 38.416-16.463 65.375-54.746 65.375-99.188 0-44-26.476-81.867-64.28-98.593zM262 211.344c-20.3 0-36.75 16.45-36.75 36.75 0 15.484 9.573 28.743 23.125 34.156v213.125h27.25V282.25c13.558-5.41 23.125-18.668 23.125-34.156 0-20.3-16.45-36.75-36.75-36.75z";
                break;
            case "Batteries and Chargers":
                path =
                    "M168.063 21.844c-25.008 0-47.713 5.09-64.97 13.968-16.938 8.716-29.722 21.962-30.187 38.626h-.03v93.625C59.258 180.325 46.9 197.92 37.75 219.032c-9.94 22.934-14.284 45.82-13 65.187 1.25 18.84 8.173 35.74 23 42.905l.344.156c.302.143.598.274.906.408l23.875 10.343v108.814h.03c.675 16.458 13.396 29.547 30.19 38.187 17.257 8.88 39.97 13.97 64.968 13.97 24.996 0 47.71-5.09 64.968-13.97 16.794-8.64 29.515-21.728 30.19-38.186h.03V420.56l42.844 18.563.22.094 74.56 32.31 7.72 3.345.844.375v-.03c15.48 6.212 32.73-.264 47.468-12.345 15.01-12.302 28.71-31.118 38.656-54.063 9.946-22.944 14.315-45.823 13.032-65.187-1.26-19.01-8.33-36.01-23.438-43.063v-.03l-8.562-3.72L382.03 264.5l-118.78-51.47V76.97c.025-.53.03-1.06.03-1.595 0-.315-.02-.625-.03-.938-.465-16.663-13.248-29.91-30.188-38.624-17.256-8.88-39.992-13.97-65-13.97zM140.25 43.062c.03-.005.064.006.094 0-6.743 3.237-10.906 7.637-10.906 12.5 0 9.93 17.292 17.97 38.625 17.97 21.332 0 38.625-8.04 38.625-17.97 0-4.863-4.164-9.263-10.907-12.5 11.11 2.093 20.927 5.366 28.72 9.376 13.818 7.11 20.094 15.646 20.094 22.937 0 7.29-6.276 15.797-20.094 22.906-13.818 7.11-34.028 11.907-56.438 11.907-22.41 0-42.62-4.797-56.437-11.906-13.818-7.108-20.063-15.614-20.063-22.905 0-7.29 6.245-15.828 20.063-22.938 7.772-3.998 17.554-7.28 28.625-9.374zM72.875 195.656v122l-16.438-7.125c-6.678-2.894-12.003-12.02-13.03-27.53-1.03-15.51 2.593-35.983 11.5-56.53 5.082-11.73 11.316-22.17 17.968-30.814zm171.688 1.75V445.47c0 7.278-6.24 15.825-20.063 22.936-13.822 7.112-34.042 11.906-56.438 11.906-22.395 0-42.615-4.794-56.437-11.906-13.822-7.11-20.063-15.658-20.063-22.937V200.31L145.375 280l-36.844 12.875L229.75 420.25l-51.72-105.78 23.907-11.845-40.156-84.188c2.082.073 4.168.125 6.282.125 24.997 0 47.71-5.09 64.97-13.968 4.134-2.128 8.008-4.537 11.53-7.188zm18.687 36l79 34.25-79 14.78v-49.03zm187.97 82.78c2.094.035 3.983.433 5.655 1.158 6.69 2.9 12.035 12.026 13.063 27.53.577 8.715-.333 18.995-2.813 29.97-.305-7.425-2.682-12.95-7.125-14.875-9.11-3.95-23.39 8.707-31.875 28.28-8.484 19.573-7.953 38.645 1.156 42.594 4.45 1.928 10.12-.104 15.75-4.97-6.316 9.33-13.207 17.023-19.967 22.563-12.02 9.85-22.342 12.18-29.032 9.282-6.688-2.9-12.034-12.027-13.06-27.533-1.03-15.505 2.618-35.94 11.53-56.5 8.912-20.56 21.357-37.21 33.375-47.062 9.014-7.388 17.058-10.537 23.344-10.438zm-153.5 8.658c-.9 1.89-1.78 3.8-2.626 5.75-9.94 22.935-14.315 45.79-13.03 65.156.307 4.65.966 9.173 1.998 13.47l-20.812-9v-74.126l34.47-1.25z";
                break;
            case "Cables and Wires":
                path =
                    "M169.8 21.95c-43.8 0-83.33 3.58-111.42 9.2-14.05 2.81-25.26 6.19-32.21 9.5-3.48 1.64-5.84 3.29-6.88 4.31 1.04 1.02 3.4 2.67 6.88 4.31 6.95 3.29 18.16 6.67 32.21 9.48 28.09 5.62 67.62 9.2 111.42 9.2 43.7 0 83.3-3.58 111.3-9.22 14-2.81 25.2-6.19 32.2-9.48 3.5-1.64 5.8-3.29 6.9-4.31-1.1-1.02-3.4-2.67-6.9-4.31-7-3.29-18.2-6.67-32.2-9.48-28.1-5.62-67.6-9.2-111.3-9.2zM405 24.38c-3 0-6.2.1-9.2.26-19 1.13-39.4 5.84-59.3 12.14 1.3 2.4 2.3 5.15 2.3 8.16 0 4.58-2.2 8.57-4.8 11.61 21.6-7.31 43.8-12.81 62.8-13.95 21.8-1.3 38.7 2.92 48.5 14.31 15.7 18.1 15.8 36.34 7.3 59.19-8.5 22.8-26.5 48.6-46.3 75.3-19.7 26.8-41.1 54.6-55.8 82.9-14.9 28.4-23.4 58.1-14.9 87.4 9.9 34.8 48.2 63.6 82.9 85.6 34.9 22.1 67.5 36.4 67.5 36.4l7.2-16.4s-31.5-14-65.1-35.2c-33.5-21.2-68.1-50.5-75.1-75.4h-.2c-6.6-23-.2-47.7 13.7-74 13.6-26.4 34.5-53.6 54.3-80.6 19.9-26.9 38.9-53.4 48.7-79.7 9.8-26.47 9.3-54.21-10.6-77.26-13.1-15.14-32.7-20.62-54-20.77zm-235.2 8.57a64 8 0 0 1 64 8 64 8 0 0 1-64 8 64 8 0 0 1-64.1-8 64 8 0 0 1 64.1-8zM50.75 75.54v17.95c33.14.18 66.05-3.01 95.65-7.88-35.4-1.01-67.02-4.3-91.55-9.21-1.4-.28-2.75-.57-4.1-.86zm238.05 0c-1.4.29-2.7.58-4.2.86-15.5 3.1-33.8 5.55-54.1 7.19v.1C189.6 97.95 121.2 111.9 50.75 111.5v11.3c83.35 2.5 162.65-12.1 238.05-32.61zm0 33.36c-74.9 20-154.3 34.5-238.05 32v13.3c81.65 1.3 161.25-4.6 238.05-23.5zm0 40.3c-77.4 18.6-156.9 24.3-238.05 23v11.5c88.35 6.1 171.25 7 238.05-6.8zm0 46.1c-68.8 13.6-151.1 12.4-238.05 6.4v12c73.05 17.6 154.55 24.6 238.05 29.4v-15.7l-65.7-3.3 65.7-9.2zM50.75 232.2v24.1c90.05 22.1 163.05 26 238.05 26.2v-21.3c-82.5-4.8-164-11.6-238.05-29zm0 42.6v22.8l83.15 11.6-83.15 4.2v14.8c84.25 1.4 166.15-.3 238.05-17.3v-10.4c-74.4-.1-148.2-4-238.05-25.7zm238.05 54.6c-73.4 16.7-155.1 18.2-238.05 16.8v23.6c104.95 7.4 189.75-6 238.05-20.9zm0 38.2c-51.4 15.2-135 27.5-238.05 20.3v25.5c89.35 1.1 176.05-2.2 238.05-29.8zm0 35.6c-65.6 26.8-150 29.3-235.89 28.3 30.05 10.5 73.29 16 116.89 15.9 44.4-.1 88.8-6.1 119-16.8zM32.75 442.5c-2.06 1-3.92 2.1-5.53 3.1-6.84 4.5-8.47 8-8.47 9.6 0 1.6 1.63 5.1 8.47 9.6 6.84 4.4 17.86 9 31.78 12.8 27.82 7.6 67.2 12.5 110.8 12.5 43.5 0 82.9-4.9 110.8-12.5 13.9-3.8 24.9-8.4 31.7-12.8 6.8-4.5 8.5-8 8.5-9.6 0-1.6-1.7-5.1-8.5-9.6-1.7-1-3.5-2.1-5.5-3.1v.6l-5.7 2.3c-33.9 13.4-82.5 19.9-131.3 20-48.8.1-97.49-6.1-131.47-20.1l-5.58-2.3z";
                break;
            case "Tools and Instruments":
                path =
                    "M48.148 49c-9 0-14.776 3.864-19.793 11.29-5.017 7.424-8.323 18.56-9.234 30.4-.91 11.838.52 24.33 3.814 34.214 3.079 9.236 7.783 15.602 12.288 18.367 28.96 2.58 66.314 2.689 82.671 28.96 11.82 42.442-15.348 94.133-25.816 130.769h74.55l-5.064-89.941 23.168-4.729 14.12-58.926 64.296 7.219V49zm233 0v98.916l30-.453V49zm48 16v62h30V65zm-274 2h178v60h-178zm322 .525v56.95l46-11.5v-33.95zM73.148 85v24h142V85zm368 0v18h52V85h-9zm-228.5 84.064l-8.841 36.907 17.925-1.532c-1.87-15.08 1.338-23.637 10.96-33.125zM89.148 321v32H52.965l-20 30h244.879l-11.823-30h-98.873v-32zm-64 80v62h237.608l16.584-62z";
                break;

            case "Electrical Components":
                path =
                    "M23 23v466h466V23H23zm233 64c93.2 0 169 75.8 169 169s-75.8 169-169 169S87 349.2 87 256 162.8 87 256 87zm0 18c-83.5 0-151 67.5-151 151 0 71.3 49.2 130.9 115.5 146.8l13.9-27.8h43.2l13.9 27.8C357.8 386.9 407 327.3 407 256c0-83.5-67.5-151-151-151zm0 30c13.7 0 25 11.3 25 25s-11.3 25-25 25-25-11.3-25-25 11.3-25 25-25zm-80 89a32 32 0 0 1 32 32 32 32 0 0 1-32 32 32 32 0 0 1-32-32 32 32 0 0 1 32-32zm160 0a32 32 0 0 1 32 32 32 32 0 0 1-32 32 32 32 0 0 1-32-32 32 32 0 0 1 32-32zm-90.4 169l-6.5 13.1c5.5.6 11.2.9 16.9.9 5.7 0 11.4-.3 16.9-.9l-6.5-13.1h-20.8z";
                break;
            case "Accessories and Consumables":
                path =
                    "M247 18.656c-80.965 0-146.875 65.02-146.875 145.625 0 45.63 15.758 67 33.313 94.845 11.706 18.57 23.767 39.91 30.53 70.563h165.095c6.728-31.387 18.91-53.12 30.718-71.875 17.58-27.92 33.314-48.912 33.314-93.532 0-80.66-65.127-145.624-146.094-145.624zm-99.78 127.906L170.437 167 210 201.813l31.188-34.125 6.78-7.438 6.907 7.344 30.75 32.72 39.97-33.47 22.686-19-7.655 28.594L304.75 310.28l-18.063-4.842 28.22-105.25-24.032 20.125-6.78 5.656-6.033-6.44-29.906-31.78-30.562 33.438-6.188 6.78-6.875-6.062-23.25-20.437 27.94 104.218-18.064 4.812-35.937-134.063-8-29.875zm22.593 201.813V389.5L315 348.375H169.812zm153.593 17.063l-153.594 43.53v29.438l153.594-43.5v-29.47zm0 48.875L203.97 448.156h119.436v-33.844zm-132.562 52.53v20.533h113.282v-20.53h-113.28z";
                break;
            case "Heating and Cooling":
                path =
                    "M233,135a60,60,0,0,0-89.62-35.45l16.39-65.44a8,8,0,0,0-3.45-8.68A60,60,0,1,0,95.69,128.91L30.82,147.44a8,8,0,0,0-5.8,7.32,60,60,0,0,0,44.42,60.66,60.52,60.52,0,0,0,15.62,2.07,60.07,60.07,0,0,0,59.88-62l48.48,46.92a8,8,0,0,0,9.25,1.35A60,60,0,0,0,233,135ZM130.44,147.85a20,20,0,1,1,17.41-22.29A20,20,0,0,1,130.44,147.85Z";
                break;
            default:
                path = "";
        }

        return (
            <svg
                x={x - 10}
                y={y + 4}
                width={40}
                height={40}
                // className="size-11"
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
            <BarChart data={categories}>
                <XAxis
                    dataKey="category"
                    tick={renderCustomAxisTick}
                    tickSize={5}
                    interval={0}
                />
                <YAxis />
                <Tooltip
                    contentStyle={{
                        color: "#ff0000",
                    }}
                />
                <Bar dataKey="quantity" barSize={30} fill="#4880ff" />
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
