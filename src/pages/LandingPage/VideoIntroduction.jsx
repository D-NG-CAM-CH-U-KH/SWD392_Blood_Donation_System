import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { RED_700 } from '~/theme'

function VideoIntroduction() {
  return (
    <div>
      <Box sx={{ mt: 10, mb: 10, display: 'flex', justifyContent: 'space-around' }}>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 25, paddingBottom: 2 }}>Because of You, Life Doesn’t Stop</Typography>
          <Box sx={{ width: '700px' }}>
            <Typography sx={{ fontWeight: 400, fontSize: 15 }}>Every two seconds, someone in the U.S. needs blood. This could be a little girl in the ICU or a mother with Stage 3 leukemia. If you’re worried about needles, don’t be—most blood donors compare the experience to a mild, split-second pinch! The entire process is very safe and very fast, and you will feel amazing knowing you potentially saved up to three people.
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

        {/* Video */}
        <Box
          component="iframe"
          height="300px"
          // width="100%"
          width="600px"
          src="https://www.youtube.com/embed/FXmkVg8a2Mo?si=hDpin8L2t0j7Moas"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sx={{
            borderRadius: 2,
            boxShadow: 3,
          }}
        />
      </Box>
    </div >
  )
}

export default VideoIntroduction
