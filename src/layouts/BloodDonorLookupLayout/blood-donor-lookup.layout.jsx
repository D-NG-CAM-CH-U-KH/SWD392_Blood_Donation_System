import React from 'react';
import { Box, Grid } from '@mui/material';
import Header from '../Header';
import Footer from '../Footer';
import { BG_COLOR } from '~/theme';
import BloodDonorLookup from '~/pages/BloodDonorLookupPage/BloodDonorLookupPage.component';
import { Outlet } from 'react-router-dom';

const BloodDonorLookupLayout = () => {
  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    sx={{ m: 0, p: 0, bgcolor: BG_COLOR }}
>
      <Header />
      <Box sx={{ flex: 1, py: 0 }}>
        <BloodDonorLookup />
      </Box>
      <Footer />
      <Outlet/>
    </Grid>
  );
};

export default BloodDonorLookupLayout;