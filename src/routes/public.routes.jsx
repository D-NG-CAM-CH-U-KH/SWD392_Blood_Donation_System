import { Route } from 'react-router-dom';
import DefaultLayout from '~/layouts/DefaultLayout/default.layout'
import PageEndpoints from '~/meta-data/contants/page-endpoints';
import LoginPageComponent from '~/pages/LoginPage/LoginPage.component';
import SignUpPageComponent from '~/pages/SignUpPage/SignUpPageComponent';

const PublicRoutesComponent = () => {
    return (
        <Route element={<DefaultLayout />}>
            <Route path={PageEndpoints.PublicEndpoints.LOGIN_ENDPOINT} element={<LoginPageComponent />} />
            <Route path={PageEndpoints.PublicEndpoints.SIGN_UP_ENDPOINT} element={<SignUpPageComponent />} />
        </Route>
    )
}

export default PublicRoutesComponent;
