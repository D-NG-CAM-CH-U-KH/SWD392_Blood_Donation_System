import { Route } from 'react-router-dom';
import AuthGuard from '~/guards/AuthGuard';
import GuestGuard from '~/guards/GuestGuards';
import DefaultLayout from '~/layouts/DefaultLayout/default.layout';
import PageEndpoints from '~/meta-data/contants/page-endpoints';
import LoginPageComponent from '~/pages/LoginPage/LoginPage.component';
import SignUpPageComponent from '~/pages/SignUpPage/SignUpPageComponent';

const PublicRoutesComponent = () => {
    return (
        <>
            <Route element={<DefaultLayout />}>
                <Route
                    path={PageEndpoints.PublicEndpoints.LOGIN_ENDPOINT}
                    element={
                        <GuestGuard>
                            <LoginPageComponent />
                        </GuestGuard>
                    }
                />
                <Route
                    path={PageEndpoints.PublicEndpoints.SIGN_UP_ENDPOINT}
                    element={
                        <GuestGuard>
                            <SignUpPageComponent />
                        </GuestGuard>
                    }
                />
            </Route>
        </>
    );
};

export default PublicRoutesComponent;
