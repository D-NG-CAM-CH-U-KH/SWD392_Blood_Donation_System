// LandingPageCarousel.jsx
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import SLIDE_1 from '~/assets/images/Slide1.jpg' // Adjust the path as necessary

const slides = [
  {
    image: SLIDE_1
  },
  {
    image: SLIDE_1
  },
  {
    image: SLIDE_1
  }
]

function LandingPageCarousel() {
  return (
    <div style={{ width: '100%', maxWidth: 'auto', margin: '0 auto' }}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{ clickable: true }}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        style={{ borderRadius: '20px', overflow: 'hidden' }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '500px',
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default LandingPageCarousel
