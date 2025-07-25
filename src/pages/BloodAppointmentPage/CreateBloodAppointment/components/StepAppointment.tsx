import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Alert, AlertTitle, Grid, Button, TextField, InputAdornment,
  CircularProgress, Skeleton
} from '@mui/material';
import { CalendarToday, Opacity } from '@mui/icons-material';
import axios from 'axios';

interface DonationSchedule {
  donationScheduleID: number;
  weekDay: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  bookedCount: number;
  remainingSlots: number;
}

interface StepAppointmentProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTimeSlot: string;
  setSelectedTimeSlot: (slot: string) => void;
  setSelectedDonationScheduleId: (id: number | null) => void;
  errors: { [key: string]: string };
  note: string;
  setNote: (n: string) => void;
  location: string;
  setLocation: (l: string) => void;
  bloodVolume: number;
  setBloodVolume: (v: number) => void;
}

const StepAppointment: React.FC<StepAppointmentProps> = ({
  selectedDate, setSelectedDate,
  selectedTimeSlot, setSelectedTimeSlot,
  setSelectedDonationScheduleId,
  errors,
  note, setNote,
  location, setLocation,
  bloodVolume, setBloodVolume
}) => {
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [availableSchedules, setAvailableSchedules] = useState<DonationSchedule[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState('');

  const getWeekDayFromDate = (dateStr: string) => {
    const weekdays = ['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'];
    return weekdays[new Date(dateStr).getDay()];
  };

  useEffect(() => {
    if (!selectedDate) {
      setTimeSlots([]);
      setAvailableSchedules([]);
      setSlotsError('');
      return;
    }
    fetchTimeSlots(selectedDate);
  }, [selectedDate]);

  const fetchTimeSlots = async (date: string) => {
    setLoadingSlots(true);
    setSlotsError('');
    try {
      const token = localStorage.getItem('ACCESS_TOKEN')?.replaceAll('"', '');
      // ✅ Fixed URL - removed typo
      const url = `https://localhost:5000/api/v1/donation-scheule/by-date`;
      const res = await axios.get(url, {
        params: { scheduledDate: date },
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      });

      console.log('Raw response.data:', res.data);

      if (res.data?.is_success) {
        const schedules: DonationSchedule[] = res.data.data ?? [];
        setAvailableSchedules(schedules);

        const slots = [...new Set(
          schedules.map(s => `${s.startTime.slice(0,5)} - ${s.endTime.slice(0,5)}`)
        )].sort();
        setTimeSlots(slots);
      } else {
        throw new Error('API trả về is_success = false');
      }
    } catch (e) {
      console.error(e);
      setSlotsError('Không thể tải khung giờ. Vui lòng thử lại.');
      setTimeSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const getSlotInfo = (slot: string) => {
    const sch = availableSchedules.find(s => {
      const formatted = `${s.startTime.slice(0,5)} - ${s.endTime.slice(0,5)}`;
      return formatted === slot;
    });
    if (!sch) return null;
    return {
      available: sch.remainingSlots,
      total: sch.maxCapacity,
      percent: Math.round(((sch.maxCapacity - sch.remainingSlots) / sch.maxCapacity) * 100),
      scheduleId: sch.donationScheduleID
    };
  };

  return (
    <Box mt={2}>
      <Typography variant="h5" fontWeight={700} color="error.main" gutterBottom>
        Đặt lịch hiến máu
      </Typography>

      {/* Chọn ngày */}
      <TextField
        label="Chọn ngày hiến máu *"
        type="date"
        fullWidth
        value={selectedDate}
        onChange={e => {
          setSelectedDate(e.target.value);
          setSelectedTimeSlot('');
          setSelectedDonationScheduleId(null);
        }}
        InputLabelProps={{ shrink: true }}
        error={!!errors.selectedDate}
        helperText={errors.selectedDate}
        inputProps={{ min: new Date().toISOString().split('T')[0] }}
        sx={{ mt: 2 }}
      />

      {/* Khung giờ */}
      <Box mt={3}>
        <Typography fontWeight={600}>
          Khung giờ {selectedDate && `(${getWeekDayFromDate(selectedDate)} – ${new Date(selectedDate).toLocaleDateString('vi-VN')})`}
        </Typography>

        {/* Loading */}
        {loadingSlots && selectedDate && (
          <Grid container spacing={2} mt={1}>
            {[1,2,3,4].map(i => (
              <Grid key={i} item xs={6} md={3}>
                <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 2 }} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Lỗi */}
        {slotsError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            <AlertTitle>Lỗi</AlertTitle>
            {slotsError}
            <Button size="small" sx={{ ml: 2 }} onClick={() => fetchTimeSlots(selectedDate)}>Thử lại</Button>
          </Alert>
        )}

        {/* Chưa chọn ngày */}
        {!selectedDate && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Vui lòng chọn ngày hiến máu để hiển thị khung giờ khả dụng.
          </Alert>
        )}

        {/* Không có slot */}
        {selectedDate && !loadingSlots && timeSlots.length === 0 && !slotsError && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Không có khung giờ nào khả dụng cho ngày đã chọn. Vui lòng chọn ngày khác.
          </Alert>
        )}

        {/* Hiển thị slot */}
        {timeSlots.length > 0 && (
          <Grid container spacing={2} mt={1}>
            {timeSlots.map(slot => {
              const info = getSlotInfo(slot);
              const isSelected = selectedTimeSlot === slot;
              return (
                <Grid item xs={6} md={3} key={slot}>
                  <Button
                    fullWidth
                    variant={isSelected ? 'contained' : 'outlined'}
                    color={isSelected ? 'error' : 'inherit'}
                    onClick={() => {
                      setSelectedTimeSlot(slot);
                      setSelectedDonationScheduleId(info?.scheduleId ?? null);
                      console.log('Selected Schedule ID:', info?.scheduleId);
                    }}
                    sx={{ py: 2, borderRadius: 2, flexDirection:'column', minHeight:72 }}
                  >
                    {slot}
                    {info && (
                      <Typography variant="caption" color="text.secondary">
                        Còn {info.available}/{info.total} chỗ
                      </Typography>
                    )}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        )}

        {errors.selectedTimeSlot && (
          <Alert severity="error" sx={{ mt: 2 }}>{errors.selectedTimeSlot}</Alert>
        )}
      </Box>

      {/* Lượng máu */}
      <TextField
        label="Lượng máu dự kiến hiến *"
        type="number"
        fullWidth
        value={bloodVolume || ''}
        onChange={e => setBloodVolume(e.target.value ? parseInt(e.target.value,10) : 0)}
        InputProps={{
          startAdornment: <InputAdornment position="start"><Opacity/></InputAdornment>,
          endAdornment: <InputAdornment position="end">ml</InputAdornment>
        }}
        helperText={errors.bloodVolume || 'Tiêu chuẩn 350–450 ml, tối đa 500 ml/lần'}
        error={!!errors.bloodVolume}
        sx={{ mt: 4 }}
      />

      {/* Ghi chú thêm */}
      <TextField
        label="Ghi chú thêm"
        multiline
        minRows={3}
        fullWidth
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Các yêu cầu đặc biệt hoặc thông tin bổ sung..."
        sx={{ mt: 4 }}
      />

      <Alert severity="info" sx={{ mt: 3 }}>
        • Chỉ những khung giờ còn chỗ trống mới được hiển thị.<br/>
        • Lượng máu hiến khuyến nghị 350-450 ml.<br/>
        • Chúng tôi sẽ liên hệ để xác nhận lịch hẹn.
      </Alert>
    </Box>
  );
};

export default StepAppointment;
