import React, { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  Divider
} from '@mui/material'
import { RED_700, GREY_LIGHT } from '~/theme'
import PageEndpoints from '~/meta-data/contants/page-endpoints'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="transparent" sx={{ minHeight: '85px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between', // cách đều 2 phần trái và phải
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src="src\assets\images\Logo.png" width="25" height="25" />
            {/* Logo bên trái */}
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
            <Button disableRipple sx={{ py: '20px', fontWeight: 600, color: GREY_LIGHT }}>
              Blogs
            </Button>
            <Button disableRipple sx={{ py: '20px', fontWeight: 600, color: GREY_LIGHT }}>
              Lookup
            </Button>
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
