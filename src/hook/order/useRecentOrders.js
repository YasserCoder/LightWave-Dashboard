import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getOrdersAfterDate } from "../../services/apiOrder";

export function useRecentOrders() {
    const [searchParams] = useSearchParams();

    const numDays = !searchParams.get("last")
        ? 30
        : Number(searchParams.get("last"));
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading, data: orders } = useQuery({
        queryFn: () => getOrdersAfterDate(queryDate),
        queryKey: ["orders", `last-${numDays}`],
    });

    return { isLoading, orders, numDays };
}
