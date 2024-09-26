import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUsers";

export function useGetUsers(pageSize, email) {
    const [searchParams] = useSearchParams();

    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));
    const role = searchParams.get("role") || "";

    const { isLoading, data: { data: users, count } = {} } = useQuery({
        queryKey: ["users", role, page],
        queryFn: () =>
            getUsers({
                page,
                pageSize,
                role,
                email,
            }),
        enabled: !!email,
    });
    return { isLoading, users, count };
}
