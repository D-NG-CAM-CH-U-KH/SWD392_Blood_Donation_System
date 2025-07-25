import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BLACK_COLOR, RED_600, RED_700 } from '~/theme'
import FormTextField from '~/components/FormTextField';
import FormSelector from '~/components/FormSelector';
import { MuiTelInput } from 'mui-tel-input';
import provinces from '~/meta-data/json/tinh_tp.json';
import districts from '~/meta-data/json/quan_huyen.json';
import wards from '~/meta-data/json/xa_phuong.json';
import { toast } from 'react-toastify';
import PublicAPI from '~/api/public-api';

const genderSelectors = [
  { name: 'Male', value: 1 },
  { name: 'Female', value: 0 },
]

const SignUp_Profile = forwardRef(({ signUpForm, setSignUpForm }, ref) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const provinceOptions = Object.entries(provinces).map(([code, obj]) => ({
    value: code,
    name: obj.name,
  }));

  const districtOptions = Object.entries(districts)
    .filter(([_, d]) => d.parent_code === signUpForm.city)
    .map(([code, obj]) => ({
      value: code,
      name: obj.name,
    }));

  const wardOptions = Object.entries(wards)
    .filter(([_, w]) => w.parent_code === signUpForm.district)
    .map(([code, obj]) => ({
      value: code,
      name: obj.name,
    }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'city' && { district: '', ward: '' }),
      ...(name === 'district' && { ward: '' }),
    }));
  };


  const handlePhoneChange = (value, info) => {
    console.log(info)

    setPhoneNumber(info);
  }

  function isSignUpFormValid(form) {
    return Object.values(form).every(value => value !== null && value !== '');
  }

  const onNext = async () => {
    if (signUpForm.password !== confirmPassword) {
      toast.error("Password and confirmed password are not the same.");
      return false;
    }

    // Clone local để giữ giá trị cập nhật
    const updatedForm = {
      ...signUpForm,
      phone: '0' + phoneNumber.nationalNumber,
    };

    if (!isSignUpFormValid(updatedForm)) {
      toast.error("Some fields are empty!");
      return false;
    }

    try {
      const result = await PublicAPI.signUp(updatedForm);
      return !!result;
    } catch (err) {
      if (!axios.isAxiosError(err)) {
        toast.warning(err.message);
        console.error(err);
      }
      return false;
    }
  };
  // Expose `onNext` to parent via ref
  useImperativeHandle(ref, () => ({
    onNext
  }));

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

        <FormTextField valueName={'citizenID'} value={signUpForm.citizenID} onChange={handleChange} />

        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <FormTextField width='270px' valueName={'firstName'} value={signUpForm.firstName} onChange={handleChange} />
          <FormTextField width='270px' valueName={'lastName'} value={signUpForm.lastName} onChange={handleChange} />
        </Box>

        <FormTextField valueName={'email'} value={signUpForm.email} onChange={handleChange} />
        <FormTextField valueName={'password'} value={signUpForm.password} onChange={handleChange} type='password' />

        <FormTextField valueName={'confirmPassword'} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} type='password' />


        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <FormSelector width='150px' valueName={'gender'} value={signUpForm.gender} onChange={handleChange} selectors={genderSelectors} />

          {/* Phone Number */}
          <Box sx={{ paddingTop: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
              Phone number
              <span style={{ color: 'orange' }}> *</span>
            </Typography>
            <MuiTelInput forceCallingCode defaultCountry="VN" onlyCountries={['VN']} disableDropdown
              value={phoneNumber.nationalNumber} onChange={handlePhoneChange}
              sx={{
                width: '400px',
                marginTop: '10px',
                borderRadius: '15px',
                backgroundColor: 'white',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '15px',
                  height: '60px',
                  '&.Mui-focused fieldset': {
                    borderColor: BLACK_COLOR
                  },
                },
              }
              }
            />
          </Box>

        </Box>


        <Box sx={{ position: 'relative', border: '2px solid #ccc', borderRadius: 2, padding: 2, mt: 2 }}>
          <Box sx={{
            position: 'absolute',
            top: '-12px',
            left: 16,
            backgroundColor: 'white', // Match your signUpForm background
            px: 1,
            fontSize: 14,
            color: 'text.secondary',
          }}>
            Address
          </Box>
          <FormSelector valueName="city" value={signUpForm.city} onChange={handleChange} selectors={provinceOptions} />

          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <FormSelector width='270px' valueName="district" value={signUpForm.district} onChange={handleChange} selectors={districtOptions}
              disabled={signUpForm.city === null || signUpForm.city === ''}
            />
            <FormSelector width='270px' valueName="ward" value={signUpForm.ward} onChange={handleChange} selectors={wardOptions}
              disabled={signUpForm.district === null || signUpForm.district === ''}
            />
          </Box>
          <FormTextField valueName="houseNumber" value={signUpForm.houseNumber} onChange={handleChange}
            disabled={signUpForm.ward === null || signUpForm.ward === ''}
          />

        </Box>
      </Box>
    </Box>
  );
})

export default SignUp_Profile;
