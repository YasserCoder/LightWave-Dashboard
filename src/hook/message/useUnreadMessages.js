import { useQuery } from "@tanstack/react-query";
import { getUnreadMessages } from "../../services/apiMessage";

export function useUnreadMessages(email) {
    const { isLoading, data: unreadCount } = useQuery({
        queryKey: ["messages", "unread"],
        queryFn: () => getUnreadMessages(email),
        enabled: !!email,
    });

    return { isLoading, unreadCount };
}
