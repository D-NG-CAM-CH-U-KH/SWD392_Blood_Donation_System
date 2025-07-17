import { FC, PropsWithChildren, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loading from "../layouts/Loading";
import PageEndpoints from "../meta-data/contants/page-endpoints";

const GuestGuard: FC<PropsWithChildren> = ({ children }) => {
    const { isInitialized, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Guest Guard →", { isInitialized, isAuthenticated });

        if (isInitialized && isAuthenticated) {
            navigate(PageEndpoints.PublicEndpoints.HOME_ENDPOINT);
        }
    }, [isInitialized, isAuthenticated, navigate]);

    if (!isInitialized) return <Loading />;

    return <>{children}</>;
};

export default GuestGuard;
