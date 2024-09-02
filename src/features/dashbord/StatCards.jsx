import { calculatePercentageChange, formatCurrency } from "../../utils/helpers";

import {
    FaArrowTrendDown,
    FaArrowTrendUp,
    FaChartLine,
    FaUsers,
} from "react-icons/fa6";
import { IoCubeSharp } from "react-icons/io5";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { useUsers } from "../../hook/auth/useUsers";

function StatCards({ orders, lastOrders, numDays }) {
    const { users } = useUsers();
    console.log(users);
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

export default StatCards;
