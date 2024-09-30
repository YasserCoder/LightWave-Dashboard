import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUsers";

export function useGetUsers(pageSize, email) {
    const [searchParams] = useSearchParams();

    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));
    const role = searchParams.get("role") || "";
    const sortBy = searchParams.get("sortBy") || "created_at-desc";

    const { isLoading, data: { data: users, count } = {} } = useQuery({
        queryKey: ["users", sortBy, role, page],
        queryFn: () =>
            getUsers({
                page,
                pageSize,
                role,
                email,
                sortBy,
            }),
        enabled: !!email,
    });
    return { isLoading, users, count };
}
