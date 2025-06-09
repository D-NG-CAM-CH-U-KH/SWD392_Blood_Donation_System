import React, { useState } from 'react';
import { Box, Typography, TextField as MuiTextField, Button, Divider, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TextField from '~/components/TextField';
import InfoIcon from "@mui/icons-material/Info";
import AppTextField from '~/components/TextField'
import { BLACK_COLOR, RED_600, RED_700 } from '~/theme'
import FormTextField from '~/components/FormTextField';
import FormSelector from '~/components/FormSelector';


const genderSelectors = [
  { name: 'Male', value: 1 },
  { name: 'Female', value: 2 },
]

function SignUp_Profile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    citizenID: '',
    phone: '',
    gender: '',
    city: '',
    district: '',
    ward: '',
    houseNumber: '',
  });

  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    console.log(e.target.name + ' - ' + e.target.value)
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setSubmitMessage('Profile submitted!');
    // For real use, replace with your API call
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        pb: '65%',
        backgroundSize: '150%',
        backgroundPosition: '0 5%',
        position: 'relative',
        mb: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography sx={{ fontSize: 45, textAlign: 'center', color: BLACK_COLOR }}>
          Create User <span style={{ color: RED_700, fontWeight: 'bold' }}>Profile</span>
        </Typography>

        <FormTextField valueName={'citizenID'} value={form.citizenID} onChange={handleChange} />
        <FormTextField valueName={'firstName'} value={form.firstName} onChange={handleChange} />
        <FormTextField valueName={'lastName'} value={form.lastName} onChange={handleChange} />
        <FormTextField valueName={'email'} value={form.email} onChange={handleChange} />
        <FormTextField valueName={'phone'} value={form.phone} onChange={handleChange} />
        <FormSelector valueName={'gender'} value={form.gender} onChange={handleChange} selectors={genderSelectors} />

      </Box>

      {/* Login submit */}
      <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" sx={{
          borderRadius: '15px',
          bgcolor: RED_600,
          height: '60px',
          width: '560px',
          fontSize: 16,
          boxShadow: 'none',
          gap: 2,
          color: '#fff'
        }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default SignUp_Profile;
