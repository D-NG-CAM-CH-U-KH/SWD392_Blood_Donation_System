import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { RED_300, RED_500, RED_700 } from '~/theme';

function Background() {
  return (
    <Box
      sx={{
        height: 400,
        backgroundImage: `url('https://t4.ftcdn.net/jpg/05/42/10/81/360_F_542108165_he8omcCZdW83r8FJksTU3l3LZS0oVl4w.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 4,
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={5}
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: '100%', maxWidth: 1200 }}
      >
        {/* Text Side */}
        <Box maxWidth={400} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 25, color: RED_700 }}>
            Summer Lifesaving Starts Here
          </Typography>
          <Typography sx={{ fontSize: 20 }}>
            $10 Gift Card for All + Two Win $10,000!
          </Typography>
          <Typography sx={{ fontSize: 20 }}>
            Donate June 1–28
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: RED_700,
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '10px',
              boxShadow: 'none',
              width: 250,
            }}
          >
            MAKE APPOINTMENT NOW
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default Background;
