import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "./Loader";
import { useUser } from "../hook/auth/useUser";

function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    // 1. Load the authenticated user
    const { isLoading, user } = useUser();

    // 2. If there is NO authenticated user, redirect to the /login
    useEffect(
        function () {
            if (user?.role !== "authenticated" && !isLoading)
                navigate("/login");
        },
        [user, isLoading, navigate]
    );

    // 3. While loading, show a spinner
    if (isLoading)
        return (
            <div className="h-screen flex justify-center items-center">
                <Loader />
            </div>
        );

    // 4. If there IS a user, render the app
    if (user?.role === "authenticated") return children;
}

export default ProtectedRoute;
