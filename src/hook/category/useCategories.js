import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiCategory";

export function useCategories() {
    const { isLoading, data: cats } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    return { isLoading, cats };
}
