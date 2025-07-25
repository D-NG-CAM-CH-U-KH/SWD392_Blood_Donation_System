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
  IconButton,
  Avatar,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

// Mock data for blood requests
const requestsData = [
  {
    id: 'REQ-001',
    hospitalName: 'City General Hospital',
    contactPerson: 'Dr. Michael Chen',
    bloodType: 'O-',
    unitsRequested: 4,
    urgencyLevel: 'Critical',
    requestDate: '2024-02-15',
    requiredBy: '2024-02-16',
    status: 'Pending',
    reason: 'Emergency Surgery',
    patientAge: 45,
    patientGender: 'Male',
  },
  {
    id: 'REQ-002',
    hospitalName: 'St. Mary\'s Medical Center',
    contactPerson: 'Dr. Sarah Wilson',
    bloodType: 'A+',
    unitsRequested: 2,
    urgencyLevel: 'High',
    requestDate: '2024-02-14',
    requiredBy: '2024-02-17',
    status: 'Approved',
    reason: 'Scheduled Surgery',
    patientAge: 32,
    patientGender: 'Female',
  },
  {
    id: 'REQ-003',
    hospitalName: 'Children\'s Hospital',
    contactPerson: 'Dr. James Rodriguez',
    bloodType: 'B+',
    unitsRequested: 1,
    urgencyLevel: 'Medium',
    requestDate: '2024-02-13',
    requiredBy: '2024-02-18',
    status: 'Fulfilled',
    reason: 'Pediatric Treatment',
    patientAge: 8,
    patientGender: 'Male',
  },
  {
    id: 'REQ-004',
    hospitalName: 'University Medical Center',
    contactPerson: 'Dr. Lisa Thompson',
    bloodType: 'AB-',
    unitsRequested: 3,
    urgencyLevel: 'Critical',
    requestDate: '2024-02-12',
    requiredBy: '2024-02-13',
    status: 'Rejected',
    reason: 'Trauma Case',
    patientAge: 28,
    patientGender: 'Female',
  },
  {
    id: 'REQ-005',
    hospitalName: 'Regional Blood Center',
    contactPerson: 'Dr. Robert Kim',
    bloodType: 'O+',
    unitsRequested: 6,
    urgencyLevel: 'High',
    requestDate: '2024-02-11',
    requiredBy: '2024-02-15',
    status: 'Pending',
    reason: 'Multiple Transfusions',
    patientAge: 55,
    patientGender: 'Male',
  },
];

const RequestsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [requests] = useState(requestsData);

  const filteredRequests = requests.filter(request =>
    request.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.bloodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'Approved': return 'info';
      case 'Fulfilled': return 'success';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return '#d32f2f';
      case 'High': return '#ff9800';
      case 'Medium': return '#2196f3';
      case 'Low': return '#4caf50';
      default: return '#9e9e9e';
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
          Blood Requests
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          New Request
        </Button>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Search requests..."
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
              <TableCell sx={{ fontWeight: 'bold' }}>Request ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Hospital</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Blood Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Units</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Urgency</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Required By</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Patient Info</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                    {request.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {request.hospitalName}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {request.contactPerson}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={request.bloodType}
                    size="small"
                    sx={{
                      backgroundColor: getBloodTypeColor(request.bloodType),
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {request.unitsRequested} units
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={request.urgencyLevel}
                    size="small"
                    sx={{
                      backgroundColor: getUrgencyColor(request.urgencyLevel),
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{request.requiredBy}</Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem' }}>
                      {request.patientGender === 'Male' ? 'M' : 'F'}
                    </Avatar>
                    <Box>
                      <Typography variant="caption">
                        Age: {request.patientAge}
                      </Typography>
                      <br />
                      <Typography variant="caption" color="textSecondary">
                        {request.reason}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={request.status}
                    color={getStatusColor(request.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton size="small" sx={{ color: '#1976d2' }}>
                      <ViewIcon />
                    </IconButton>
                    {request.status === 'Pending' && (
                      <>
                        <IconButton size="small" sx={{ color: '#2e7d32' }}>
                          <ApproveIcon />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#d32f2f' }}>
                          <RejectIcon />
                        </IconButton>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RequestsTable;