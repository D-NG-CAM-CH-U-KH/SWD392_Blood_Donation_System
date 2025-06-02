import { Route } from 'react-router-dom';
import DefaultLayout from '~/layouts/DefaultLayout/default.layout'
import LoginPageComponent from '~/pages/LoginPage/LoginPage.component';

const PublicRoutesComponent = () =>{
    return (
        <Route element={<DefaultLayout />}>
            <Route path='/login' element={<LoginPageComponent />} />
        </Route>
    )
}

export default PublicRoutesComponent;
