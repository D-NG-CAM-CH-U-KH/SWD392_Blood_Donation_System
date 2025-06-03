import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import { GREY_LIGHT, RED_300, RED_700 } from '~/theme';
import CardMedia from '@mui/material/CardMedia';

function LatestNews() {
  return (
    <Box sx={{ marginTop: 5, marginBottom: 5, mt: 5 }}>
      <Typography sx={{ mb: 2, fontSize: 25, fontWeight: 700, color: RED_700 }} >
        Latest News
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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

export default LatestNews
