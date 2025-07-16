import React, { useState, useEffect } from 'react';
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
  IconButton,
  Box,
  TextField,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import api from '../../configs/axios-api';

const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
const statuses = ['Active', 'Inactive'];

const DonorsTable = () => {
  const [donors, setDonors] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<any | null>(null);

  const mapBloodGroupIdToName = (id: number | null): string => {
    const map: { [key: number]: string } = {
      7: 'O+', 8: 'O-', 1: 'A+', 2: 'A-',
      3: 'B+', 4: 'B-', 5: 'AB+', 6: 'AB-',
    };
    return id && map[id] ? map[id] : 'Unknown';
  };

  const updateDonor = async (donor: any) => {
    try {
      const [firstName, ...rest] = donor.name.split(' ');
      const lastName = rest.join(' ') || '';
      const bloodTypeToId: { [key: string]: number } = {
        'O+': 7, 'O-': 8, 'A+': 1, 'A-': 2,
        'B+': 3, 'B-': 4, 'AB+': 5, 'AB-': 6,
      };

      if (!donor.dateOfBirth) throw new Error("Date of birth is required");

      const payload = {
        firstName,
        lastName,
        email: donor.email,
        phone: donor.phone,
        bloodGroupID: bloodTypeToId[donor.bloodType] || null,
        isActive: donor.status === 'Active',
        dateOfBirth: donor.dateOfBirth,
      };

      const response = await api.put(`/api/v1/account/${donor.id}`, payload);
      console.log('Donor updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to update donor:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await api.get('/api/v1/account/account/all');
        console.log("DATA RESSP: ", response.data)
        const mapped = response.data.data.map((user: any) => ({
          id: user.userID,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone,
          bloodType: user.bloodGroupName || mapBloodGroupIdToName(user.bloodGroupID),
          age: calculateAge(user.dateOfBirth),
          dateOfBirth: user.dateOfBirth,
          status: user.isActive ? 'Active' : 'Inactive',
          totalDonations: user.totalDonations ?? 0,
        }));
        setDonors(mapped);
      } catch (error) {
        console.error('Error fetching donors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  const calculateAge = (dob: string) => {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const handleEditOpen = (donor: any) => {
    setSelectedDonor({ ...donor });
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
    setSelectedDonor(null);
  };

  const handleSave = async () => {
    try {
      await updateDonor(selectedDonor);
      setDonors((prev) => prev.map((d) => (d.id === selectedDonor.id ? selectedDonor : d)));
      handleEditClose();
    } catch (error) {
      alert('Failed to update donor.');
    }
  };

  const handleChange = (field: string, value: any) => {
    setSelectedDonor((prev: any) => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status: string) => status === 'Active' ? 'success' : 'default';

  const getBloodTypeAvatar = (bloodType: string) => {
    const colors: { [key: string]: string } = {
      'O+': '#ff5722', 'O-': '#f44336', 'A+': '#2196f3', 'A-': '#3f51b5',
      'B+': '#4caf50', 'B-': '#8bc34a', 'AB+': '#ff9800', 'AB-': '#ffc107',
    };
    return colors[bloodType] || '#9e9e9e';
  };

  const filteredDonors = donors.filter((donor) =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Typography>Loading donors...</Typography>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Donors Management
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ backgroundColor: '#1976d2' }}>
          Add New Donor
        </Button>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Search donors..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }}
          sx={{ minWidth: 300 }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Donor</strong></TableCell>
              <TableCell><strong>Contact</strong></TableCell>
              <TableCell><strong>Blood Type</strong></TableCell>
              <TableCell><strong>Age</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donors.map((donor) => (
              <TableRow key={donor.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ backgroundColor: getBloodTypeAvatar(donor.bloodType) }}>
                      {donor.name.split(' ').map((n: string) => n[0]).join('')}
                    </Avatar>
                    <Typography>{donor.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography>{donor.email}</Typography>
                  <Typography variant="caption">{donor.phone}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={donor.bloodType}
                    sx={{ backgroundColor: getBloodTypeAvatar(donor.bloodType), color: '#fff' }}
                    size="small"
                  />
                </TableCell>
                <TableCell>{donor.age}</TableCell>
                <TableCell>
                  <Chip label={donor.status} color={getStatusColor(donor.status) as any} size="small" />
                </TableCell>
                <TableCell>
                  <IconButton size="small" sx={{ color: '#1976d2' }} onClick={() => handleEditOpen(donor)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: '#dc004e' }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Donor Information</DialogTitle>
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Full Name" value={selectedDonor?.name || ''} onChange={(e) => handleChange('name', e.target.value)} fullWidth />
          <TextField label="Email" type="email" value={selectedDonor?.email || ''} onChange={(e) => handleChange('email', e.target.value)} fullWidth />
          <TextField label="Phone Number" value={selectedDonor?.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} fullWidth />
          <TextField label="Blood Type" value={selectedDonor?.bloodType || ''} onChange={(e) => handleChange('bloodType', e.target.value)} select fullWidth>
            {bloodTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
          <TextField label="Date of Birth" type="date" value={selectedDonor?.dateOfBirth || ''} onChange={(e) => handleChange('dateOfBirth', e.target.value)} InputLabelProps={{ shrink: true }} fullWidth />
          <TextField label="Status" value={selectedDonor?.status || ''} onChange={(e) => handleChange('status', e.target.value)} select fullWidth>
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleEditClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DonorsTable;