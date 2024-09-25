import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editOrder } from "../../services/apiOrder";

export function useUpdateOrder() {
    const queryClient = useQueryClient();

    const { mutate: updateOrder, isLoading: isEditing } = useMutation({
        mutationFn: editOrder,
        onSuccess: (id) => {
            toast.success("Order successfully updated");
            queryClient.invalidateQueries({
                queryKey: ["orders"],
            });
            queryClient.invalidateQueries({
                queryKey: ["order", id],
            });
            queryClient.invalidateQueries("most-solde-cat");
            queryClient.invalidateQueries("most-solde-prod");
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, updateOrder };
}
