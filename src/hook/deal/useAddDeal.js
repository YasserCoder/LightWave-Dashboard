import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addDeal as addDealApi } from "../../services/apiDeal";

export function useAddDeal() {
    const queryClient = useQueryClient();

    const { mutate: addDeal, isLoading: isInserting } = useMutation({
        mutationFn: addDealApi,
        onSuccess: () => {
            toast.success("New Deal successfully created");
            queryClient.invalidateQueries({
                queryKey: ["deals"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isInserting, addDeal };
}
