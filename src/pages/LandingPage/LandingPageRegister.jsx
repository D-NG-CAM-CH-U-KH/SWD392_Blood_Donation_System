import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import { GREY_LIGHT, RED_300, RED_700 } from '~/theme';
import CardMedia from '@mui/material/CardMedia';

function LandingPageRegister() {
  return (
    <Box sx={{ marginTop: 5, marginBottom: 5 }}>
      <Typography sx={{ mb: 2, fontSize: 25, fontWeight: 700, color: RED_700 }} >
        Register to donate blood or plasma
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card
          sx={{
            maxWidth: 250,
            height: 230,
            bgcolor: RED_300,
            // border: '1px solid #000',
            p: 1
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
              Become a blood donor
            </Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 400 }}>
              Save up to 3 lives in 1 hour.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button sx={{ bgcolor: RED_700, color: 'white', width: '100%', boxShadow: 'none' }} variant="contained">
              Sign up to give blood
            </Button>
          </CardActions>
        </Card>

        <Card
          sx={{
            maxWidth: 250,
            height: 230,
            // border: '1px solid #000',
            bgcolor: RED_300,
            p: 1
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
              Become a plasma donor
            </Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 400 }}>
              Save up to 3 lives in 1 hour.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button sx={{ bgcolor: RED_700, color: 'white', width: '100%', boxShadow: 'none' }} variant="contained">
              Sign up to give blood
            </Button>
          </CardActions>
        </Card>

        <Card sx={{
          maxWidth: 250,
          height: 230
        }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://image.vietnamnews.vn/uploadvnnews/Article/2023/6/11/287597_blood.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                Who can give blood?
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 400 }}>
                As long as you are fit and healthy, you should be able to give blood. Check if you meet the requirements to donate.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{
          maxWidth: 250,
          height: 230
        }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://image.vietnamnews.vn/uploadvnnews/Article/2023/6/11/287597_blood.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                Who can give blood?
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 400 }}>
                As long as you are fit and healthy, you should be able to give blood. Check if you meet the requirements to donate.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{
          maxWidth: 250,
          height: 230
        }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://image.vietnamnews.vn/uploadvnnews/Article/2023/6/11/287597_blood.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                Who can give blood?
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 400 }}>
                As long as you are fit and healthy, you should be able to give blood. Check if you meet the requirements to donate.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
}

export default LandingPageRegister;
