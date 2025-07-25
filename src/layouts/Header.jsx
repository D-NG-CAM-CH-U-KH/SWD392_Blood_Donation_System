import React, { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  Divider,
  Menu,
  MenuItem
} from '@mui/material'
import { RED_700, GREY_LIGHT } from '~/theme'
import PageEndpoints from '~/meta-data/contants/page-endpoints'
import { useNavigate } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

function Header() {
  const navigate = useNavigate()
  const [bloodTypeAnchorEl, setBloodTypeAnchorEl] = useState(null)
  const [appointmentAnchorEl, setAppointmentAnchorEl] = useState(null)

  const handleMenuClose = () => {
    setBloodTypeAnchorEl(null)
    setAppointmentAnchorEl(null)
  }

  const handleNavigate = (path) => {
    handleMenuClose()
    navigate(path)
  }

  return (
    <AppBar position="static" color="transparent" sx={{ minHeight: '85px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src="/images/Logo.png" width="25" height="25" alt="Logo" />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href={PageEndpoints.PublicEndpoints.HOME_ENDPOINT}
              sx={{
                fontFamily: 'Raleway',
                fontWeight: 800,
                fontSize: 24,
                color: RED_700,
                textDecoration: 'none'
              }}
            >
              Blood Donation Center
            </Typography>
          </Box>
          {/* Nav buttons bên phải */}
          <Box
            sx={{
              display: 'flex',
              gap: 5,
            }}
          >
            <Button disableRipple sx={{ py: '20px', fontWeight: 600, color: GREY_LIGHT }}
              onClick={() => navigate(PageEndpoints.PublicEndpoints.HOME_ENDPOINT)}>
              Home
            </Button>
            {/*             
            <Button disableRipple sx={{ py: '20px', fontWeight: 600, color: GREY_LIGHT }}>
              Blogs
             </Button> 
             */}

            <Button disableRipple sx={{ py: '20px', fontWeight: 600, color: GREY_LIGHT }} onClick={() => navigate('blood-donor/lookup')}>
              Lookup
            </Button>

            <Box
              onMouseEnter={(e) => setBloodTypeAnchorEl(e.currentTarget)}
              onMouseLeave={handleMenuClose}
              sx={{ display: 'inline-block' }}
            >
              <Button disableRipple sx={{ py: '20px', fontWeight: 600, color: GREY_LIGHT }}>
                Your Blood Type
                <ExpandMoreIcon fontSize="small" sx={{ ml: 0.5, color: GREY_LIGHT }} />
              </Button>
              <Menu
                anchorEl={bloodTypeAnchorEl}
                open={Boolean(bloodTypeAnchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                MenuListProps={{ onMouseLeave: handleMenuClose }}
              >
                <MenuItem onClick={() => handleNavigate(PageEndpoints.PrivateEndpoints.GET_BLOOD_TYPE)}>Get blood type</MenuItem>
                <MenuItem onClick={() => handleNavigate('/submit-certificate')}>Submit certificate</MenuItem>
              </Menu>
            </Box>


            {/* Blood Appointment dropdown on hover */}
            <Box
              onMouseEnter={(e) => setAppointmentAnchorEl(e.currentTarget)}
              onMouseLeave={handleMenuClose}
              sx={{ display: 'inline-block' }}
            >
              <Button disableRipple sx={{ py: '20px', fontWeight: 600, color: GREY_LIGHT }}>
                Blood Appointment
                <ExpandMoreIcon fontSize="small" sx={{ ml: 0.5, color: GREY_LIGHT }} />
              </Button>
              <Menu
                anchorEl={appointmentAnchorEl}
                open={Boolean(appointmentAnchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                MenuListProps={{ onMouseLeave: handleMenuClose }}
              >
                <MenuItem onClick={() => handleNavigate('/blood-donation/create')}>Create Appointment</MenuItem>
                <MenuItem onClick={() => handleNavigate('/blood-donation/view-all')}>View Appointments</MenuItem>
              </Menu>
            </Box>


            <Button disableRipple sx={{ py: '20px', fontWeight: 600, color: GREY_LIGHT }}
              onClick={() => navigate(PageEndpoints.PublicEndpoints.LOGIN_ENDPOINT)}>
              Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
      <Divider />
    </AppBar>
  )
}

export default Header
