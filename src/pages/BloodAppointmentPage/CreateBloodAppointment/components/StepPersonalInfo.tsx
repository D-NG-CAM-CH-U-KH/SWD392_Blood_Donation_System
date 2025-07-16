import { Box, Typography, Alert, AlertTitle, Paper } from '@mui/material';
import { Person } from '@mui/icons-material';

const StepPersonalInfo: React.FC = () => (
  <Box textAlign="center">
    <Person sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
    <Typography variant="h4" gutterBottom>Thông tin cá nhân</Typography>
    <Typography color="text.secondary" paragraph>Xác nhận thông tin cá nhân của bạn</Typography>
    <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
      <AlertTitle>Lưu ý quan trọng</AlertTitle>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        <li>Tuổi từ 18-60, cân nặng tối thiểu 45kg</li>
        <li>Không hiến máu trong vòng 3 tháng gần đây</li>
        <li>Sức khỏe tốt, không mắc bệnh truyền nhiễm</li>
        <li>Mang theo CMND/CCCD khi đến hiến máu</li>
      </ul>
    </Alert>
    <Alert severity="success" sx={{ mb: 3, textAlign: 'left' }}>
      <Typography><strong>Thông tin của bạn:</strong></Typography>
      <Typography>Nhóm máu: <strong>AB+</strong></Typography>
    </Alert>
    <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
      <Typography color="text.secondary">
        Thông tin cá nhân sẽ được lấy từ tài khoản đăng nhập của bạn
      </Typography>
    </Paper>
  </Box>
);

export default StepPersonalInfo;