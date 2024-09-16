import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../services/apiOrder";

export function useGetOrders(pageSize) {
    const [searchParams] = useSearchParams();

    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));
    const status = searchParams.get("status") || "";
    const sortBy = searchParams.get("sortBy") || "created_at-desc";

    const { isLoading, data: { data: orders, count } = {} } = useQuery({
        queryKey: ["orders", status, sortBy, page],
        queryFn: () =>
            getOrders({
                page,
                pageSize,
                status,
                sortBy,
            }),
    });

    return { isLoading, orders, count };
}
