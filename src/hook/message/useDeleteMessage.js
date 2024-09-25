import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteMessage as deleteMessageApi } from "../../services/apiMessage";

export function useDeleteMessage() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteMessage } = useMutation({
        mutationFn: deleteMessageApi,
        onSuccess: () => {
            toast.success("Message successfully deleted");

            queryClient.invalidateQueries({
                queryKey: ["messages"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteMessage };
}
