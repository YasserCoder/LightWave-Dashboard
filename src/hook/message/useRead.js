import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editMessage } from "../../services/apiMessage";

export function useRead() {
    const queryClient = useQueryClient();

    const { mutate: makeSeen, isLoading: isEditing } = useMutation({
        mutationFn: editMessage,
        onSuccess: (id) => {
            queryClient.invalidateQueries({
                queryKey: ["messages"],
            });
            queryClient.invalidateQueries({
                queryKey: ["message", id],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, makeSeen };
}
