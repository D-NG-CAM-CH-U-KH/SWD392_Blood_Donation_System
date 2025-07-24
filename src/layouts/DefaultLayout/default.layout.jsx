import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { BG_COLOR } from '~/theme'
import Footer from '~/layouts/Footer'
import Header from '~/layouts/Header'

const DefaultLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: BG_COLOR,
      }}
    >
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flex: 1,
          pt: 4, // top padding for content
        }}
      >
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>

      {/* FOOTER */}
      <Footer />
    </Box>
  )
}

export default DefaultLayout
