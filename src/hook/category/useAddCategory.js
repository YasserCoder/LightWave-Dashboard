import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addCategory as addCategoryApi } from "../../services/apiCategory";

export function useAddCategory() {
    const queryClient = useQueryClient();

    const { mutate: addCategory, isLoading: isCreating } = useMutation({
        mutationFn: addCategoryApi,
        onSuccess: () => {
            toast.success("Category successfully added");
            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isCreating, addCategory };
}
