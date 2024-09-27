import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editUserRole } from "../../services/apiUsers";

export function useEditRole() {
    const queryClient = useQueryClient();

    const { mutate: editRole, isLoading: isEditing } = useMutation({
        mutationFn: editUserRole,
        onSuccess: (id) => {
            toast.success("User Role successfully updated");
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
            queryClient.invalidateQueries({
                queryKey: ["user", id],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editRole };
}
