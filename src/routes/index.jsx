import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from '~/layouts/DefaultLayout/default.layout'
import LandingPage from '~/pages/LandingPage/LandingPage'

const RouteComponent = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
    </Routes>
  )
}

export default RouteComponent
