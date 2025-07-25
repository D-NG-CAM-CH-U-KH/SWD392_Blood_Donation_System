import { Route } from 'react-router-dom';
import AuthGuard from '~/guards/AuthGuard';
import RoleBasedGuard from '~/guards/RoleBaseGuard';
import BloodAppointmentLayout from '~/layouts/BloodDonationLayout/bloodappointment.layout';
import BloodDonorLookupLayout from '~/layouts/BloodDonorLookupLayout/blood-donor-lookup.layout';
import DefaultLayout from '~/layouts/DefaultLayout/default.layout';
import PageEndpoints from '~/meta-data/contants/page-endpoints';
import { RoleEnum } from '~/meta-data/enums/role.enum';
import BloodDonorLookup from '~/pages/BloodDonorLookupPage/BloodDonorLookupPage.component';
import GetBloodTypeComponent from '~/pages/GetBloodTypePage/GetBloodType.component';
import SubmitCertificateComponent from '~/pages/SubmitCertificate/SubmitCertifcate.component';

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

            <Route element={<DefaultLayout />}>
                <Route
                    path={PageEndpoints.PrivateEndpoints.GET_BLOOD_TYPE}
                    element={
                        <AuthGuard>
                            <RoleBasedGuard accessibleRoles={[RoleEnum.Member.toString()]}>
                                <GetBloodTypeComponent />
                            </RoleBasedGuard>
                        </AuthGuard>
                    }
                />
            </Route>

            <Route element={<DefaultLayout />}>
                <Route
                    path={PageEndpoints.PrivateEndpoints.SUBMIT_CERTIFICATE}
                    element={
                        <AuthGuard>
                            <RoleBasedGuard accessibleRoles={[RoleEnum.Member.toString()]}>
                                < SubmitCertificateComponent />
                            </RoleBasedGuard>
                        </AuthGuard>
                    }
                />
            </Route>
        </>
    )
}

export default PrivateRoutesComponent;