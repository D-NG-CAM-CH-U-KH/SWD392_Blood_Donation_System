import React from 'react';
import { Chip, Tooltip, keyframes } from '@mui/material';
import { 
  EmergencyShare, 
  CheckCircle, 
  PauseCircle,
  LocalHospital 
} from '@mui/icons-material';

// Enhanced animations
const emergencyPulse = keyframes`
  0% { 
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(211,47,47,0.7);
  }
  50% { 
    transform: scale(1.05);
    box-shadow: 0 0 0 8px rgba(211,47,47,0.3);
  }
  100% { 
    transform: scale(1);
    box-shadow: 0 0 0 16px rgba(211,47,47,0);
  }
`;

const availableGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 8px rgba(76,175,80,0.3);
  }
  50% { 
    box-shadow: 0 0 16px rgba(76,175,80,0.6);
  }
`;

function DonorStatusChip({ 
  isEmergency, 
  isAvailable 
}: { 
  isEmergency: boolean;
  isAvailable: boolean;
}) {
  if (isEmergency) {
    return (
      <Tooltip title="Cần máu khẩn cấp!" arrow>
        <Chip
          icon={<EmergencyShare sx={{ fontSize: '18px', fontFamily: 'Roboto, Arial, Helvetica Neue, sans-serif', }} />}
          label="KHẨN CẤP"
          sx={{
            background: 'linear-gradient(135deg, #d32f2f, #f44336)',
            color: 'white',
            fontWeight: 800,
            fontSize: '0.9rem',
            fontFamily: 'Roboto, Arial, Helvetica Neue, sans-serif',
            borderRadius: 2.5,
            px: 2,
            py: 0.5,
            animation: `${emergencyPulse} 1.5s infinite`,
            boxShadow: '0 4px 16px rgba(211,47,47,0.3)',
            border: '2px solid rgba(255,255,255,0.3)'
          }}
        />
      </Tooltip>
    );
  }

  if (isAvailable) {
    return (
      <Tooltip title="Sẵn sàng hiến máu" arrow>
        <Chip
          icon={<CheckCircle sx={{ fontSize: '18px' }} />}
          label="SẴN SÀNG"
          sx={{
            background: 'linear-gradient(135deg, #4caf50, #66bb6a)',
            color: 'white',
            fontWeight: 800,
            fontSize: '0.9rem',
            fontFamily: 'Roboto, Arial, Helvetica Neue, sans-serif',
            borderRadius: 2.5,
            px: 2,
            py: 0.5,
            animation: `${availableGlow} 2s infinite`,
            border: '2px solid rgba(255,255,255,0.3)'
          }}
        />
      </Tooltip>
    );
  }

  return (
    <Tooltip title="Hiện tại chưa sẵn sàng" arrow>
      <Chip
        icon={<PauseCircle sx={{ fontSize: '18px' }} />}
        label="CHƯA SẴN SÀNG"
        sx={{
          background: 'linear-gradient(135deg, #9e9e9e, #bdbdbd)',
          color: 'white',
          fontWeight: 700,
          fontSize: '0.85rem',
          fontFamily: 'Roboto, Arial, Helvetica Neue, sans-serif',
          borderRadius: 2.5,
          px: 2,
          py: 0.5,
          border: '2px solid rgba(255,255,255,0.3)',
          opacity: 0.8
        }}
      />
    </Tooltip>
  );
}

export default DonorStatusChip;