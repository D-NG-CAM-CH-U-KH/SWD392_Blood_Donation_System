import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from '~/layouts/DefaultLayout/default.layout'
import LandingPage from '~/pages/LandingPage/LandingPage'
import UserProfile from '~/pages/UserPage/UserProfile'
import UserProfileNavbar from '~/pages/UserPage/UserProfileNavbar.component'

const RouteComponent = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route path="/profile" element={<UserProfile />} />

    </Routes>
  )
}

export default RouteComponent
