import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateUser as updateUserApi } from "../../services/apiAuth";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateUserApi,
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user.user);
            toast.success(
                `${
                    user.user.user_metadata?.name?.split(" ")[0]
                }'s informations has been successfuly updated`
            );
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { updateUser, isUpdating };
}
