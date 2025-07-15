import {
    Box, Typography, Card, CardContent, Grid, Alert, AlertTitle
  } from '@mui/material';
  import { CheckCircle, CalendarToday } from '@mui/icons-material';
  
  interface StepConfirmationProps {
    selectedDate: string;
    selectedTimeSlot: string;
    note: string;
    location: string;
  }
  
  const StepConfirmation: React.FC<StepConfirmationProps> = ({
    selectedDate, selectedTimeSlot, note, location
  }) => (
    <Box textAlign="center">
      <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
      <Typography variant="h4" gutterBottom>Xác nhận thông tin</Typography>
      <Typography color="text.secondary" paragraph>Kiểm tra lại thông tin trước khi hoàn tất đăng ký</Typography>
      <Card sx={{ mb: 3, textAlign: 'left' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <CalendarToday sx={{ mr: 1, verticalAlign: 'middle' }} />
            Thông tin lịch hẹn
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography><strong>Ngày:</strong></Typography>
              <Typography>{selectedDate ? new Date(selectedDate).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography><strong>Thời gian:</strong></Typography>
              <Typography>{selectedTimeSlot}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography><strong>Địa điểm:</strong></Typography>
              <Typography>{location}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {note && (
        <Card sx={{ mb: 3, textAlign: 'left' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Ghi chú</Typography>
            <Typography>{note}</Typography>
          </CardContent>
        </Card>
      )}
      <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
        <AlertTitle>Lưu ý cuối cùng</AlertTitle>
        <ul>
          <li>Vui lòng đến đúng giờ hẹn</li>
          <li>Mang theo CMND/CCCD và thẻ BHYT (nếu có)</li>
          <li>Ăn no và uống đủ nước trước khi hiến máu</li>
          <li>Không uống rượu bia 24h trước khi hiến máu</li>
        </ul>
      </Alert>
    </Box>
  );
  
  export default StepConfirmation;