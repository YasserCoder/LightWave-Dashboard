import { useQuery } from "@tanstack/react-query";
import { getTotalUsers } from "../../services/apiUsers";

export function useUsers() {
    const { isLoading, data: count } = useQuery({
        queryKey: ["users", "Total"],
        queryFn: getTotalUsers,
    });

    return { isLoading, count };
}
