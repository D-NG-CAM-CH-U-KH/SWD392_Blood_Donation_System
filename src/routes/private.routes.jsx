import { Route } from 'react-router-dom';
import AuthGuard from '~/guards/AuthGuard';
import RoleBasedGuard from '~/guards/RoleBaseGuard';
import BloodAppointmentLayout from '~/layouts/BloodDonationLayout/bloodappointment.layout';
import BloodDonorLookupLayout from '~/layouts/BloodDonorLookupLayout/blood-donor-lookup.layout';
import DefaultLayout from '~/layouts/DefaultLayout/default.layout'
import { RoleEnum } from '~/meta-data/enums/role.enum';
import BloodAppointment from '~/pages/BloodAppointmentPage/BloodAppointment.component';
import BloodDonorLookup from '~/pages/BloodDonorLookupPage/BloodDonorLookupPage.component';

const PrivateRoutesComponent = () => {
    return (
        <>

            <Route element={<BloodAppointmentLayout />}>
                <Route
                    path="/blood-donation/create"
                    element={
                        <AuthGuard>
                            <BloodAppointment />
                        </AuthGuard>
                    }
                />
            </Route>

            <Route element={<BloodDonorLookupLayout />}>
                <Route
                    path="/blood-donor/lookup"
                    element={
                        <AuthGuard>
                            <RoleBasedGuard accessibleRoles={[RoleEnum.Admin.toString()]}>
                                <BloodDonorLookup />
                            </RoleBasedGuard>
                        </AuthGuard>
                    }
                />
            </Route>
        </>
    )
}

export default PrivateRoutesComponent;