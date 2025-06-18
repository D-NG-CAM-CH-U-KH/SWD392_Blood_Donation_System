import { Box, Typography } from '@mui/material';
import React from 'react';
import { RED_700 } from '~/theme';
import Button from '@mui/material/Button';

function WaysToGive() {
  return (
    <Box sx={{ margin: 5 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 25, paddingBottom: 2 }}>Ways to Give</Typography>
      <Box sx={{ display: 'flex' }}>
        <img src="/src/assets/images/drop.png" style={{ width: 100, height: 100 }} />
        <Box>
          <Typography sx={{ fontWeight: 400, fontSize: 15 }}>Our healthcare systems rely heavily on communities to generously donate blood. However, there are many reasons why a person cannot or will not donate his or her blood. Vitalant Foundation offers these individuals and other community benefactors an alternative way of supporting this critical healthcare need. Your financial donation directly impacts the lives of patients in need of blood.
          </Typography>
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
              borderTop: 2
            }}
          >
            Learn More
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default WaysToGive
