import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Box, Container } from '@mui/material'
import PageEndpoints from '~/meta-data/contants/page-endpoints'

const GetBloodTypeComponent = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(PageEndpoints.PrivateEndpoints.CREATE_BLOOD_DONATION)
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          textAlign: 'center',
          mt: 10,
          p: 4,
          border: '1px solid #ccc',
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Get Your Blood Type Now!
        </Typography>
        <Typography variant="body1" gutterBottom>
          By donate your blood, we can identify your blood type and announce you for free!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNavigate}
          sx={{ mt: 4 }}
        >
          Go to Blood Donation
        </Button>
      </Box>
    </Container>
  )
}

export default GetBloodTypeComponent
