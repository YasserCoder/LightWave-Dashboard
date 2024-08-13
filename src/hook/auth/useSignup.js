import { useMutation } from "@tanstack/react-query";

import { signup as signupApi } from "../../services/apiAuth";

export function useSignUp() {
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: signupApi,
        onSuccess: () => {
            console.log("account added succesfuly");
        },
        onError: (err) => {
            console.log(err.message);
        },
    });

    return { signup, isLoading };
}
