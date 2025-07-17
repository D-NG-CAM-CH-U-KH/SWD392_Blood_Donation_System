import React from 'react';
import { Grid } from '@mui/material';
import AppointmentCard from './AppointmentCard';
import { DonationAppointment } from '../BloodAppointmentHistory.component';

interface AppointmentListProps {
  appointments: DonationAppointment[];
  getStatusConfig: (status: string) => { color: string; icon: React.ReactNode; label: string };
  onMenuOpen: (e: React.MouseEvent<HTMLElement>, id: number) => void;
  onDetail: (appointment: DonationAppointment) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, getStatusConfig, onMenuOpen, onDetail }) => (
  <Grid container spacing={3} alignItems="stretch">
    {appointments.map((appointment) => (
      <Grid item xs={12} md={6} key={appointment.AppointmentID} sx={{ display: 'flex' }}>
        <AppointmentCard
          appointment={appointment}
          statusConfig={getStatusConfig(appointment.Status)}
          onMenuOpen={onMenuOpen}
          onDetail={() => onDetail(appointment)}
        />
      </Grid>
    ))}
  </Grid>
);

export default AppointmentList; 