import React from 'react';
import {
  Box,
  List,
  ListItemText,
  Divider,
  ListItem,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';

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
    <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'flex-start'
        }}
      >
        <List>
          {navItems.map((navItem, idx) => {
            const IconComponent = navItem.icon

            return (
              // <React.Fragment key={`navItems-${idx}`}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', color: '#000' }}
                >
                  <ListItem
                    button=""
                    sx={{
                      gap: 1.5,
                      cursor: 'pointer',
                      mt: 2,
                      '&:hover': {
                        backgroundColor: '#e3f2fd'
                      },
                    }}
                  >
                    {navItem.icon}
                    {navItem.text}
                  </ListItem>
                </Box>
              // </React.Fragment>
            )
          })}

          
        </List>
      </Box>
  );
}
