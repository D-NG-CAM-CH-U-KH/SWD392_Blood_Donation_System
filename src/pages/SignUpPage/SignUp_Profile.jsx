import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BLACK_COLOR, RED_600, RED_700 } from '~/theme'
import FormTextField from '~/components/FormTextField';
import FormSelector from '~/components/FormSelector';
import { MuiTelInput } from 'mui-tel-input';
import provinces from '~/meta-data/json/tinh_tp.json';
import districts from '~/meta-data/json/quan_huyen.json';
import wards from '~/meta-data/json/xa_phuong.json';

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

  const provinceOptions = Object.entries(provinces).map(([code, obj]) => ({
    value: code,
    name: obj.name,
  }));

  const districtOptions = Object.entries(districts)
    .filter(([_, d]) => d.parent_code === form.city)
    .map(([code, obj]) => ({
      value: code,
      name: obj.name,
    }));

  const wardOptions = Object.entries(wards)
    .filter(([_, w]) => w.parent_code === form.district)
    .map(([code, obj]) => ({
      value: code,
      name: obj.name,
    }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'city' && { district: '', ward: '' }),
      ...(name === 'district' && { ward: '' }),
    }));
  };

  const handlePhoneChange = (value, info) => {
    console.log(info)
    setForm((prevForm) => ({
      ...prevForm,
      phone: info,
    }));
  }


  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        padding: 5,
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
        <FormSelector valueName={'gender'} value={form.gender} onChange={handleChange} selectors={genderSelectors} />

        {/* Phone Number */}
        <Box sx={{ paddingTop: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
            Phone number
            <span style={{ color: 'orange' }}> *</span>
          </Typography>
          <MuiTelInput forceCallingCode defaultCountry="VN" onlyCountries={['VN']} disableDropdown
            value={form.phone.nationalNumber} onChange={handlePhoneChange}
          />
        </Box>

        <Box sx={{ position: 'relative', border: '2px solid #ccc', borderRadius: 2, padding: 2, mt: 2 }}>
          <Box sx={{
            position: 'absolute', 
            top: '-12px',
            left: 16,
            backgroundColor: 'white', // Match your form background
            px: 1,
            fontSize: 14,
            color: 'text.secondary',
          }}>
            Address
          </Box>
          <FormSelector valueName="city" value={form.city} onChange={handleChange} selectors={provinceOptions} />
          <FormSelector valueName="district" value={form.district} onChange={handleChange} selectors={districtOptions} />
          <FormSelector valueName="ward" value={form.ward} onChange={handleChange} selectors={wardOptions} />
          <FormTextField valueName="houseNumber" value={form.houseNumber} onChange={handleChange} />

        </Box>
      </Box>
    </Box>
  );
}

export default SignUp_Profile;
