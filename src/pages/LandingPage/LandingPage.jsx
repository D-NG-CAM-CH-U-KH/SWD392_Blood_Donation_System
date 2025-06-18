import React from 'react'
import Background from './Background'
import ServiceComponents from './ServiceComponents'
import VideoIntroduction from './VideoIntroduction'
import Facts from './Facts'
import WaysToGive from './WaysToGive'

function LandingPage() {
  return (
    <div>
      <Background />
      <ServiceComponents />
      <VideoIntroduction />
      <Facts />
      <WaysToGive />
    </div>
  )
}

export default LandingPage
