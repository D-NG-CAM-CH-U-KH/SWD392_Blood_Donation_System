import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from '~/layouts/DefaultLayout/default.layout'
import ProfileLayout from '~/layouts/ProfileLayout/profile.layout'
import LandingPage from '~/pages/LandingPage/LandingPage'
import UserProfile from '~/pages/UserPage/UserProfile'
import UserProfileForm from '~/pages/UserPage/UserProfile.component'
import UserProfileNavbar from '~/pages/UserPage/UserProfileNavbar.component'
import PublicRoutesComponent from './public.routes'
import PageEndpoints from '~/meta-data/contants/page-endpoints'
import CreateBloodRequest from '~/pages/BloodRequestPage/BloodRequest.jsx';

const RouteComponent = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={PageEndpoints.PublicEndpoints.HOME_ENDPOINT} element={<LandingPage />} />
      </Route>

      <Route element={<ProfileLayout />}>
        <Route path="/profile" element={<UserProfileForm />} />
      </Route>

      {/* Route for CreateBloodRequest */}
      <Route path="/request/create" element={<CreateBloodRequest />} />

      {PublicRoutesComponent()}

    </Routes>
  )
}

export default RouteComponent
