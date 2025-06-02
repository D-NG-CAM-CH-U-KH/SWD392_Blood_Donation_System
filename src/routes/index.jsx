import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from '~/layouts/DefaultLayout/default.layout'
import ProfileLayout from '~/layouts/ProfileLayout/profile.layout'
import LandingPage from '~/pages/LandingPage/LandingPage'
import UserProfile from '~/pages/UserPage/UserProfile'
import UserProfileForm from '~/pages/UserPage/UserProfile.component'
import UserProfileNavbar from '~/pages/UserPage/UserProfileNavbar.component'
import PublicRoutesComponent from './public.routes'

const RouteComponent = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route element={<ProfileLayout />}>
        <Route path="/profile" element={<UserProfileForm />} />
      </Route>

      {PublicRoutesComponent()}

    </Routes>
  )
}

export default RouteComponent
