import {
    Box, Typography, Alert, AlertTitle, Grid, Button, TextField
  } from '@mui/material';
  import { CalendarToday } from '@mui/icons-material';
  
  interface StepAppointmentProps {
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    selectedTimeSlot: string;
    setSelectedTimeSlot: (slot: string) => void;
    errors: { [key: string]: string };
    timeSlots: string[];
    note: string;
    setNote: (note: string) => void;
    otherTimeReason?: string;
    setOtherTimeReason?: (reason: string) => void;
    location: string;
    setLocation: (location: string) => void;
  }
  
  const StepAppointment: React.FC<StepAppointmentProps> = ({
    selectedDate, setSelectedDate, selectedTimeSlot, setSelectedTimeSlot, errors, timeSlots, note, setNote,
    otherTimeReason = '', setOtherTimeReason = () => {}, location, setLocation
  }) => (
    <Box>
      <Box textAlign="center" mb={4}>
        <CalendarToday sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>Đặt lịch hiến máu</Typography>
      </Box>
      <Alert severity="success" sx={{ mb: 3 }}>
        <Typography><strong>Thông tin của bạn:</strong> Nhóm máu: AB+</Typography>
      </Alert>
      <Grid sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} mb={1} sx={{ fontSize: 16 }}>Chọn ngày hiến máu</Typography>
        <TextField
          fullWidth
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          error={!!errors.selectedDate}
          helperText={errors.selectedDate}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: new Date().toISOString().split('T')[0] }}
          sx={{
            fontSize: 16,
            '& .MuiInputBase-root': { fontSize: 16 },
            '& .MuiFormHelperText-root': { fontSize: 14 },
          }}
        />
      </Grid>
      <Grid sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} mb={1} sx={{ fontSize: 16 }}>Chọn khung giờ</Typography>
        <Grid container spacing={2}>
          {timeSlots.map(slot => (
            <Grid item xs={6} sm={3} key={slot}>
              <Button
                fullWidth
                variant={selectedTimeSlot === slot ? 'contained' : 'outlined'}
                color={selectedTimeSlot === slot ? 'primary' : 'inherit'}
                onClick={() => setSelectedTimeSlot(slot)}
                sx={{
                  py: 2,
                  borderRadius: 2,
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                {slot}
              </Button>
            </Grid>
          ))}
          {/* <Grid item xs={6} sm={3} key="other">
            <Button
              fullWidth
              variant={selectedTimeSlot.startsWith('Khác:') ? 'contained' : 'outlined'}
              color={selectedTimeSlot.startsWith('Khác:') ? 'primary' : 'inherit'}
              onClick={() => setSelectedTimeSlot('Khác:')}
              sx={{
                py: 2,
                borderRadius: 2,
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              Khác
            </Button>
          </Grid> */}
        </Grid>
        {selectedTimeSlot.startsWith('Khác:') && (
          <TextField
            fullWidth
            label="Lý do chọn khung giờ khác"
            value={otherTimeReason}
            onChange={e => {
              setOtherTimeReason(e.target.value);
              setSelectedTimeSlot('Khác: ' + e.target.value);
            }}
            sx={{ mt: 2 }}
          />
        )}
        {errors.selectedTimeSlot && (
          <Typography color="error" variant="caption" sx={{ fontSize: 14 }}>{errors.selectedTimeSlot}</Typography>
        )}
      </Grid>
      <Grid sx={{ mb: 3 }}>
        <Alert severity="info">
          <AlertTitle>Lưu ý:</AlertTitle>
          Vui lòng chọn ngày và giờ phù hợp với lịch trình của bạn. Chúng tôi sẽ liên hệ để xác nhận lịch hẹn trước ngày hiến máu.
        </Alert>
      </Grid>
      <Grid sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} mb={1} sx={{ fontSize: 16 }}>Ghi chú thêm</Typography>
        <TextField
          fullWidth
          multiline
          minRows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Các yêu cầu đặc biệt hoặc thông tin bổ sung..."
          sx={{
            minHeight: 120,
            width: '100%',
            fontSize: 16,
            '& .MuiInputBase-root': {
              fontSize: 16,
              borderRadius: 2,
              padding: '16px 16px',
            },
            '& .MuiInputBase-input': {
              padding: 0,
            },
          }}
        />
      </Grid>
      <Grid sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} mb={1} sx={{ fontSize: 16 }}>Địa điểm hiến máu</Typography>
        <TextField
          fullWidth
          label="Nhập địa điểm hiến máu"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Ví dụ: Bệnh viện Chợ Rẫy, TP.HCM"
          sx={{ fontSize: 16, '& .MuiInputBase-root': { fontSize: 16 } }}
        />
      </Grid>
    </Box>
  );
  
  export default StepAppointment;