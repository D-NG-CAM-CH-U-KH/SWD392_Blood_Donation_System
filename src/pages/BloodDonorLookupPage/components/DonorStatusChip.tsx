import React from 'react';
import { Chip, Tooltip, keyframes } from '@mui/material';
import { EmergencyShare, CheckCircle, PauseCircle } from '@mui/icons-material';

// Animation for emergency
export const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(211,47,47,0.7); }
  70% { box-shadow: 0 0 0 10px rgba(211,47,47,0); }
  100% { box-shadow: 0 0 0 0 rgba(211,47,47,0); }
`;

function DonorStatusChip({ isEmergency, isAvailable }: { isEmergency: boolean, isAvailable: boolean }) {
  let color: 'error' | 'success' | 'default';
  let icon, label, sx, tooltip;
  if (isEmergency) {
    color = 'error';
    icon = <EmergencyShare />;
    label = 'Khẩn cấp';
    tooltip = 'Người này đang cần máu gấp!';
    sx = {
      fontWeight: 700,
      fontSize: '1.1rem',
      minWidth: 120,
      animation: `${pulse} 1.5s infinite`,
      background: '#ffeaea', // pastel red
      color: '#d32f2f',
      border: '2px solid #d32f2f',
      boxShadow: '0 2px 8px rgba(211,47,47,0.08)',
    };
  } else if (isAvailable) {
    color = 'success';
    icon = <CheckCircle />;
    label = 'Sẵn sàng';
    tooltip = 'Người này sẵn sàng hiến máu';
    sx = {
      fontWeight: 700,
      fontSize: '1.1rem',
      minWidth: 120,
      background: '#e8f5e9', // pastel green
      color: '#388e3c',
      border: '2px solid #388e3c',
      boxShadow: '0 2px 8px rgba(56,142,60,0.08)',
    };
  } else {
    color = 'default';
    icon = <PauseCircle />;
    label = 'Chưa sẵn sàng';
    tooltip = 'Người này chưa sẵn sàng hiến máu';
    sx = {
      fontWeight: 700,
      fontSize: '1.1rem',
      minWidth: 120,
      background: '#f5f5f5', // pastel gray
      color: '#757575',
      border: '2px solid #bdbdbd',
      boxShadow: '0 2px 8px rgba(117,117,117,0.08)',
    };
  }
  return (
    <Tooltip title={tooltip} arrow>
      <Chip
        icon={icon}
        label={label}
        color={color}
        sx={{
          ...sx,
          borderRadius: 2,
          px: 2,
        }}
      />
    </Tooltip>
  );
}

export default DonorStatusChip; 