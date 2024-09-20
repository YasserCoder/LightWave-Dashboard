import { useQuery } from "@tanstack/react-query";
import { getOrderInfo } from "../../services/apiOrder";

export function useOrderDetails(id) {
    const { isLoading, data: orderInfo } = useQuery({
        queryKey: ["order", id],
        queryFn: () => getOrderInfo(id),
        enabled: !!id,
    });

    return { isLoading, orderInfo };
}
