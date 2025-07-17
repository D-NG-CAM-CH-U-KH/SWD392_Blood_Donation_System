import { FC, PropsWithChildren, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Loading from '../layouts/Loading';
import PageEndpoints from '../meta-data/contants/page-endpoints';

const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const { isInitialized, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate(PageEndpoints.PublicEndpoints.LOGIN_ENDPOINT);
    }
  }, [isInitialized, isAuthenticated, navigate]);

  if (!isInitialized) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthGuard;