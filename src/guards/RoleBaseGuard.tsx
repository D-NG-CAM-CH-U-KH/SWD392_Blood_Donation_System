import { FC, ReactNode, useEffect } from "react";
import { RoleEnum } from "../meta-data/enums/role.enum";
import { useAuth } from "../hooks/useAuth";
import { Alert, AlertTitle, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageEndpoints from "../meta-data/contants/page-endpoints";

export interface RoleBasedGuardProps {
  accessibleRoles: Array<string>;
  children: ReactNode;
}

const RoleBasedGuard: FC<RoleBasedGuardProps> = ({
  children,
  accessibleRoles,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const hasPermission = user?.roles?.some(role =>
      accessibleRoles.includes(role)
    );

    if (user && !hasPermission) {
      navigate(PageEndpoints.ErrorEndpoints.PERMISSION_DENIED_ENDPOINT, { replace: true });
    }
  }, [user, accessibleRoles, navigate]);

  return <>{children}</>;
};

export default RoleBasedGuard;