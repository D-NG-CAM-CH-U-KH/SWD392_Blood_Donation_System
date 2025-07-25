import React from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Alert, AlertTitle,
  Divider, Avatar, Chip, Paper, List, ListItem, ListItemIcon,
  ListItemText, Badge
} from '@mui/material';
import {
  CheckCircle, CalendarToday, Person, AccessTime, LocationOn,
  LocalHospital, BloodtypeOutlined, Phone, Email, StickyNote2,
  HealthAndSafety, Assignment, Verified, Info, Warning, Emergency
} from '@mui/icons-material';

interface StepConfirmationProps {
  selectedDate: string;
  selectedTimeSlot: string;
  note: string;
  location: string;
  formData?: any;
  currentUser?: any;
  // ✅ Thêm props mới
  selectedDonationScheduleId?: number | null;
  bloodVolume?: number;
  isBloodRequestMode?: boolean;
  bloodRequest?: any;
}

// ✅ Thêm BLOOD_GROUP_MAP constant
const BLOOD_GROUP_MAP: Record<number, string> = {
  1: 'A+', 2: 'A-', 3: 'B+', 4: 'B-', 
  5: 'AB+', 6: 'AB-', 7: 'O+', 8: 'O-'
};

const StepConfirmation: React.FC<StepConfirmationProps> = ({
  selectedDate, 
  selectedTimeSlot, 
  note, 
  location, 
  formData, 
  currentUser,
  // ✅ Nhận tất cả props
  selectedDonationScheduleId,
  bloodVolume,
  isBloodRequestMode = false,
  bloodRequest
}) => {
  // Format date với đầy đủ thông tin
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      fullDate: date.toLocaleDateString('vi-VN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      dayOfWeek: date.toLocaleDateString('vi-VN', { weekday: 'long' }),
      shortDate: date.toLocaleDateString('vi-VN')
    };
  };

  const dateInfo = selectedDate ? formatDate(selectedDate) : null;

  // Get health summary từ form data
  const getHealthSummary = () => {
    if (!formData) return { safe: true, issues: 0, details: [] };
    
    const issues = [];
    const fields = [
      'dangerousIllness', 'twelveMonthProblem', 'sixMonthProblem',
      'oneMonthProblem', 'fourteenDayProblem', 'sevenDayProblem', 'womanProblem'
    ];
    
    fields.forEach(field => {
      const values = formData[field] || [];
      if (Array.isArray(values)) {
        values.forEach(value => {
          if (value !== 'Không có' && value !== 'Không áp dụng' && value !== 'Khác') {
            issues.push(value);
          }
        });
      }
    });

    return {
      safe: issues.length === 0,
      issues: issues.length,
      details: issues.slice(0, 3) // Show max 3 issues
    };
  };

  const healthSummary = getHealthSummary();

  return (
    <Box>
      {/* Header với animation */}
      <Box textAlign="center" mb={4}>
        <Badge 
          badgeContent={<CheckCircle sx={{ fontSize: 20, color: 'white' }} />}
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#4caf50',
              borderRadius: '50%',
              width: 32,
              height: 32,
              border: '3px solid white'
            }
          }}
        >
          <Avatar sx={{ 
            width: 80, 
            height: 80, 
            bgcolor: 'primary.main',
            mx: 'auto',
            mb: 2
          }}>
            <Assignment sx={{ fontSize: 40 }} />
          </Avatar>
        </Badge>
        
        <Typography variant="h3" fontWeight={700} color="primary.main" gutterBottom>
          {isBloodRequestMode ? 'Xác nhận đăng ký hiến máu' : 'Xác nhận đăng ký'}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          {isBloodRequestMode 
            ? `Vui lòng xác nhận thông tin để hoàn tất đăng ký hiến máu cho yêu cầu #${bloodRequest?.requestId}`
            : 'Vui lòng kiểm tra kỹ thông tin bên dưới trước khi hoàn tất đăng ký hiến máu tình nguyện'
          }
        </Typography>
      </Box>

      {/* ✅ Thông tin BloodRequest nếu có */}
      {isBloodRequestMode && bloodRequest && (
        <Paper elevation={3} sx={{ mb: 3, overflow: 'hidden' }}>
          <Box sx={{ 
            background: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)',
            p: 3,
            borderBottom: '1px solid #e0e0e0'
          }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Emergency sx={{ color: 'warning.main', fontSize: 28 }} />
              <Typography variant="h5" fontWeight={600}>
                Thông tin yêu cầu hiến máu
              </Typography>
              <Chip 
                label={`#${bloodRequest.requestId}`}
                color="warning" 
                size="small" 
                variant="outlined"
              />
            </Box>
          </Box>
          
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Nhóm máu cần thiết
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <BloodtypeOutlined color="error" />
                  <Typography variant="h6" fontWeight={600} color="error.main">
                    {BLOOD_GROUP_MAP[bloodRequest.bloodGroupId] || 'N/A'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Mức độ khẩn cấp
                </Typography>
                <Typography variant="h6" fontWeight={600} color={bloodRequest.urgencyLevel === 'urgent' ? 'error.main' : 'warning.main'}>
                  {bloodRequest.urgencyLevel === 'urgent' ? 'KHẨN CẤP' : 'Bình thường'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Thể tích cần thiết
                </Typography>
                <Typography variant="h6" fontWeight={600} color="primary.main">
                  {bloodRequest.volume} ml
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Địa điểm yêu cầu
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {bloodRequest.location}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Paper>
      )}

      {/* ✅ Debug Info (có thể xóa trong production) */}
      {process.env.NODE_ENV === 'development' && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Debug Info:</strong><br/>
            Schedule ID: {selectedDonationScheduleId || 'Chưa chọn'}<br/>
            Time Slot: {selectedTimeSlot}<br/>
            Blood Volume: {bloodVolume || 450} ml<br/>
            Date: {selectedDate}<br/>
            BloodRequest Mode: {isBloodRequestMode ? 'Yes' : 'No'}<br/>
            BloodRequest ID: {bloodRequest?.requestId || 'N/A'}
          </Typography>
        </Alert>
      )}

      {/* Thông tin người dùng */}
      <Paper elevation={3} sx={{ mb: 3, overflow: 'hidden' }}>
        <Box sx={{ 
          background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
          p: 3,
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Person sx={{ color: 'primary.main', fontSize: 28 }} />
            <Typography variant="h5" fontWeight={600}>
              Thông tin cá nhân
            </Typography>
            <Chip 
              icon={<Verified />} 
              label="Đã xác thực" 
              color="success" 
              size="small" 
            />
          </Box>
        </Box>
        
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box mb={2}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Họ và tên
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Đang tải...'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box mb={2}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Nhóm máu
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <BloodtypeOutlined color="error" />
                  <Typography variant="h6" fontWeight={600} color="error.main">
                    {currentUser?.bloodGroupName || 'AB+'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box mb={2}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Số điện thoại
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Phone sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body1">
                    {currentUser?.phone || 'Chưa có'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box mb={2}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Email
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Email sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body1">
                    {currentUser?.email || 'Chưa có'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>

      {/* ✅ Thông tin lịch hẹn - Điều chỉnh cho BloodRequest mode */}
      <Paper elevation={3} sx={{ mb: 3, overflow: 'hidden' }}>
        <Box sx={{ 
          background: 'linear-gradient(135deg, #fff3e0 0%, #fce4ec 100%)',
          p: 3,
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Box display="flex" alignItems="center" gap={2}>
            <CalendarToday sx={{ color: 'primary.main', fontSize: 28 }} />
            <Typography variant="h5" fontWeight={600}>
              {isBloodRequestMode ? 'Thông tin cuộc gặp' : 'Thông tin lịch hẹn'}
            </Typography>
            {/* ✅ Hiển thị Schedule ID nếu có và không phải BloodRequest mode */}
            {selectedDonationScheduleId && !isBloodRequestMode && (
              <Chip 
                label={`Schedule ID: ${selectedDonationScheduleId}`}
                color="primary" 
                size="small" 
                variant="outlined"
              />
            )}
            {isBloodRequestMode && (
              <Chip 
                label="Từ yêu cầu hiến máu"
                color="warning" 
                size="small" 
                variant="outlined"
              />
            )}
          </Box>
        </Box>
        
        <CardContent sx={{ p: 0 }}>
          <Grid container>
            <Grid item xs={12} md={3}>
              <Box sx={{ p: 3, textAlign: 'center', borderRight: { md: '1px solid #e0e0e0' } }}>
                <CalendarToday sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {isBloodRequestMode ? 'Ngày cần máu' : 'Ngày hiến máu'}
                </Typography>
                <Typography variant="h6" fontWeight={600} color="primary.main">
                  {dateInfo?.shortDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dateInfo?.dayOfWeek}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Box sx={{ p: 3, textAlign: 'center', borderRight: { md: '1px solid #e0e0e0' } }}>
                <AccessTime sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Khung giờ
                </Typography>
                <Typography variant="h6" fontWeight={600} color="warning.main">
                  {selectedTimeSlot || 'Sẽ liên hệ'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {isBloodRequestMode ? 'Sẽ được xác nhận' : 'Thời gian dự kiến: 30-45 phút'}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Box sx={{ p: 3, textAlign: 'center', borderRight: { md: '1px solid #e0e0e0' } }}>
                <LocationOn sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Địa điểm
                </Typography>
                <Typography variant="h6" fontWeight={600} color="success.main">
                  {location || 'Sẽ được thông báo sau'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {location ? 'Địa điểm đã xác định' : 'Chúng tôi sẽ liên hệ'}
                </Typography>
              </Box>
            </Grid>

            {/* ✅ Cột thứ 4 - Lượng máu hiến */}
            <Grid item xs={12} md={3}>
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <BloodtypeOutlined sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Lượng máu hiến
                </Typography>
                <Typography variant="h6" fontWeight={600} color="error.main">
                  {bloodVolume || 450} ml
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tiêu chuẩn an toàn
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>

      {/* Tình trạng sức khỏe */}
      <Paper elevation={3} sx={{ mb: 3, overflow: 'hidden' }}>
        <Box sx={{ 
          background: healthSummary.safe 
            ? 'linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)'
            : 'linear-gradient(135deg, #fff3e0 0%, #ffeaa7 100%)',
          p: 3,
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Box display="flex" alignItems="center" gap={2}>
            <HealthAndSafety sx={{ 
              color: healthSummary.safe ? 'success.main' : 'warning.main', 
              fontSize: 28 
            }} />
            <Typography variant="h5" fontWeight={600}>
              Tình trạng sức khỏe
            </Typography>
            <Chip 
              label={healthSummary.safe ? 'An toàn' : `${healthSummary.issues} vấn đề`}
              color={healthSummary.safe ? 'success' : 'warning'}
              size="small"
            />
          </Box>
        </Box>
        
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box mb={2}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Lịch sử hiến máu
                </Typography>
                <Typography variant="body1">
                  {formData?.isDonated ? (
                    <>
                      <strong>Đã từng hiến máu</strong>
                      {formData.lastDonationDate && (
                        <><br />Lần cuối: {new Date(formData.lastDonationDate).toLocaleDateString('vi-VN')}</>
                      )}
                    </>
                  ) : (
                    <strong>Lần đầu hiến máu</strong>
                  )}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box mb={2}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Đánh giá tổng quan
                </Typography>
                <Typography variant="body1">
                  {healthSummary.safe ? (
                    <Box display="flex" alignItems="center" gap={1}>
                      <CheckCircle color="success" fontSize="small" />
                      <strong>Đủ điều kiện hiến máu</strong>
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="body2" color="warning.main">
                        <strong>Cần lưu ý:</strong>
                      </Typography>
                      {healthSummary.details.map((issue, idx) => (
                        <Typography key={idx} variant="body2" color="text.secondary">
                          • {issue}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>

      {/* Ghi chú */}
      {note && (
        <Paper elevation={2} sx={{ mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <StickyNote2 sx={{ color: 'info.main', fontSize: 24 }} />
              <Typography variant="h6" fontWeight={600}>
                Ghi chú đặc biệt
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ 
              p: 2, 
              backgroundColor: 'grey.50', 
              borderRadius: 2,
              fontStyle: 'italic'
            }}>
              "{note}"
            </Typography>
          </CardContent>
        </Paper>
      )}

      {/* Hướng dẫn chuẩn bị */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Info />
          Hướng dẫn chuẩn bị trước khi hiến máu
        </AlertTitle>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom color="info.main">
              📋 Giấy tờ cần mang
            </Typography>
            <List dense>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• CMND/CCCD gốc (bắt buộc)" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• Thẻ BHYT (nếu có)" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• Sổ hiến máu (nếu đã có)" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom color="success.main">
              🥗 Chuẩn bị sức khỏe
            </Typography>
            <List dense>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• Ăn no, uống đủ nước trước 2-3 tiếng" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• Ngủ đủ giấc (ít nhất 6 tiếng)" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• Không uống rượu bia trong 24h" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Alert>

      {/* Lưu ý cuối */}
      <Alert severity="warning" sx={{ mb: 3 }}>
        <AlertTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Warning />
          Lưu ý quan trọng
        </AlertTitle>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Chúng tôi sẽ liên hệ với bạn trong vòng 24-48 giờ</strong> để xác nhận lịch hẹn cuối cùng. 
          Vui lòng để ý điện thoại và email. Nếu có thay đổi kế hoạch, hãy liên hệ hotline: 
          <strong style={{ color: '#d32f2f' }}> 1900-1234</strong>
        </Typography>
      </Alert>

      {/* Cảm ơn */}
      <Box textAlign="center" sx={{ 
        p: 4, 
        background: 'linear-gradient(135deg, #fef2f2 0%, #fdf2f8 100%)',
        borderRadius: 3,
        border: '1px solid #fce4ec'
      }}>
        <LocalHospital sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" fontWeight={600} color="primary.main" gutterBottom>
          {isBloodRequestMode 
            ? 'Cảm ơn bạn đã đăng ký giúp đỡ!'
            : 'Cảm ơn bạn đã tham gia hiến máu tình nguyện!'
          }
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {isBloodRequestMode 
            ? 'Hành động tốt bụng của bạn sẽ mang lại hy vọng cho người cần giúp đỡ.'
            : 'Hành động cao đẹp của bạn sẽ mang lại hy vọng và cứu sống nhiều người bệnh.'
          }
        </Typography>
      </Box>
    </Box>
  );
};

export default StepConfirmation;
