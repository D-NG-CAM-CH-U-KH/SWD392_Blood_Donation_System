import { Box, Typography } from '@mui/material'
import React from 'react'
import { BLUE_700, RED_300, RED_500, RED_700 } from '~/theme';
import Button from '@mui/material/Button';


function ServiceComponents() {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 5 }}>
        <Box sx={{ display: 'flex', padding: 3, borderRadius: '16px', backgroundColor: RED_300, gap: 2 }}>
          <img src='/src/assets/images/drop.png' style={{ width: 100, height: 100 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: 20, fontWeight: 400 }}>Make an appointment</Typography>
            <Box sx={{ width: '250px' }}>
              <Typography sx={{ fontSize: 15, fontWeight: 400 }}>Enter your zip code to find the nearest donation center or blood drive near you.</Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: RED_700,
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '16px',
                boxShadow: 'none',
                width: 80,
              }}
            >
              Donate
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', padding: 3, borderRadius: '16px', backgroundColor: RED_300, gap: 2 }}>
          <img src='/src/assets/images/give.png' style={{ width: 100, height: 100 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: 20, fontWeight: 400 }}>Learn about donating blood</Typography>
            <Box sx={{ width: '250px' }}>
              <Typography sx={{ fontSize: 15, fontWeight: 400 }}>Learn about every step in our simple blood donation process and what to expect.</Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: RED_700,
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '16px',
                boxShadow: 'none',
                width: 120,
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', padding: 3, borderRadius: '16px', backgroundColor: RED_300, gap: 2 }}>
          <img src='/src/assets/images/calendar.png' style={{ width: 100, height: 100 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: 20, fontWeight: 400 }}>Are you eligible?</Typography>
            <Box sx={{ width: '250px' }}>
              <Typography sx={{ fontSize: 15, fontWeight: 400 }}>Donating blood is safe and easy to do. Find out the general eligibility criteria.</Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: RED_700,
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '16px',
                boxShadow: 'none',
                width: 120,
              }}
            >
              Eligible
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default ServiceComponents
