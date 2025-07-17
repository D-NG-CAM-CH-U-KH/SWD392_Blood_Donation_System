import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageEndpoints from '~/meta-data/contants/page-endpoints';

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h2" color="error" gutterBottom>
        403
      </Typography>
      <Typography variant="h5" gutterBottom>
        You don’t have permission to access this page.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Please contact your administrator or try logging in with a different account.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(PageEndpoints.PublicEndpoints.HOME_ENDPOINT)}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default ForbiddenPage;
