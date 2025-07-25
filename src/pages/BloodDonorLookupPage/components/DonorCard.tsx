import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Avatar,
  Grid,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Badge,
  Stack,
  useTheme,
  alpha
} from '@mui/material';
import {
  Phone,
  LocationOn,
  Schedule,
  Opacity,
  Person,
  Email,
  Favorite,
  Star,
  CallMade,
  LocalHospital,
  TrendingUp,
  Cake,
  BloodtypeOutlined,
  VerifiedUser
} from '@mui/icons-material';

interface DonorType {
  userID: number;
  fullName: string;
  email: string;
  phone: string;
  bloodGroup: string;
  bloodGroupId?: number;
  gender: string;
  dateOfBirth: string;
  location?: string;
  distance?: number;
  lastDonationDate?: string;
  totalVolumesDonated: number;
  completedAppointmentsCount: number;
  isActive: boolean;
}

interface DonorCardProps {
  donor: DonorType;
  handleContact: (donor: DonorType) => void;
}

// ✅ Giữ lại màu phân biệt cho BloodGroup
const getBloodTypeColor = (bloodType: string) => {
  const colorMap: Record<string, string> = {
    'O-': '#d32f2f', 'O+': '#f44336',
    'A-': '#7b1fa2', 'A+': '#9c27b0',
    'B-': '#1976d2', 'B+': '#2196f3',
    'AB-': '#388e3c', 'AB+': '#4caf50'
  };
  return colorMap[bloodType] || '#d32f2f';
};

const getDonorLevel = (completedCount: number) => {
  if (completedCount >= 20) return { level: 'PLATINUM', icon: '👑' };
  if (completedCount >= 10) return { level: 'GOLD', icon: '🏆' };
  if (completedCount >= 5) return { level: 'SILVER', icon: '🥈' };
  if (completedCount >= 1) return { level: 'BRONZE', icon: '🥉' };
  return { level: 'NEWCOMER', icon: '⭐' };
};

const DonorCard: React.FC<DonorCardProps> = ({ donor, handleContact }) => {
  const theme = useTheme();
  const bloodTypeColor = getBloodTypeColor(donor.bloodGroup);
  const donorLevel = getDonorLevel(donor.completedAppointmentsCount);
  
  // ✅ Màu đỏ thống nhất cho tất cả elements
  const primaryRedColor = '#d32f2f';

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Chưa hiến máu';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getStatusColor = () => {
    if (!donor.isActive) return '#ef4444';
    return primaryRedColor; // ✅ Sử dụng màu đỏ thống nhất
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: `2px solid ${alpha(primaryRedColor, 0.1)}`, // ✅ Màu đỏ
        background: `linear-gradient(135deg, ${alpha(primaryRedColor, 0.02)}, #ffffff)`, // ✅ Màu đỏ
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'visible',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: `0 20px 40px ${alpha(primaryRedColor, 0.15)}`, // ✅ Màu đỏ
          border: `2px solid ${alpha(primaryRedColor, 0.3)}`, // ✅ Màu đỏ
        }
      }}
    >
      {/* Status Indicator */}
      <Box
        sx={{
          position: 'absolute',
          top: -8,
          right: 16,
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: getStatusColor(), // ✅ Màu đỏ
          border: '3px solid white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: 2
        }}
      />

      {/* Donor Level Badge */}
      <Tooltip title={`Cấp độ: ${donorLevel.level}`}>
        <Chip
          label={`${donorLevel.icon} ${donorLevel.level}`}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            backgroundColor: alpha(primaryRedColor, 0.1), // ✅ Màu đỏ
            color: primaryRedColor, // ✅ Màu đỏ
            fontWeight: 700,
            fontSize: '0.7rem',
            height: 24,
            zIndex: 2,
            border: `1px solid ${alpha(primaryRedColor, 0.3)}` // ✅ Màu đỏ
          }}
        />
      </Tooltip>

      <CardContent sx={{ p: 3, pb: 2 }}>
        {/* Header Section */}
        <Box display="flex" alignItems="flex-start" mb={3} mt={1}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: bloodTypeColor, // ✅ Giữ màu phân biệt cho BloodGroup
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.6rem',
                  fontWeight: 'bold',
                  color: 'white',
                  border: '2px solid white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                {donor.bloodGroup}
              </Box>
            }
          >
            <Avatar
              sx={{
                width: 64,
                height: 64,
                mr: 2,
                background: `linear-gradient(135deg, ${primaryRedColor}, ${alpha(primaryRedColor, 0.8)})`, // ✅ Màu đỏ
                fontSize: '1.5rem',
                fontWeight: 'bold',
                boxShadow: `0 8px 24px ${alpha(primaryRedColor, 0.3)}`, // ✅ Màu đỏ
                border: '3px solid white'
              }}
            >
              {donor.fullName?.charAt(0) || 'U'}
            </Avatar>
          </Badge>
          
          <Box flex={1}>
            <Typography 
              variant="h6" 
              fontWeight={700}
              sx={{
                mb: 0.5,
                background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${primaryRedColor})`, // ✅ Màu đỏ
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontSize: '1.1rem'
              }}
            >
              {donor.fullName || 'Chưa cập nhật'}
            </Typography>
            
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <Chip
                icon={<BloodtypeOutlined sx={{ fontSize: '14px !important' }} />}
                label={donor.bloodGroup}
                size="small"
                sx={{
                  backgroundColor: bloodTypeColor, // ✅ Giữ màu phân biệt cho BloodGroup
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  height: 22,
                  '& .MuiChip-icon': { color: 'white' }
                }}
              />
              
              {donor.isActive && (
                <Chip
                  icon={<VerifiedUser sx={{ fontSize: '12px !important' }} />}
                  label="Hoạt động"
                  size="small"
                  sx={{ 
                    height: 22, 
                    fontSize: '0.7rem',
                    backgroundColor: alpha(primaryRedColor, 0.1), // ✅ Màu đỏ
                    color: primaryRedColor, // ✅ Màu đỏ
                    border: `1px solid ${alpha(primaryRedColor, 0.3)}`, // ✅ Màu đỏ
                    '& .MuiChip-icon': { color: primaryRedColor } // ✅ Màu đỏ
                  }}
                />
              )}
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
              <Cake sx={{ fontSize: '14px', mr: 0.5, verticalAlign: 'middle' }} />
              {calculateAge(donor.dateOfBirth)} tuổi • {donor.gender === 'male' ? 'Nam' : 'Nữ'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2, opacity: 0.3 }} />

        {/* Stats Section */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {/* Donation Count */}
          <Grid item xs={6}>
            <Box 
              sx={{ 
                textAlign: 'center',
                p: 1.5,
                borderRadius: 2,
                backgroundColor: alpha(primaryRedColor, 0.05), // ✅ Màu đỏ
                border: `1px solid ${alpha(primaryRedColor, 0.1)}` // ✅ Màu đỏ
              }}
            >
              <Typography 
                variant="h5" 
                fontWeight={800}
                sx={{ 
                  color: primaryRedColor, // ✅ Màu đỏ
                  mb: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.5
                }}
              >
                <Favorite sx={{ fontSize: '20px' }} />
                {donor.completedAppointmentsCount}
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Lần hiến máu
              </Typography>
            </Box>
          </Grid>

          {/* Total Volume */}
          <Grid item xs={6}>
            <Box 
              sx={{ 
                textAlign: 'center',
                p: 1.5,
                borderRadius: 2,
                backgroundColor: alpha(primaryRedColor, 0.05), // ✅ Màu đỏ
                border: `1px solid ${alpha(primaryRedColor, 0.1)}` // ✅ Màu đỏ
              }}
            >
              <Typography 
                variant="h5" 
                fontWeight={800}
                sx={{ 
                  color: primaryRedColor, // ✅ Màu đỏ
                  mb: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.5
                }}
              >
                <Opacity sx={{ fontSize: '20px' }} />
                {donor.totalVolumesDonated}
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                ml đã hiến
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Additional Info */}
        <Stack spacing={1} sx={{ mb: 2 }}>
          {/* Last Donation */}
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Schedule sx={{ fontSize: '16px', mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
                Lần hiến cuối:
              </Typography>
            </Box>
            <Typography variant="body2" fontWeight={600} fontSize="0.8rem">
              {formatDate(donor.lastDonationDate)}
            </Typography>
          </Box>

          {/* Distance */}
          {/* {donor.distance !== undefined && (
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <LocationOn sx={{ fontSize: '16px', mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
                  Khoảng cách:
                </Typography>
              </Box>
              <Chip
                label={`${donor.distance.toFixed(1)} km`}
                size="small"
                variant="outlined"
                sx={{ 
                  height: 20, 
                  fontSize: '0.7rem',
                  backgroundColor: alpha(primaryRedColor, 0.1), // ✅ Màu đỏ
                  borderColor: alpha(primaryRedColor, 0.3), // ✅ Màu đỏ
                  color: primaryRedColor // ✅ Màu đỏ
                }}
              />
            </Box>
          )} */}
        </Stack>

        <Divider sx={{ my: 2, opacity: 0.3 }} />

        {/* Contact Info */}
        <Stack spacing={1}>
          <Box display="flex" alignItems="center">
            <Phone sx={{ fontSize: '14px', mr: 1, color: primaryRedColor }} /> {/* ✅ Màu đỏ */}
            <Typography variant="body2" fontSize="0.8rem" fontWeight={500}>
              {donor.phone}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Email sx={{ fontSize: '14px', mr: 1, color: primaryRedColor }} /> {/* ✅ Màu đỏ */}
            <Typography 
              variant="body2" 
              fontSize="0.8rem" 
              sx={{ 
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {donor.email}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      {/* Action Section */}
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={() => handleContact(donor)}
          disabled={!donor.isActive}
          endIcon={<CallMade />}
          sx={{
            borderRadius: 3,
            py: 1.5,
            fontWeight: 700,
            fontSize: '0.95rem',
            textTransform: 'none',
            background: donor.isActive
              ? `linear-gradient(135deg, ${primaryRedColor}, ${alpha(primaryRedColor, 0.8)})` // ✅ Màu đỏ
              : 'linear-gradient(135deg, #e5e7eb, #d1d5db)',
            boxShadow: donor.isActive 
              ? `0 4px 16px ${alpha(primaryRedColor, 0.3)}` // ✅ Màu đỏ
              : 'none',
            '&:hover': {
              background: donor.isActive
                ? `linear-gradient(135deg, ${alpha(primaryRedColor, 0.9)}, ${primaryRedColor})` // ✅ Màu đỏ
                : undefined,
              transform: 'translateY(-2px)',
              boxShadow: donor.isActive 
                ? `0 8px 24px ${alpha(primaryRedColor, 0.4)}` // ✅ Màu đỏ
                : 'none'
            },
            '&:disabled': {
              color: '#9ca3af',
              background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)'
            }
          }}
        >
          {donor.isActive ? 'Liên hệ ngay' : 'Không khả dụng'}
        </Button>
      </CardActions>

      {/* ID Badge */}
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 12,
          color: 'text.disabled',
          fontSize: '0.7rem',
          fontWeight: 600,
          background: alpha(theme.palette.background.paper, 0.8),
          px: 1,
          py: 0.5,
          borderRadius: 1,
          backdropFilter: 'blur(4px)'
        }}
      >
        #{donor.userID}
      </Typography>
    </Card>
  );
};

export default DonorCard;
