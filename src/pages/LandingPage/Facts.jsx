import { Box, Typography } from '@mui/material';
import React from 'react';
import { RED_700 } from '~/theme';
import Button from '@mui/material/Button';

function Facts() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 10 }}>
      {/* Block 1 */}
      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: 25, paddingBottom: 2 }}>
          Facts About Blood Needs
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <img src="/src/assets/images/drop.png" style={{ width: 100, height: 100 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: '550px' }}>
              <Typography sx={{ fontSize: 15, fontWeight: 400 }}>
                Every 2 seconds someone in the U.S. needs blood and or platelets.
                <br />
                Approximately 30,000 units of red blood cells are needed every day in the U. S.
                <br />
                Nearly 6,000 units of platelets and 6,000 units of plasma are needed daily in the U.S.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: 25, paddingBottom: 2 }}>
          What Happens to Donated Blood?
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <img src="/src/assets/images/drop.png" style={{ width: 100, height: 100 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: '550px' }}>
              <Typography sx={{ fontSize: 15, fontWeight: 400 }}>
                Have you ever wondered exactly what happens to the blood you donate at Vitalant? Your blood goes on an amazing journey!
                <br />
                You can learn about all the steps your blood goes through before it reaches a recipient in this informative video.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Facts;
