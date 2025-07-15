import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Box,
  TextField,
  Button,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
  GetApp as DownloadIcon,
} from '@mui/icons-material';

// Mock data for donations
const donationsData = [
  {
    id: 'DON-001',
    donorName: 'John Smith',
    bloodType: 'O+',
    donationDate: '2024-02-15',
    location: 'City Hospital',
    volume: 450,
    status: 'Completed',
    testResults: 'Passed',
    expiryDate: '2024-08-15',
  },
  {
    id: 'DON-002',
    donorName: 'Emily Johnson',
    bloodType: 'A+',
    donationDate: '2024-02-14',
    location: 'Blood Bank Center',
    volume: 450,
    status: 'Processing',
    testResults: 'Pending',
    expiryDate: '2024-08-14',
  },
  {
    id: 'DON-003',
    donorName: 'Michael Brown',
    bloodType: 'B-',
    donationDate: '2024-02-13',
    location: 'Mobile Unit #1',
    volume: 450,
    status: 'Completed',
    testResults: 'Passed',
    expiryDate: '2024-08-13',
  },
  {
    id: 'DON-004',
    donorName: 'Sarah Davis',
    bloodType: 'AB+',
    donationDate: '2024-02-12',
    location: 'University Campus',
    volume: 450,
    status: 'Completed',
    testResults: 'Passed',
    expiryDate: '2024-08-12',
  },
  {
    id: 'DON-005',
    donorName: 'David Wilson',
    bloodType: 'O-',
    donationDate: '2024-02-11',
    location: 'City Hospital',
    volume: 450,
    status: 'Rejected',
    testResults: 'Failed',
    expiryDate: '-',
  },
];

const DonationsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [donations] = useState(donationsData);

  const filteredDonations = donations.filter(donation =>
    donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Processing': return 'warning';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  const getTestResultsColor = (result: string) => {
    switch (result) {
      case 'Passed': return 'success';
      case 'Failed': return 'error';
      case 'Pending': return 'warning';
      default: return 'default';
    }
  };

  const getBloodTypeColor = (bloodType: string) => {
    const colors: { [key: string]: string } = {
      'O+': '#ff5722', 'O-': '#f44336',
      'A+': '#2196f3', 'A-': '#3f51b5',
      'B+': '#4caf50', 'B-': '#8bc34a',
      'AB+': '#ff9800', 'AB-': '#ffc107',
    };
    return colors[bloodType] || '#9e9e9e';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Blood Donations
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#dc004e',
            '&:hover': { backgroundColor: '#b71c1c' },
          }}
        >
          Record New Donation
        </Button>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Search donations..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
          }}
          sx={{ minWidth: 300 }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Donation ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Donor</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Blood Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Volume (ml)</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Test Results</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Expiry Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDonations.map((donation) => (
              <TableRow key={donation.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                    {donation.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{
                      backgroundColor: getBloodTypeColor(donation.bloodType),
                      width: 32,
                      height: 32,
                      fontSize: '0.8rem'
                    }}>
                      {donation.donorName.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Typography variant="body2">{donation.donorName}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={donation.bloodType}
                    size="small"
                    sx={{
                      backgroundColor: getBloodTypeColor(donation.bloodType),
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                </TableCell>
                <TableCell>{donation.donationDate}</TableCell>
                <TableCell>{donation.location}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {donation.volume} ml
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={donation.status}
                    color={getStatusColor(donation.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={donation.testResults}
                    color={getTestResultsColor(donation.testResults) as any}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{donation.expiryDate}</TableCell>
                <TableCell>
                  <IconButton size="small" sx={{ color: '#1976d2' }}>
                    <ViewIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: '#2e7d32' }}>
                    <DownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DonationsTable;