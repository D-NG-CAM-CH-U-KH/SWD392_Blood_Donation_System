import { Route } from 'react-router-dom';
import AuthGuard from '~/guards/AuthGuard';
import RoleBasedGuard from '~/guards/RoleBaseGuard';
import BloodAppointmentLayout from '~/layouts/BloodDonationLayout/bloodappointment.layout';
import BloodDonorLookupLayout from '~/layouts/BloodDonorLookupLayout/blood-donor-lookup.layout';
import { RoleEnum } from '~/meta-data/enums/role.enum';
import BloodDonorLookup from '~/pages/BloodDonorLookupPage/BloodDonorLookupPage.component';

const PrivateRoutesComponent = () => {
    return (
        <>

            <Route element={<BloodDonorLookupLayout />}>
                <Route
                    path="/blood-donor/lookup"
                    element={
                        <AuthGuard>
                            <RoleBasedGuard accessibleRoles={[RoleEnum.Member.toString()]}>
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