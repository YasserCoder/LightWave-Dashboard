import { useQuery } from "@tanstack/react-query";
import { getUsersAfterDate } from "../../services/apiUsers";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentUsers() {
    const [searchParams] = useSearchParams();

    const numDays = !searchParams.get("last")
        ? 7
        : Number(searchParams.get("last"));
    const queryDate = subDays(new Date(), numDays).toISOString();
    const queryLastDate = subDays(new Date(), numDays * 2).toISOString();

    const { isLoading: isLoading3, data: users } = useQuery({
        queryFn: () => getUsersAfterDate(queryDate),
        queryKey: ["users", `last-${numDays}`],
    });

    const { isLoading: isLoading4, data: lastUsers } = useQuery({
        queryFn: () => getUsersAfterDate(queryLastDate, queryDate),
        queryKey: ["users", `last-${numDays * 2}`],
    });

    return { isLoading3, isLoading4, users, lastUsers };
}
