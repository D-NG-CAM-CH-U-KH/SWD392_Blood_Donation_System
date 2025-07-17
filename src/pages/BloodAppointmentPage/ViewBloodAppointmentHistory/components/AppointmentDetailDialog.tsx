import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Box, Typography, Chip } from '@mui/material';
import { DonationAppointment } from '../BloodAppointmentHistory.component';

interface AppointmentDetailDialogProps {
  open: boolean;
  onClose: () => void;
  appointment: DonationAppointment | null;
  getStatusConfig: (status: string) => { color: string; icon: React.ReactNode; label: string };
}

const AppointmentDetailDialog: React.FC<AppointmentDetailDialogProps> = ({ open, onClose, appointment, getStatusConfig }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Chi tiết cuộc hẹn</DialogTitle>
    <DialogContent>
      {appointment && (
        <Stack spacing={2}>
          <Box>
            <Typography variant="h6" gutterBottom>Trạng thái</Typography>
            <Chip
              icon={getStatusConfig(appointment.Status).icon}
              label={getStatusConfig(appointment.Status).label}
              color={getStatusConfig(appointment.Status).color as any}
            />
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>Thông tin cơ bản</Typography>
            <Typography>Ngày: {appointment.ScheduledDate}</Typography>
            <Typography>Giờ: {appointment.TimeSlot}</Typography>
            <Typography>Địa điểm: {appointment.Location}</Typography>
            <Typography>Nhóm máu: {appointment.BloodType}</Typography>
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>Ghi chú</Typography>
            <Typography>{appointment.Note || 'Không có ghi chú'}</Typography>
          </Box>
          {appointment.donationForm && (
            <Box>
              <Typography variant="h6" gutterBottom>Thông tin phiếu hiến máu</Typography>
              <Typography>Mã phiếu: {appointment.donationForm.donationFormID}</Typography>
              <Typography>Đã hiến máu: {appointment.donationForm.isDonated ? 'Có' : 'Chưa'}</Typography>
              <Typography>Bệnh: {appointment.donationForm.illness}</Typography>
              <Typography>Bệnh nguy hiểm: {appointment.donationForm.dangerousIllness}</Typography>
              <Typography>Vấn đề 12 tháng: {appointment.donationForm.twelveMonthProblem}</Typography>
              <Typography>Vấn đề 6 tháng: {appointment.donationForm.sixMonthProblem}</Typography>
              <Typography>Vấn đề 1 tháng: {appointment.donationForm.oneMonthProblem}</Typography>
              <Typography>Vấn đề 14 ngày: {appointment.donationForm.fourteenDayProblem}</Typography>
              <Typography>Vấn đề 7 ngày: {appointment.donationForm.sevenDayProblem}</Typography>
              <Typography>Vấn đề phụ nữ: {appointment.donationForm.womanProblem}</Typography>
            </Box>
          )}
        </Stack>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Đóng</Button>
    </DialogActions>
  </Dialog>
);

export default AppointmentDetailDialog; 