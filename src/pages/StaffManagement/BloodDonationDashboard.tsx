import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { red } from '@mui/material/colors';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import DashboardContent from './DashboardContent';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const BloodDonationDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <DashboardHeader
          onMenuClick={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />
        <DashboardSidebar
          open={sidebarOpen}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
        <DashboardContent
          activeSection={activeSection}
          sidebarOpen={sidebarOpen}
        />
      </Box>
    </ThemeProvider>
  );
};

export default BloodDonationDashboard