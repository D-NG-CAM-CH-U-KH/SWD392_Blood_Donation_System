import React, { useState, useContext } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Chip,
  Avatar,
  Divider,
  Stack,
  Paper,
  IconButton,
  Tooltip,
  Snackbar,
  Alert
} from '@mui/material';
import {
  PersonAdd,
  LocationOn,
  Opacity,
  Schedule,
  Emergency,
  Warning,
  CheckCircle,
  ErrorOutline,
  HourglassEmpty,
  Info,
  FavoriteRounded,
  ShareRounded,
  BookmarkBorderRounded,
  AddCircleOutline
} from '@mui/icons-material';
import BloodDonationRegistrationDialog from './BloodDonationRegistrationDialog';
import CreateBloodRequestDialog from '../components/CreateBloodRequestDialog';

interface RequestType {
  requestId: number;
  requesterId: number;
  matchedDonorId: number | null;
  bloodGroupId: number;
  volume: number;
  urgencyLevel: string;
  neededDate: string;
  status: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  distance?: number;
}

const BLOOD_GROUP_MAP: Record<number, string> = {
  1: 'A+', 2: 'A-', 3: 'B+', 4: 'B-', 
  5: 'AB+', 6: 'AB-', 7: 'O+', 8: 'O-'
};

const STATUS_CONFIG = {
  'Confirmed': { 
    label: 'Đang tìm kiếm', 
    color: '#1976d2', 
    bgColor: '#e3f2fd',
    icon: HourglassEmpty,
    chipColor: 'info' as const
  },
  'Completed': { 
    label: 'Đã hoàn thành', 
    color: '#2e7d32', 
    bgColor: '#e8f5e8',
    icon: CheckCircle,
    chipColor: 'success' as const
  },
  'Rejected': { 
    label: 'Từ chối', 
    color: '#d32f2f', 
    bgColor: '#ffebee',
    icon: ErrorOutline,
    chipColor: 'error' as const
  },
  'Cancelled': { 
    label: 'Đã hủy', 
    color: '#757575', 
    bgColor: '#f5f5f5',
    icon: Info,
    chipColor: 'default' as const
  },
};

const URGENCY_CONFIG = {
  'urgent': {
    label: 'KHẨN CẤP',
    color: '#d32f2f',
    bgColor: '#ffebee',
    icon: Emergency,
    pulse: true
  },
  'normal': {
    label: 'Bình thường',
    color: '#ff9800',
    bgColor: '#fff3e0',
    icon: Warning,
    pulse: false
  }
};

interface RequestCardProps {
  request: RequestType;
  onRegistrationSuccess?: (matchingLog: any) => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ 
  request, 
  onRegistrationSuccess 
}) => {
  const [registrationDialog, setRegistrationDialog] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  });

  // Get current user ID from context or auth
  const currentUserId = 1; // Replace with actual user context

  const bloodType = BLOOD_GROUP_MAP[request.bloodGroupId] || 'N/A';
  const statusInfo = STATUS_CONFIG[request.status] || STATUS_CONFIG['Pending'];
  const urgencyInfo = URGENCY_CONFIG[request.urgencyLevel as keyof typeof URGENCY_CONFIG] || URGENCY_CONFIG['normal'];
  const StatusIcon = statusInfo.icon;
  const UrgencyIcon = urgencyInfo.icon;
  const [openCreateRequestDialog, setOpenCreateRequestDialog] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getBloodTypeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      'O-': '#d32f2f', 'O+': '#f44336',
      'A-': '#7b1fa2', 'A+': '#9c27b0',
      'B-': '#1976d2', 'B+': '#2196f3',
      'AB-': '#388e3c', 'AB+': '#4caf50'
    };
    return colorMap[type] || '#d32f2f';
  };

  const handleRegisterDonation = () => {
    if (request.status === 'Completed') return;
    setRegistrationDialog(true);
  };

  const handleCreateRequestSuccess = () => {
    fetchBloodRequests();
    setTabValue(1);
  };

// Trong RequestCard.tsx
const handleRegistrationSuccess = (result: boolean) => {
  setRegistrationDialog(false);
  setSnackbar({
    open: true,
    message: result 
      ? 'Đăng ký hiến máu thành công! Chúng tôi sẽ liên hệ với bạn sớm.'
      : 'Đăng ký không thành công. Vui lòng thử lại.',
    severity: result ? 'success' : 'warning'
  });
  
  // Call parent callback if provided
  if (onRegistrationSuccess) {
    onRegistrationSuccess(result);
  }
};


  const handleRegistrationError = (error: string) => {
    setSnackbar({
      open: true,
      message: error || 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.',
      severity: 'error'
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setSnackbar({
      open: true,
      message: isBookmarked ? 'Đã bỏ lưu yêu cầu' : 'Đã lưu yêu cầu vào danh sách của bạn',
      severity: 'info'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Yêu cầu hiến máu ${bloodType}`,
        text: `Cần hiến máu ${bloodType} - ${request.volume}ml tại ${request.location}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `Yêu cầu hiến máu ${bloodType} - ${request.volume}ml tại ${request.location}. Link: ${window.location.href}`
      );
      setSnackbar({
        open: true,
        message: 'Đã copy link chia sẻ vào clipboard',
        severity: 'success'
      });
    }
  };

  const isExpired = new Date(request.neededDate) < new Date();
  const isUnavailable = request.status === 'Completed' || request.status === 'Cancelled' || isExpired;

  return (
    <>
    
    {/* <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutline />}
            onClick={() => setOpenCreateRequestDialog(true)}
            sx={{ minWidth: 180, fontWeight: 600 }}
          >
            Tạo Blood Request
          </Button>
        </Box> */}
      <Card
        elevation={0}
        sx={{
          width: 400,
          borderRadius: 4,
          border: '1px solid',
          borderColor: request.urgencyLevel === 'urgent' ? 'error.light' : 'divider',
          background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'visible',
          opacity: isUnavailable ? 0.7 : 1,
          '&:hover': {
            transform: isUnavailable ? 'none' : 'translateY(-8px)',
            boxShadow: isUnavailable ? 'none' : '0 16px 48px rgba(0,0,0,0.12)',
            borderColor: isUnavailable ? 'divider' : 'primary.main',
          }
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            position: 'relative',
            background: `linear-gradient(135deg, ${urgencyInfo.bgColor} 0%, ${urgencyInfo.color}15 100%)`,
            p: 2.5,
            borderRadius: '16px 16px 0 0'
          }}
        >


          {/* Top Row: Urgency Badge + Action Buttons */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Chip
              icon={<UrgencyIcon sx={{ fontSize: '18px' }} />}
              label={urgencyInfo.label}
              sx={{
                background: urgencyInfo.color,
                color: 'white',
                fontWeight: 700,
                fontSize: '0.85rem',
                borderRadius: 2.5,
                px: 1.5,
                animation: urgencyInfo.pulse ? 'pulse 2s infinite' : 'none',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)', boxShadow: `0 0 0 0 ${urgencyInfo.color}40` },
                  '50%': { transform: 'scale(1.05)', boxShadow: `0 0 0 8px ${urgencyInfo.color}20` },
                  '100%': { transform: 'scale(1)', boxShadow: `0 0 0 16px ${urgencyInfo.color}00` }
                }
              }}
            />
            
            <Stack direction="row" spacing={0.5}>
              <Tooltip title={isBookmarked ? "Bỏ lưu" : "Lưu yêu cầu"}>
                <IconButton 
                  size="small" 
                  onClick={handleBookmark}
                  sx={{ 
                    background: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    color: isBookmarked ? 'primary.main' : 'text.secondary',
                    '&:hover': { 
                      background: '#f5f5f5',
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <BookmarkBorderRounded fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Chia sẻ yêu cầu">
                <IconButton 
                  size="small"
                  onClick={handleShare}
                  sx={{ 
                    background: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    color: 'text.secondary',
                    '&:hover': { 
                      background: '#f5f5f5',
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <ShareRounded fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

          {/* Blood Type Avatar */}
          <Box display="flex" justifyContent="center" mb={2}>
            <Paper
              elevation={6}
              sx={{
                borderRadius: '50%',
                p: 0.8,
                background: 'white',
                position: 'relative'
              }}
            >
              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  background: `linear-gradient(135deg, ${getBloodTypeColor(bloodType)}, ${getBloodTypeColor(bloodType)}cc)`,
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  color: 'white',
                  border: '4px solid white',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  position: 'relative'
                }}
              >
                {bloodType}
              </Avatar>
              
              {/* Urgency indicator ring */}
              {request.urgencyLevel === 'urgent' && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -4,
                    left: -4,
                    right: -4,
                    bottom: -4,
                    borderRadius: '50%',
                    border: `3px solid ${urgencyInfo.color}`,
                    animation: 'pulse-ring 2s infinite',
                    '@keyframes pulse-ring': {
                      '0%': { transform: 'scale(1)', opacity: 0.8 },
                      '50%': { transform: 'scale(1.1)', opacity: 0.4 },
                      '100%': { transform: 'scale(1)', opacity: 0.8 }
                    }
                  }}
                />
              )}
            </Paper>
          </Box>

          {/* Status Chip */}
          <Box display="flex" justifyContent="center">
            <Chip
              icon={<StatusIcon sx={{ fontSize: '16px' }} />}
              label={statusInfo.label}
              size="small"
              sx={{
                background: statusInfo.bgColor,
                color: statusInfo.color,
                fontWeight: 600,
                border: `1px solid ${statusInfo.color}40`,
                borderRadius: 2.5,
                px: 1
              }}
            />
          </Box>
        </Box>

        {/* Content Section */}
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={2.5}>
            {/* Volume Requirement */}
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  background: 'linear-gradient(135deg, #ffebee, #ffcdd2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Opacity sx={{ color: '#d32f2f', fontSize: 22 }} />
              </Box>
              <Box flex={1}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Thể tích cần thiết
                </Typography>
                <Typography variant="h6" fontWeight={700} color="primary.main" sx={{ mt: 0.5 }}>
                  {request.volume} ml
                </Typography>
              </Box>
            </Box>

            {/* Location */}
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <LocationOn sx={{ color: '#1976d2', fontSize: 22 }} />
              </Box>
              <Box flex={1}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Địa điểm hiến máu
                </Typography>
                <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                  {request.location}
                </Typography>
              </Box>
            </Box>

            {/* Needed Date */}
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  background: 'linear-gradient(135deg, #f3e5f5, #e1bee7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Schedule sx={{ color: '#7b1fa2', fontSize: 22 }} />
              </Box>
              <Box flex={1}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Thời gian cần máu
                </Typography>
                <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                  {formatDate(request.neededDate)}
                </Typography>
                {isExpired && (
                  <Typography variant="caption" color="error.main" fontWeight={600}>
                    Đã quá hạn
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Distance (if available) */}
            {request.distance !== undefined && (
              <>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                  <LocationOn sx={{ color: 'text.secondary', fontSize: 18 }} />
                  <Typography variant="body2" color="text.secondary">
                    Cách bạn <Typography component="span" fontWeight={700} color="primary.main">
                      {request.distance} km
                    </Typography>
                  </Typography>
                </Box>
              </>
            )}
          </Stack>
        </CardContent>

                {/* CREATE BLOOD REQUEST DIALOG */}
                <CreateBloodRequestDialog 
          open={openCreateRequestDialog}
          onClose={() => setOpenCreateRequestDialog(false)}
          onSuccess={handleCreateRequestSuccess}
        />

        {/* Action Section */}
        <CardActions sx={{ p: 3, pt: 0 }}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            startIcon={
              isUnavailable ? <CheckCircle /> : <FavoriteRounded />
            }
            disabled={isUnavailable}
            onClick={handleRegisterDonation}
            sx={{
              borderRadius: 3,
              py: 1.8,
              fontWeight: 700,
              fontSize: '1.1rem',
              textTransform: 'none',
              background: isUnavailable
                ? 'linear-gradient(135deg, #e0e0e0, #bdbdbd)'
                : 'linear-gradient(135deg, #d32f2f, #f44336)',
              boxShadow: isUnavailable 
                ? 'none'
                : '0 4px 16px rgba(211,47,47,0.3)',
              '&:hover': {
                background: !isUnavailable 
                  ? 'linear-gradient(135deg, #c62828, #d32f2f)'
                  : undefined,
                transform: !isUnavailable ? 'translateY(-2px)' : 'none',
                boxShadow: !isUnavailable 
                  ? '0 8px 24px rgba(211,47,47,0.4)'
                  : 'none'
              },
              '&:disabled': {
                color: '#757575',
                background: 'linear-gradient(135deg, #f5f5f5, #eeeeee)'
              }
            }}
          >
            {getButtonText()}
          </Button> 
        </CardActions>

        {/* Request ID Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: -10,
            right: -10,
            background: 'linear-gradient(135deg, #424242, #616161)',
            color: 'white',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            border: '2px solid white'
          }}
        >
          #{request.requestId}
        </Box>

        {/* Expired Overlay */}
        {isExpired && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.1)',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1
            }}
          >
            <Paper
              elevation={4}
              sx={{
                px: 3,
                py: 1.5,
                background: 'rgba(255,255,255,0.95)',
                borderRadius: 2
              }}
            >
              <Typography variant="h6" color="error.main" fontWeight={700}>
                ĐÃ HẾT HẠN
              </Typography>
            </Paper>
          </Box>
        )}
      </Card>

      {/* Registration Dialog */}
      <BloodDonationRegistrationDialog
        open={registrationDialog}
        onClose={() => setRegistrationDialog(false)}
        request={request}
        currentUserId={currentUserId}
        onSuccess={handleRegistrationSuccess}
        onError={handleRegistrationError}
      />

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );

  function getButtonText(): string {
    if (isExpired) return 'Đã hết hạn';
    if (request.status === 'Completed') return 'Đã hoàn thành';
    if (request.status === 'Cancelled') return 'Đã hủy';
    return 'Đăng ký hiến máu ngay';
  }
};

export default RequestCard;
