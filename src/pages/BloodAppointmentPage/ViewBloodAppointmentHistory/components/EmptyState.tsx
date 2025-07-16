import React from 'react';
import { Card, Typography, Button } from '@mui/material';
import { History, Add } from '@mui/icons-material';

interface EmptyStateProps {
  onAdd: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAdd }) => (
  <Card sx={{ p: 6, textAlign: 'center' }}>
    <History sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
    <Typography variant="h6" color="text.secondary" gutterBottom>
      Không có cuộc hẹn nào
    </Typography>
    <Typography color="text.secondary" mb={3}>
      Hãy đăng ký hiến máu để bắt đầu hành trình ý nghĩa
    </Typography>
    <Button variant="contained" startIcon={<Add />} onClick={onAdd}>
      Đăng ký ngay
    </Button>
  </Card>
);

export default EmptyState; 