import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/apiUsers";

export function useUserDetails(id) {
    const { isLoading, data: userInfo } = useQuery({
        queryKey: ["user", id],
        queryFn: () => getUserInfo(id),
        enabled: !!id,
    });

    return { isLoading, userInfo };
}
