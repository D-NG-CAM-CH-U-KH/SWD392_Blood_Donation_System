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
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuClose = () => {
    setAnchorEl(null)
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
            <img src="src/assets/images/Logo.png" width="25" height="25" alt="Logo" />
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

          <Box sx={{ display: 'flex', gap: 5 }}>
            <Button disableRipple sx={{ py: '20px', fontWeight: 600, color: GREY_LIGHT }} onClick={() => navigate(PageEndpoints.PublicEndpoints.HOME_ENDPOINT)}>
              Home
            </Button>
            <Button disableRipple sx={{ py: '20px', fontWeight: 600, color: GREY_LIGHT }}>
              Blogs
            </Button>
            <Button disableRipple sx={{ py: '20px', fontWeight: 600, color: GREY_LIGHT }} onClick={() => navigate('blood-donor/lookup')}>
              Lookup
            </Button>

            {/* Blood Appointment dropdown on hover */}
            <Box
              onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
              onMouseLeave={handleMenuClose}
              sx={{ display: 'inline-block' }}
            >
              <Button disableRipple sx={{ py: '20px', fontWeight: 600, color: GREY_LIGHT }}>
                Blood Appointment
                <ExpandMoreIcon fontSize="small" sx={{ ml: 0.5, color: GREY_LIGHT }} />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                MenuListProps={{ onMouseLeave: handleMenuClose }}
              >
                <MenuItem sx={{ fontFamily:'Poppins, Roboto, Arial, sans-serif', fontSize: "14px", fontWeight: "600", color: "#4B4B4B"}} onClick={() => handleNavigate('/blood-donation/create')}>Create Appointment</MenuItem>
                <MenuItem sx={{ fontFamily:'Poppins, Roboto, Arial, sans-serif', fontSize: "14px", fontWeight: "600", color: "#4B4B4B"}} onClick={() => handleNavigate('/blood-donation/view-all')}>View Appointments</MenuItem>
              </Menu>
            </Box>

            <Button disableRipple sx={{ py: '20px', fontWeight: 600, color: GREY_LIGHT }} onClick={() => navigate(PageEndpoints.PublicEndpoints.LOGIN_ENDPOINT)}>
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
