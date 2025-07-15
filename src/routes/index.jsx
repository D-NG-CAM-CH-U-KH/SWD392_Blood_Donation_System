import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from '~/layouts/DefaultLayout/default.layout'
import ProfileLayout from '~/layouts/ProfileLayout/profile.layout'
import BloodAppointmentLayout from '~/layouts/BloodDonationLayout/bloodappointment.layout'
import LandingPage from '~/pages/LandingPage/LandingPage'
import UserProfile from '~/pages/UserPage/UserProfile'
import UserProfileForm from '~/pages/UserPage/UserProfile.component'
import UserProfileNavbar from '~/pages/UserPage/UserProfileNavbar.component'
import PublicRoutesComponent from './public.routes'
import PageEndpoints from '~/meta-data/contants/page-endpoints'
import ProfileCard from '~/pages/ProfilePage/ProfileCard'
import CreateBloodRequest from '~/pages/BloodRequestPage/BloodRequest.jsx';
import BloodAppointment from "~/pages/BloodAppointmentPage/BloodAppointment.component";
import Index from '~/pages/StaffManagement/Index'


const RouteComponent = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={PageEndpoints.PublicEndpoints.HOME_ENDPOINT} element={<LandingPage />} />
      </Route>

      <Route element={<ProfileLayout />}>
        <Route path="/profile" element={<ProfileCard />} />
      </Route>

      {/* Route for CreateBloodRequest */}
      <Route path="/request/create" element={<CreateBloodRequest />} />

      {/* Route for BloodAppointment */}
      <Route element={<BloodAppointmentLayout />}>
        <Route path="/blood-donation/create" element={<BloodAppointment />} />
      </Route>

      <Route element={<Index />}>
        <Route path="/staff" element={<Index />} />
      </Route>

      {PublicRoutesComponent()}
    </Routes>
  )
}

export default RouteComponent
