import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Toolbar,
  Divider,
  Box,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  LocalHospital as BloodIcon,
  Inventory as InventoryIcon,
  Assignment as RequestIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

interface DashboardSidebarProps {
  open: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const drawerWidth = 280;

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  { id: 'donors', label: 'Donors', icon: PeopleIcon },
  { id: 'donations', label: 'Donations', icon: BloodIcon },
  { id: 'inventory', label: 'Blood Inventory', icon: InventoryIcon },
  { id: 'requests', label: 'Blood Requests', icon: RequestIcon },
  { id: 'analytics', label: 'Analytics', icon: AnalyticsIcon },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  open,
  activeSection,
  onSectionChange,
}) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#fafafa',
          borderRight: '1px solid #e0e0e0',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', pt: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 1, px: 2 }}>
              <ListItemButton
                onClick={() => onSectionChange(item.id)}
                sx={{
                  borderRadius: 2,
                  backgroundColor: activeSection === item.id ? '#e3f2fd' : 'transparent',
                  color: activeSection === item.id ? '#1976d2' : '#666',
                  '&:hover': {
                    backgroundColor: activeSection === item.id ? '#e3f2fd' : '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activeSection === item.id ? '#1976d2' : '#666',
                    minWidth: 40,
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: activeSection === item.id ? 600 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default DashboardSidebar;