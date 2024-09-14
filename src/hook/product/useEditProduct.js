import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editProduct as editProductApi } from "../../services/apiProduct";

export function useEditProduct() {
    const queryClient = useQueryClient();

    const { mutate: editProduct, isLoading: isEditing } = useMutation({
        mutationFn: editProductApi,
        onSuccess: (id) => {
            toast.success("Product successfully updated");
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
            queryClient.invalidateQueries({
                queryKey: ["product", id],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editProduct };
}
