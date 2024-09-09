import { useQuery } from "@tanstack/react-query";
import { selectCategories } from "../../services/apiCategory";

export function useSelectCategories() {
    const { isLoading, data: cats } = useQuery({
        queryKey: ["all categories"],
        queryFn: selectCategories,
    });

    return { isLoading, cats };
}
