import React from 'react';
import { Paper, Typography, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

const bloodTypes = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

const getCompatibilityInfo = (bloodType: string) => {
  const compatibility: { [key: string]: { canDonate: string[]; canReceive: string[] } } = {
    'O-': { canDonate: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], canReceive: ['O-'] },
    'O+': { canDonate: ['O+', 'A+', 'B+', 'AB+'], canReceive: ['O-', 'O+'] },
    'A-': { canDonate: ['A-', 'A+', 'AB-', 'AB+'], canReceive: ['O-', 'A-'] },
    'A+': { canDonate: ['A+', 'AB+'], canReceive: ['O-', 'O+', 'A-', 'A+'] },
    'B-': { canDonate: ['B-', 'B+', 'AB-', 'AB+'], canReceive: ['O-', 'B-'] },
    'B+': { canDonate: ['B+', 'AB+'], canReceive: ['O-', 'O+', 'B-', 'B+'] },
    'AB-': { canDonate: ['AB-', 'AB+'], canReceive: ['O-', 'A-', 'B-', 'AB-'] },
    'AB+': { canDonate: ['AB+'], canReceive: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] }
  };
  return compatibility[bloodType] || { canDonate: [], canReceive: [] };
};

const BloodCompatibilityGuide = () => (
  <TableContainer component={Paper} sx={{ mb: 3, borderRadius: 3, boxShadow: 2, maxWidth: '100%', overflowX: 'auto' }}>
    <Typography variant="h5" fontWeight={700} gutterBottom align="center" sx={{ color: '#d32f2f', pt: 3 }}>
      <InfoOutlined sx={{ mr: 1, verticalAlign: 'middle' }} />
      Hướng dẫn tương thích nhóm máu
    </Typography>
    <Table>
      <TableHead>
        <TableRow sx={{ background: '#f5f5f5' }}>
          <TableCell sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Nhóm máu</TableCell>
          <TableCell sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Có thể hiến cho</TableCell>
          <TableCell sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Có thể nhận từ</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bloodTypes.map((bloodType, idx) => {
          const compatibility = getCompatibilityInfo(bloodType);
          return (
            <TableRow key={bloodType} sx={{ background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
              <TableCell sx={{ fontWeight: 700, fontSize: '1.1rem' }}>{bloodType}</TableCell>
              <TableCell sx={{ fontSize: '1.1rem', fontWeight: 500 }}>{compatibility.canDonate.join(', ')}</TableCell>
              <TableCell sx={{ fontSize: '1.1rem', fontWeight: 500 }}>{compatibility.canReceive.join(', ')}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
);

export default BloodCompatibilityGuide; 