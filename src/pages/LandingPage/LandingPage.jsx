import React from 'react'
import LandingPageCarousel from '~/pages/LandingPage/LandingPageCarousel'
import LandingPageRegister from './LandingPageRegister'
import LatestNews from './LatestNews'
import OurCommunity from './OurCommunity'

function LandingPage() {
  return (
    <div>
      <LandingPageCarousel />
      <LandingPageRegister />
      <LatestNews />
      <OurCommunity />
    </div>
  )
}

export default LandingPage
