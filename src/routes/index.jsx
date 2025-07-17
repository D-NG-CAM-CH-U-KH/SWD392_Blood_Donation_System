import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '~/layouts/DefaultLayout/default.layout';
import ProfileLayout from '~/layouts/ProfileLayout/profile.layout';
import BloodAppointmentLayout from '~/layouts/BloodDonationLayout/bloodappointment.layout';
import LandingPage from '~/pages/LandingPage/LandingPage';
import ProfileCard from '~/pages/ProfilePage/ProfileCard';
import CreateBloodRequest from '~/pages/BloodRequestPage/BloodRequest.jsx';
import BloodAppointment from '~/pages/BloodAppointmentPage/BloodAppointment.component';
import Index from '~/pages/StaffManagement/Index';
import BloodDonorLookup from '~/pages/BloodDonorLookupPage/BloodDonorLookupPage.component';
import BloodDonorLookupLayout from '~/layouts/BloodDonorLookupLayout/blood-donor-lookup.layout';
import AuthGuard from '~/guards/AuthGuard';
import RoleBasedGuard from '~/guards/RoleBaseGuard';
import { RoleEnum } from '~/meta-data/enums/role.enum';
import PublicRoutesComponent from './public.routes';
import PageEndpoints from '~/meta-data/contants/page-endpoints';
import PrivateRoutesComponent from './private.routes';
import ForbiddenPage from '~/layouts/ForbiddenPage';

const RouteComponent = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={PageEndpoints.PublicEndpoints.HOME_ENDPOINT} element={<LandingPage />} />
      </Route>

      <Route element={<ProfileLayout />}>
        <Route path="/profile" element={<ProfileCard />} />
      </Route>

      <Route path="/request/create" element={<CreateBloodRequest />} />



      <Route path="/staff" element={<Index />} />

      <Route path={PageEndpoints.ErrorEndpoints.PERMISSION_DENIED_ENDPOINT} element={<ForbiddenPage />} />


      {PublicRoutesComponent()}
      {PrivateRoutesComponent()}
    </Routes>
  );
};

export default RouteComponent;