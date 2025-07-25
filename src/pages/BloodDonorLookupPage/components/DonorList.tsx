import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Alert, Typography, Box } from '@mui/material';
import DonorCard from './DonorCard';
import axios from 'axios';

// ✅ Định nghĩa interface DonorType
interface DonorType {
  userID: number;
  fullName: string;
  email: string;
  phone: string;
  bloodGroup: string;
  bloodGroupId?: number;
  gender: string;
  dateOfBirth: string;
  location?: string;
  distance?: number;
  lastDonationDate?: string;
  totalVolumesDonated: number;
  completedAppointmentsCount: number;
  isActive: boolean;
}

interface DonorListProps {
  searchParams?: {
    bloodGroupId?: number;
    minDonations?: number;
  };
}

const DonorList: React.FC<DonorListProps> = ({ searchParams }) => {
  const [donors, setDonors] = useState<DonorType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchDonors();
  }, [searchParams]);

  const fetchDonors = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('ACCESS_TOKEN')?.replaceAll('"', '');
      
      const response = await axios.get('https://localhost:5000/api/v1/account/account/all-with-appointments', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: searchParams
      });
    
      // ✅ Console.log để kiểm tra JSON response
      console.log('📊 API Response JSON:', JSON.stringify(response.data, null, 2));
      console.log('📊 Response data array:', response.data.data);
    
      if (response.data?.is_success) { // ✅ Sửa từ success thành is_success
        setDonors(response.data.data || []);
        console.log('✅ Donors set successfully:', response.data.data);
      } else {
        console.log('❌ API returned is_success=false');
        setError('Không thể tải danh sách người hiến máu');
      }
    } catch (err: any) {
      console.error('❌ Error fetching donors:', err);
      console.error('❌ Error response:', err.response?.data);
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
    
  };

  // ✅ Function với type chính xác
  const handleContact = (donor: DonorType): void => {
    if (donor.phone) {
      window.open(`tel:${donor.phone}`);
    } else {
      alert(`Liên hệ với ${donor.fullName}: ${donor.email}`);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Đang tải danh sách người hiến máu...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (donors.length === 0) {
    return (
      <Alert severity="info">
        Không tìm thấy người hiến máu phù hợp.
      </Alert>
    );
  }

  return (
    <Grid container spacing={3}>
      {donors.map((donor) => (
        <Grid item xs={12} sm={6} md={4} key={donor.userID}>
          <DonorCard donor={donor} handleContact={handleContact} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DonorList;
