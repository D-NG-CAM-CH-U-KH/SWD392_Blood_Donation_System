import { Box, Typography } from '@mui/material'
import React from 'react'
import { RED_300, RED_700 } from '~/theme'

function OurCommunity() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', bgcolor: RED_300, height: 300, mb: 5, mt: 5, p: 2 }}>
      <img src="src\assets\images\BloodGroup.png" alt="Italian Trulli" style={{ width: 500 }} />
      <Box sx={{ width: 500 }}>
        <Typography sx={{ fontSize: 30, fontWeight: 700, color: RED_700 }}>
          OUR COMMUNITY
        </Typography>
        <Typography sx={{ fontSize: 15, fontWeight: 400 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur justo elit, ut dictum eros varius ut. Sed tincidunt justo ante, dapibus consequat eros maximus id
        </Typography>
      </Box>
    </Box>
  )
}

export default OurCommunity
