import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteDeal as deleteDealApi } from "../../services/apiDeal";

export function useDeleteDeal() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteDeal } = useMutation({
        mutationFn: deleteDealApi,
        onSuccess: () => {
            toast.success("Deal successfully deleted");

            queryClient.invalidateQueries({
                queryKey: ["deals"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteDeal };
}
