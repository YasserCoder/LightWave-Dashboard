import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../services/apiMessage";

export function useGetMessages(pageSize, email) {
    const [searchParams] = useSearchParams();

    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));
    const source = searchParams.get("source") || "";
    const read = searchParams.get("read") || "";

    const { isLoading, data: { data: messages, count } = {} } = useQuery({
        queryKey: ["messages", source, read, page],
        queryFn: () =>
            getMessages({
                page,
                pageSize,
                source,
                read,
                email,
            }),
        enabled: !!email,
    });
    return { isLoading, messages, count };
}
