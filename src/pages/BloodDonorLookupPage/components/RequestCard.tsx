import React from 'react';
import { CardContent, CardActions, Button, Typography, Box, LinearProgress, Chip } from '@mui/material';
import { PersonAdd, Map, BloodtypeRounded, AccessTime, EmergencyShare, Warning, PauseCircle } from '@mui/icons-material';
import { StyledCard, BloodTypeChip } from './styled';

interface RequestType {
  id: number;
  patientName: string;
  bloodType: string;
  hospital: string;
  urgency: string;
  needed: number;
  received: number;
  deadline: string;
  contact: string;
  components: string[];
  status: string;
}

const RequestCard = ({ request }: { request: RequestType }) => {
  let statusColor: 'error' | 'warning' | 'default';
  let statusIcon, statusLabel, statusSx;
  if (request.urgency === 'Khẩn cấp') {
    statusColor = 'error';
    statusIcon = <EmergencyShare />;
    statusLabel = 'Khẩn cấp';
    statusSx = {
      fontWeight: 700,
      fontSize: '1.1rem',
      minWidth: 120,
      background: '#ffeaea',
      color: '#d32f2f',
      border: '2px solid #d32f2f',
      boxShadow: '0 2px 8px rgba(211,47,47,0.08)',
      borderRadius: 2,
      px: 2,
    };
  } else if (request.urgency === 'Bình thường') {
    statusColor = 'warning';
    statusIcon = <Warning />;
    statusLabel = 'Bình thường';
    statusSx = {
      fontWeight: 700,
      fontSize: '1.1rem',
      minWidth: 120,
      background: '#fff3e0',
      color: '#ff9800',
      border: '2px solid #ff9800',
      boxShadow: '0 2px 8px rgba(255,152,0,0.08)',
      borderRadius: 2,
      px: 2,
    };
  } else {
    statusColor = 'default';
    statusIcon = <PauseCircle />;
    statusLabel = request.urgency;
    statusSx = {
      fontWeight: 700,
      fontSize: '1.1rem',
      minWidth: 120,
      background: '#f5f5f5',
      color: '#757575',
      border: '2px solid #bdbdbd',
      boxShadow: '0 2px 8px rgba(117,117,117,0.08)',
      borderRadius: 2,
      px: 2,
    };
  }
  return (
    <StyledCard sx={{ width: 350, height: 470, mx: 'auto', position: 'relative' }}>
      {/* Status chip at top center, styled like DonorCard */}
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2, mb: 1 }}>
        <Chip
          icon={statusIcon}
          label={statusLabel}
          color={statusColor}
          sx={statusSx}
        />
      </Box>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <BloodTypeChip
            bloodtype={request.bloodType}
            label={request.bloodType}
            size="medium"
            sx={{ fontSize: '1.1rem', background: '#fff', color: '#d32f2f', border: '2px solid #d32f2f', fontWeight: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', px: 2, borderRadius: 2, mb: 1 }}
          />
          <Typography variant="h6" component="div" align="center">
            {request.patientName}
          </Typography>
        </Box>
        <Box sx={{ mb: 1.5 }}>
          <Typography variant="body2" color="text.secondary">
            <Map fontSize="small" sx={{ mr: 1 }} />
            {request.hospital}
          </Typography>
        </Box>
        <Box sx={{ mb: 1.5 }}>
          <Typography variant="body2" color="text.secondary">
            <BloodtypeRounded fontSize="small" sx={{ mr: 1 }} />
            Thành phần cần: {request.components.join(', ')}
          </Typography>
        </Box>
        <Box sx={{ mb: 1.5 }}>
          <Typography variant="body2" color="text.secondary">
            <AccessTime fontSize="small" sx={{ mr: 1 }} />
            Hạn cuối: {new Date(request.deadline).toLocaleDateString('vi-VN')}
          </Typography>
        </Box>
        <Box mt={2} mb={2}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Tiến độ: {request.received}/{request.needed} đơn vị
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(request.received / request.needed) * 100}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button
          startIcon={<PersonAdd />}
          variant="contained"
          fullWidth
          disabled={request.status === 'completed'}
        >
          {request.status === 'completed' ? 'Đã hoàn thành' : 'Đăng ký hiến'}
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default RequestCard; 