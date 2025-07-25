import React from 'react';
import { Card, CardContent, Stack, Box, Typography, Chip, IconButton, Divider, Button } from '@mui/material';
import { CalendarToday, Schedule, LocationOn, MoreVert, Help } from '@mui/icons-material';
import { DonationAppointment } from '../BloodAppointmentHistory.component';

interface AppointmentCardProps {
  appointment: DonationAppointment;
  statusConfig?: { color: string; icon: React.ReactNode; label: string }; // ✅ Made optional
  onMenuOpen: (e: React.MouseEvent<HTMLElement>, id: number) => void;
  onDetail: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
  appointment, 
  statusConfig, 
  onMenuOpen, 
  onDetail 
}) => {
  // ✅ Default statusConfig nếu không được truyền
  const defaultStatusConfig = {
    color: '#757575',
    icon: <Help fontSize="small" />,
    label: 'Không xác định'
  };

  const finalStatusConfig = statusConfig || defaultStatusConfig;

  return (
    <Card sx={{ 
      height: '100%', 
      width: '350px', 
      display: 'flex', 
      flexDirection: 'column', 
      transition: 'all 0.3s ease', 
      '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } 
    }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Cuộc hẹn #{appointment.AppointmentID}
            </Typography>
            {/* ✅ Safe rendering với fallback */}
            <Chip
              icon={finalStatusConfig.icon}
              label={finalStatusConfig.label}
              size="small"
              sx={{
                backgroundColor: finalStatusConfig.color,
                color: 'white',
                fontWeight: 600,
                '& .MuiChip-icon': {
                  color: 'white'
                }
              }}
            />
          </Box>
          <IconButton onClick={(e) => onMenuOpen(e, appointment.AppointmentID)} size="small">
            <MoreVert />
          </IconButton>
        </Stack>

        <Stack spacing={1.5} mb={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarToday sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2">
              {appointment.ScheduledDate}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Schedule sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2">
              {appointment.TimeSlot}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocationOn sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2">
              {appointment.Location}
            </Typography>
          </Stack>
        </Stack>

        {appointment.Note && (
          <Typography variant="body2" color="text.secondary" sx={{ 
            fontStyle: 'italic', 
            mb: 2, 
            p: 1, 
            bgcolor: 'grey.50', 
            borderRadius: 1 
          }}>
            "{appointment.Note}"
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.secondary">
            Nhóm máu: {appointment.BloodType}
          </Typography>
          <Button size="small" onClick={onDetail}>
            Chi tiết
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
