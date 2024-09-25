import toast from "react-hot-toast";
import supabase from "../../services/supabase";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const useMessageSubscription = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const subscription = supabase
            .channel("messages-channel")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "message" },
                () => {
                    toast("New Message received", {
                        icon: "🔔",
                    });
                    // Update the messages query in React Query
                    queryClient.invalidateQueries(`messages`);
                }
            )
            .subscribe();

        // Clean up the subscription on component unmount
        return () => {
            supabase.removeChannel(subscription);
        };
    }, [queryClient]);
};

export default useMessageSubscription;
