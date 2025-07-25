import { Box, Grid } from '@mui/material';
import Header from '../Header';
import Footer from '../Footer';
import { BG_COLOR } from '~/theme';
import BloodDonationDashboard from '../../pages/BloodAppointmentPage/ViewBloodAppointmentHistory/BloodAppointmentHistory.component';

const BloodAppointmentHistoryLayout = () => {
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
        <BloodDonationDashboard />
      </Box>
      <Footer />
    </Grid>
  );
};

export default BloodAppointmentHistoryLayout;