import { Box, Typography } from '@mui/material';

const FormHeader = () => (
  <Box textAlign="center" mb={4}>
    <Typography variant="h3" gutterBottom>Đăng ký hiến máu</Typography>
    <Typography variant="subtitle1" color="text.secondary">
      Một giọt máu cho đi - Một cuộc đời ở lại
    </Typography>
  </Box>
);

export default FormHeader;