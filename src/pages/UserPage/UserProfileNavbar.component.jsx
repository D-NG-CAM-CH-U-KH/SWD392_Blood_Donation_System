import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';
import { Outlet } from 'react-router-dom';

const navItems = [
  { text: 'Account', icon: <AccountCircleIcon /> },
  { text: 'History', icon: <HistoryIcon /> },
  { text: 'Request', icon: <EditIcon /> },
  { text: 'Process', icon: <DescriptionIcon /> },
  { text: 'Scrumboard', icon: <DashboardIcon /> },
  { text: 'Contacts', icon: <LocationOnIcon /> },
  { text: 'Invoice', icon: <ReceiptIcon /> },
  { text: 'Logout', icon: <LogoutIcon /> },
];

export default function UserProfileNavbar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#f9fafb',
          borderRight: '1px solid #e0e0e0',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
          ACCOUNT
        </Typography>
        <List>
          {navItems.map((item, index) => (
            <ListItemButton key={index}>
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
