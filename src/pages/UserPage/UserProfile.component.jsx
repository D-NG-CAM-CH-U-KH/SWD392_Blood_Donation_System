import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Box,
  InputLabel,
  FormControl,
  Select,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function UserProfileForm() {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: 'Jimmy Turner',
    country: '',
    location: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const countries = [
    { label: 'All Countries', value: '' },
    { label: 'USA', value: 'USA' },
    { label: 'Vietnam', value: 'Vietnam' },
    { label: 'UK', value: 'UK' },
  ];

  const renderFormSection = (index) => (
    <Box key={index} sx={{ mb: 4 }}>
      <TextField
        fullWidth
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Country</InputLabel>
        <Select
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          label="Country"
        >
          {countries.map((country) => (
            <MenuItem key={country.value} value={country.value}>
              {country.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        margin="normal"
      />
    </Box>
  );

  return (
    <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: 1000}}>
      <Typography variant="h5" fontWeight="bold" color="error" gutterBottom>
        Blood Donation System Management
      </Typography>

      <Grid container spacing={4}>
        {/* Image & Upload */}
        <Grid item xs={12} md={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src={image}
              sx={{ width: 140, height: 140, mb: 2, bgcolor: 'grey.300' }}
            />
            <Button
              variant="contained"
              component="label"
              color="error"
              startIcon={<PhotoCamera />}
            >
              Change image
              <input hidden accept="image/*" type="file" onChange={handleImageChange} />
            </Button>
          </Box>
        </Grid>

        {/* Form Fields */}
        <Grid item xs={12} md={9}>
          {renderFormSection(1)}
          {renderFormSection(2)}

          <Box textAlign="right">
            <Button variant="contained" color="error">
              Change image
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
