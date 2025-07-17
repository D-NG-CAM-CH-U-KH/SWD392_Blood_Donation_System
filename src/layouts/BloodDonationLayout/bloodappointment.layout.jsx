import React from 'react';
import { Box, Grid } from '@mui/material';
import Header from '../Header';
import Footer from '../Footer';
import { BG_COLOR } from '~/theme';
import { Outlet } from 'react-router-dom';
import BloodAppointment from '../../pages/BloodAppointmentPage/CreateBloodAppointment/BloodAppointment.component';

const BloodAppointmentLayout = () => {
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
        <BloodAppointment />
      </Box>
      <Footer />
      <Outlet />
    </Grid>
  );
};

export default BloodAppointmentLayout;