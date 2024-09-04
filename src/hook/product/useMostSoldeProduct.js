import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getMostSoldProduct } from "../../services/apiProduct";

export function useMostSoldeProduct() {
    const [searchParams] = useSearchParams();

    const numDays = !searchParams.get("last")
        ? 7
        : Number(searchParams.get("last"));
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading, data: products } = useQuery({
        queryFn: () => getMostSoldProduct(queryDate),
        queryKey: ["most-solde-prod", `last-${numDays}`],
    });

    return { isLoading, products };
}
