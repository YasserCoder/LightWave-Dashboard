import { useQuery } from "@tanstack/react-query";
import { getMessageInfo } from "../../services/apiMessage";

export function useMessageDetails(id) {
    const { isLoading, data: messageInfo } = useQuery({
        queryKey: ["message", id],
        queryFn: () => getMessageInfo(id),
        enabled: !!id,
    });

    return { isLoading, messageInfo };
}
