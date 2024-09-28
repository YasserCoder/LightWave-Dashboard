import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signup as signupApi } from "../../services/apiAuth";

export function useSignUp() {
    const queryClient = useQueryClient();
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: signupApi,
        onSuccess: () => {
            toast.success("account added succesfuly");
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { signup, isLoading };
}
