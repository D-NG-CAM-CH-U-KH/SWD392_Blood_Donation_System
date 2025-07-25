import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Alert, AlertTitle, Paper, Card, CardContent, 
  Skeleton, Button, Grid, Chip, Avatar 
} from '@mui/material';
import { 
  AccountCircle, Refresh, CheckCircle, Warning, Bloodtype, 
  PhoneAndroid, AlternateEmail, CalendarMonth, PersonPin,
  VerifiedUser, ContactPage, BadgeOutlined, Favorite,
  MedicalServices, HealthAndSafety, LocalHospital
} from '@mui/icons-material';
import PrivateAPI from '../../../../api/private-api';
import { GetUserResponseDTO } from '../../../../dtos/response/Users/user-response.dto';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  bloodType?: string;
  dateOfBirth: string;
  roles: string[];
  isActive: boolean;
}

const StepPersonalInfo: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function để convert API response
  const mapUserResponse = (response: GetUserResponseDTO): User => {
    return {
      id: response.userID,
      name: `${response.firstName} ${response.lastName}`,
      email: response.email,
      phone: response.phone,
      gender: response.gender ? 'female' : 'male',
      bloodType: response.bloodGroupName,
      dateOfBirth: response.dateOfBirth,
      roles: response.roles,
      isActive: response.isActive
    };
  };

  // Fetch user data
  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await PrivateAPI.getUserByToken();
      setUser(mapUserResponse(userData));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải thông tin người dùng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Check eligibility based on basic criteria
  const checkBasicEligibility = (user: User) => {
    const age = calculateAge(user.dateOfBirth);
    const issues: string[] = [];
    
    if (age < 18 || age > 60) {
      issues.push(`Tuổi ${age} không phù hợp (yêu cầu 18-60 tuổi)`);
    }
    
    if (!user.isActive) {
      issues.push('Tài khoản chưa được kích hoạt');
    }
    
    return {
      isEligible: issues.length === 0,
      issues
    };
  };

  // Loading state
  if (loading) {
    return (
      <Box textAlign="center">
        <Skeleton variant="circular" width={80} height={80} sx={{ mx: 'auto', mb: 2 }} />
        <Skeleton variant="text" width={300} height={40} sx={{ mx: 'auto', mb: 1 }} />
        <Skeleton variant="text" width={400} height={24} sx={{ mx: 'auto', mb: 3 }} />
        <Skeleton variant="rectangular" width="100%" height={150} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Box>
    );
  }

  // Error state
  if (error || !user) {
    return (
      <Box textAlign="center">
        <MedicalServices sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
        <Typography variant="h5" color="error.main" gutterBottom>
          Lỗi tải thông tin
        </Typography>
        <Typography color="text.secondary" paragraph>
          {error || 'Không thể tải thông tin người dùng'}
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Refresh />}
          onClick={fetchUserData}
          sx={{ mt: 2 }}
        >
          Thử lại
        </Button>
      </Box>
    );
  }

  const eligibility = checkBasicEligibility(user);
  const age = calculateAge(user.dateOfBirth);

  return (
    <Box>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Avatar sx={{ 
          width: 80, 
          height: 80, 
          mx: 'auto', 
          mb: 2,
          background: 'linear-gradient(135deg, #d32f2f, #f44336)'
        }}>
          <ContactPage sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
          Thông tin cá nhân
        </Typography>
        <Typography color="text.secondary" paragraph>
          Xác nhận thông tin cá nhân của bạn trước khi đăng ký hiến máu
        </Typography>
      </Box>

      {/* Basic Requirements Alert */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HealthAndSafety fontSize="small" />
          Điều kiện cơ bản để hiến máu
        </AlertTitle>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>Tuổi từ 18-60, cân nặng tối thiểu 45kg</li>
          <li>Khoảng cách giữa 2 lần hiến máu: Nam 56 ngày, Nữ 84 ngày</li>
          <li>Sức khỏe tốt, không mắc bệnh truyền nhiễm</li>
          <li>Mang theo CMND/CCCD khi đến hiến máu</li>
          <li>Không uống rượu bia 24h trước khi hiến máu</li>
        </ul>
      </Alert>

      {/* Eligibility Status */}
      <Alert 
        severity={eligibility.isEligible ? 'success' : 'warning'} 
        sx={{ mb: 3 }}
        icon={eligibility.isEligible ? <VerifiedUser /> : <Warning />}
      >
        <AlertTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {eligibility.isEligible ? 'Đủ điều kiện cơ bản' : 'Cần kiểm tra thêm'}
        </AlertTitle>
        {eligibility.isEligible ? (
          <Typography>
            Bạn đáp ứng các điều kiện cơ bản để hiến máu. Hãy tiếp tục với bước khám sức khỏe.
          </Typography>
        ) : (
          <Box>
            <Typography gutterBottom>Các vấn đề cần lưu ý:</Typography>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {eligibility.issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </Box>
        )}
      </Alert>

      {/* User Information Card */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BadgeOutlined color="primary" />
              Thông tin của bạn
            </Typography>
            <Button 
              size="small" 
              startIcon={<Refresh />}
              onClick={fetchUserData}
              variant="outlined"
            >
              Cập nhật
            </Button>
          </Box>

          <Grid container spacing={3}>
            {/* Basic Info */}
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <AccountCircle sx={{ color: '#1976d2', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Họ và tên
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {user.name}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #fff3e0, #ffcc02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CalendarMonth sx={{ color: '#f57c00', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Tuổi
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {age} tuổi ({user.gender === 'male' ? 'Nam' : 'Nữ'})
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #f3e5f5, #e1bee7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <PhoneAndroid sx={{ color: '#7b1fa2', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Số điện thoại
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {user.phone}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <AlternateEmail sx={{ color: '#388e3c', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {user.email}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Blood Type Highlight */}
            <Grid item xs={12}>
              <Box 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                sx={{
                  background: 'linear-gradient(135deg, #ffebee, #ffcdd2)',
                  borderRadius: 3,
                  p: 3,
                  border: '2px solid #f44336'
                }}
              >
                <Favorite sx={{ color: '#d32f2f', fontSize: 32, mr: 2 }} />
                <Box textAlign="center">
                  <Typography variant="caption" color="text.secondary">
                    Nhóm máu của bạn
                  </Typography>
                  <Typography variant="h4" fontWeight={800} color="primary.main">
                    {user.bloodType || 'Chưa xác định'}
                  </Typography>
                  {!user.bloodType && (
                    <Typography variant="caption" color="error.main">
                      Vui lòng cập nhật nhóm máu trong hồ sơ
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Paper sx={{ p: 3, bgcolor: 'grey.50', textAlign: 'center' }}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={2}>
          <LocalHospital color="primary" />
          <Typography variant="h6" gutterBottom>
            Lưu ý quan trọng
          </Typography>
        </Box>
        <Typography color="text.secondary" paragraph>
          Thông tin cá nhân được lấy từ tài khoản đăng nhập của bạn. 
          Nếu có thay đổi, vui lòng cập nhật trong phần hồ sơ cá nhân.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bước tiếp theo sẽ kiểm tra tình trạng sức khỏe để đảm bảo an toàn cho việc hiến máu.
        </Typography>
      </Paper>
    </Box>
  );
};

export default StepPersonalInfo;
