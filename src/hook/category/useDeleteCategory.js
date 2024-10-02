import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCategory as deleteCategoryApi } from "../../services/apiCategory";

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteCategory } = useMutation({
        mutationFn: deleteCategoryApi,
        onSuccess: () => {
            toast.success("Category successfully deleted");

            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteCategory };
}
