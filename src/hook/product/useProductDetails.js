import { useQuery } from "@tanstack/react-query";
import { getProductInfo } from "../../services/apiProduct";

export function useProductDetails(id) {
    const { isLoading, data: productInfo } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductInfo(id),
        enabled: !!id,
    });

    return { isLoading, productInfo };
}
