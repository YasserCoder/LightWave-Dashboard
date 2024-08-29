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
        <div className="space-y-8 mt-5 bg-bkg-main py-4 pr-2 xs:pr-4 rounded-xl shadow-lg">
            <h1 className="text-2xl xs:text-3xl capitalize font-bold ml-3 xs:ml-5">
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

export default TotalSales;
