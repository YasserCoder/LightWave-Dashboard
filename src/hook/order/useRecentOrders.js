import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getOrdersAfterDate } from "../../services/apiOrder";

export function useRecentOrders() {
    const [searchParams] = useSearchParams();

    const numDays = !searchParams.get("last")
        ? 7
        : Number(searchParams.get("last"));
    const queryDate = subDays(new Date(), numDays).toISOString();
    const queryLastDate = subDays(
        subDays(new Date(), numDays),
        numDays * 2
    ).toISOString();

    const { isLoading, data: orders } = useQuery({
        queryFn: () => getOrdersAfterDate(queryDate),
        queryKey: ["orders", `last-${numDays}`],
    });
    const { isLoading: isLoading2, data: lastOrders } = useQuery({
        queryFn: () => getOrdersAfterDate(queryLastDate, queryDate),
        queryKey: ["orders", `last-${numDays * 2}`],
    });

    return { isLoading, orders, isLoading2, lastOrders, numDays };
}
