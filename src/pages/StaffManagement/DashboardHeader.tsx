import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
} from '@mui/icons-material';

interface DashboardHeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick, sidebarOpen }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#fff',
        color: '#333',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #dc004e, #ff5983)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
              B+
            </Typography>
          </Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Blood Donation Management System
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            {/* <Badge badgeContent={4} color="secondary"> */}
            {/* <NotificationsIcon /> */}
            {/* </Badge> */}
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: '#1976d2',
              }}
            >
              <AccountCircle />
            </Avatar>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Dr. Sarah Johnson
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;