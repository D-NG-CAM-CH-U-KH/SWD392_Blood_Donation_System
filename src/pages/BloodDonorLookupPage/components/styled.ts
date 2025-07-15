import { Card, Chip, styled, keyframes } from '@mui/material';
import { shouldForwardProp } from '@mui/system';

export const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8]
  },
  borderRadius: 12,
  overflow: 'hidden'
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  borderRadius: 20
}));

interface BloodTypeChipProps {
  bloodtype: string;
}
export const BloodTypeChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'bloodtype',
})<BloodTypeChipProps>(({ bloodtype }) => ({
  backgroundColor: 
    bloodtype === 'O-' ? '#ff1744' :
    bloodtype === 'O+' ? '#ff5722' :
    bloodtype === 'A-' ? '#e91e63' :
    bloodtype === 'A+' ? '#9c27b0' :
    bloodtype === 'B-' ? '#3f51b5' :
    bloodtype === 'B+' ? '#2196f3' :
    bloodtype === 'AB-' ? '#00bcd4' :
    bloodtype === 'AB+' ? '#009688' : '#757575',
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '1.1rem',
  padding: '8px 20px',
  minWidth: 80,
  height: 40,
  borderRadius: 24
}));

export const EmergencyCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ff1744 0%, #d32f2f 100%)',
  color: '#ffffff',
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.02)' },
    '100%': { transform: 'scale(1)' }
  }
})); 