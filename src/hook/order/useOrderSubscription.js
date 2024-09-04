import { useEffect } from "react";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const useOrderSubscription = () => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const numDays = !searchParams.get("last")
        ? 7
        : Number(searchParams.get("last"));

    useEffect(() => {
        // Subscribe to the 'orders' table
        const subscription = supabase
            .channel("orders-channel")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "order" },
                () => {
                    toast("New order received", {
                        icon: "🔔",
                    });
                    // Update the orders query in React Query
                    queryClient.invalidateQueries(`orders`, `last-${numDays}`);
                    queryClient.invalidateQueries(
                        "most-solde-cat",
                        `last-${numDays}`
                    );
                    queryClient.invalidateQueries(
                        "most-solde-prod",
                        `last-${numDays}`
                    );
                }
            )
            .subscribe();

        // Clean up the subscription on component unmount
        return () => {
            supabase.removeChannel(subscription);
        };
    }, [queryClient, numDays]);
};

export default useOrderSubscription;
