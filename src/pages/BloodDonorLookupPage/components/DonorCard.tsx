import React from 'react';
import { CardContent, CardActions, Button, Tooltip, IconButton, Avatar, Typography, Box, LinearProgress, Chip } from '@mui/material';
import { Phone, FavoriteRounded, LocationOn, Map, AccessTime } from '@mui/icons-material';
import { StyledCard, StyledChip, BloodTypeChip } from './styled';
import DonorStatusChip from './DonorStatusChip';

interface DonorType {
  id: number;
  name: string;
  bloodType: string;
  phone: string;
  email: string;
  location: string;
  distance: number;
  lastDonation: string;
  nextAvailable: string;
  donationCount: number;
  isAvailable: boolean;
  isEmergency: boolean;
  avatar: string;
  compatibility: string[];
  components: string[];
}

const DonorCard = ({ donor, handleContact }: { donor: DonorType, handleContact: (donor: DonorType) => void }) => (
  <StyledCard sx={{ width: 350, height: 535, mx: 'auto', position: 'relative' }}>
    {/* Status chip at top center */}
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2, mb: 1 }}>
      <DonorStatusChip isEmergency={donor.isEmergency} isAvailable={donor.isAvailable} />
    </Box>
    <CardContent>
      {/* Avatar, name, blood type chip stacked vertically */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Avatar
          src={donor.avatar}
          sx={{ width: 60, height: 60, mb: 1 }}
        />
        <Typography variant="h6" component="div">
          {donor.name}
        </Typography>
        <Box mt={1} mb={1}>
          <BloodTypeChip
            bloodtype={donor.bloodType}
            label={donor.bloodType}
            size="medium"
            sx={{
              fontSize: '1.1rem',
              background: '#fff',
              color: '#d32f2f',
              border: '2px solid #d32f2f',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              px: 2,
              borderRadius: 2,
            }}
          />
        </Box>
      </Box>
      {/* Distance info, left-aligned and consistent with other info rows, in a flex row with icon */}
      <Box display="flex" alignItems="center" sx={{ mb: 1.5 }}>
        <LocationOn fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
        <Typography variant="body2" color="text.secondary">
          Khoảng cách:
        </Typography>
        <Typography variant="body2" sx={{ color: '#d32f2f', fontWeight: 600, ml: 0.5 }}>
          {donor.distance}km
        </Typography>
      </Box>
      {/* Adjust spacing for info rows below distance */}
      <Box sx={{ mb: 1.5 }}>
        <Typography variant="body2" color="text.secondary">
          <Map fontSize="small" sx={{ mr: 1 }} />
          {donor.location}
        </Typography>
      </Box>
      <Box sx={{ mb: 1.5 }}>
        <Typography variant="body2" color="text.secondary">
          <AccessTime fontSize="small" sx={{ mr: 1 }} />
          Hiến lần cuối: {new Date(donor.lastDonation).toLocaleDateString('vi-VN')}
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Thành phần máu có thể hiến:
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {donor.components.map((component: string, index: number) => (
            <StyledChip
              key={index}
              label={component}
              size="small"
              variant="outlined"
              color="secondary"
            />
          ))}
        </Box>
      </Box>
      <Box mt={2}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Số lần hiến máu: <strong>{donor.donationCount}</strong>
        </Typography>
        <LinearProgress
          variant="determinate"
          value={Math.min((donor.donationCount / 30) * 100, 100)}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>
    </CardContent>
    <CardActions>
      <Button
        startIcon={<Phone />}
        onClick={() => handleContact(donor)}
        variant="contained"
        fullWidth
        disabled={!donor.isAvailable}
      >
        Liên hệ
      </Button>
      <Tooltip title="Thêm vào danh sách yêu thích">
        <IconButton color="primary">
          <FavoriteRounded />
        </IconButton>
      </Tooltip>
    </CardActions>
  </StyledCard>
);

export default DonorCard; 