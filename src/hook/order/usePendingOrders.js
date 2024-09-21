import { useQuery } from "@tanstack/react-query";
import { getPendingOrders } from "../../services/apiOrder";

export function usePendingOrders() {
    const { isLoading, data: pendingCount } = useQuery({
        queryKey: ["orders", "pending"],
        queryFn: getPendingOrders,
    });

    return { isLoading, pendingCount };
}
