import React from 'react';
import { Paper, Stack, Box, Typography, Avatar, IconButton, Button } from '@mui/material';
import { Bloodtype, Refresh, Add } from '@mui/icons-material';

interface FormHeaderProps {
  onRefresh: () => void;
  onAdd: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ onRefresh, onAdd }) => (
  <Paper sx={{ p: 4, mb: 4, background: '#d32f2f', color: 'white' }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
            <Bloodtype sx={{ fontSize: 32 }} />
          </Avatar>
          Lịch sử hiến máu
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Quản lý và theo dõi hành trình hiến máu của bạn
        </Typography>
      </Box>
      <Stack direction="row" spacing={2}>
        <IconButton onClick={onRefresh} sx={{ color: 'white' }}>
          <Refresh />
        </IconButton>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
          onClick={onAdd}
        >
          Đăng ký mới
        </Button>
      </Stack>
    </Stack>
  </Paper>
);

export default FormHeader; 