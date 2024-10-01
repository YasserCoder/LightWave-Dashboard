import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addMessage } from "../../services/apiMessage";

export function useSendMessage() {
    const queryClient = useQueryClient();

    const { mutate: sendMessage, isLoading: isSending } = useMutation({
        mutationFn: addMessage,
        onSuccess: () => {
            toast.success("Message send successfully");
            queryClient.invalidateQueries({
                queryKey: ["messages"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isSending, sendMessage };
}
