import { Alert, Box, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { data, useNavigate } from 'react-router-dom'
import { BLACK_COLOR, RED_600, RED_700 } from '~/theme'
import PublicAPI from '~/api/public-api'
import ErrorIcon from '@mui/icons-material/Error'
import { RoleEnum } from '~/meta-data/enums/role.enum'
import { toast } from 'react-toastify'
import PageEndpoints from '~/meta-data/contants/page-endpoints'
import axios from 'axios'
import AppTextField from '~/components/TextField'

function LoginPage() {
  const navigate = useNavigate()

  const [citizenID, setCitizenID] = useState('');
  const [password, setPassword] = useState('')
  const [loginMess, setLoginMess] = useState('')

  useEffect(() => {
    const isLoginned = localStorage.getItem('token') != null
    if (isLoginned)
      window.location.href = PageEndpoints.PublicEndpoints.HOME_ENDPOINT;
  }, [])

  const handleLogin = async () => {
    setLoginMess('')
    if (!citizenID || !password) {
      setLoginMess('Citizen ID and Password are required');
      return;
    }

    try {
      await PublicAPI.login(citizenID, password, RoleEnum.Member.toString());
      navigate(PageEndpoints.PublicEndpoints.HOME_ENDPOINT);
    } catch (err) {
      if (!axios.isAxiosError(err)) {
        toast.warning(err.message)
        console.log(err)
      }
    }
  }


  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleLogin()
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [citizenID, password])

  return (
    <div>

      {loginMess && (
        <Alert
          severity='error'
          iconMapping={{
            error: <ErrorIcon fontSize="inherit" />
          }}
        >
          {loginMess}
        </Alert>
      )}


      <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px', marginTop: '10px' }}>
          {/* <img src='https://i.etsystatic.com/16221531/r/il/283513/3896651157/il_570xN.3896651157_7xfk.jpg' style={{ objectFit: 'contain', width: '500px', borderRadius: '26px' }} /> */}
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: '40px' }}>
            <Typography sx={{ fontSize: 45, textAlign: 'center', color: BLACK_COLOR }}>
              Welcome to <span style={{ color: RED_700, fontWeight: 'bold' }}>Blood Donation System</span>
            </Typography>
            <Typography sx={{ textAlign: 'center', fontSize: 14, marginTop: '10px' }}>
              Lifesaving. Supportive. Community-driven. At Blood Donation System, we’re committed to making a difference—one donation at a time.<br />
              Our compassionate team works together to ensure every donor has a safe, positive, and meaningful experience while helping save lives.
            </Typography>

            {/* Divider */}
            <Box sx={{ marginTop: '20px' }}>
              <Divider>
                <Typography sx={{ fontSize: 14 }}>Login</Typography>
              </Divider>
            </Box>

            {/* Login using citizen ID + pwd */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Box sx={{ paddingTop: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                  Citizen ID
                  <span style={{ color: 'orange' }}> *</span>
                </Typography>
                <AppTextField
                  placeholder='Enter your citizen ID'
                  value={citizenID}
                  onChange={(e) => setCitizenID(e.target.value)}
                />

              </Box>
              <Box sx={{ paddingTop: '30px' }}>
                <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                  Password
                  <span style={{ color: 'orange' }}> *</span>
                </Typography>
                <AppTextField
                  placeholder='Enter your password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
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
                onClick={handleLogin}
              >
                Login
              </Button>
            </Box>

            {/* Don't have account? */}
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', marginTop: '20px' }}>
              <Typography sx={{ fontWeight: '500', fontSize: 16 }}>Don't have an account?</Typography>

              <Typography onClick={() => navigate(PageEndpoints.PublicEndpoints.SIGN_UP_ENDPOINT)}
                component={'a'} sx={{
                  color: 'orange',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: 'pointer',
                  p: 0,
                  m: 0
                }}>
                Sign up
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default LoginPage
