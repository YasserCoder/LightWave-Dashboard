import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getMostSoldCategory } from "../../services/apiCategory";

export function useMostSoldeCat() {
    const [searchParams] = useSearchParams();

    const numDays = !searchParams.get("last")
        ? 7
        : Number(searchParams.get("last"));
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading, data: categories } = useQuery({
        queryFn: () => getMostSoldCategory(queryDate),
        queryKey: ["most-solde-cat", `last-${numDays}`],
    });

    return { isLoading, categories };
}
