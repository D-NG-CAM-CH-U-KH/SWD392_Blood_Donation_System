import React from 'react';
import { Box, Toolbar } from '@mui/material';
import DashboardOverview from './DashboardOverview';
import DonorsTable from './DonorsTable';
import DonationsTable from './DonationTable';
import InventoryTable from './InventoryTable';
import RequestsTable from './RequestTable';

interface DashboardContentProps {
  activeSection: string;
  sidebarOpen: boolean;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  activeSection,
  sidebarOpen,
}) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'donors':
        return <DonorsTable />;
      case 'donations':
        return <DonationsTable />;
      case 'inventory':
        return <InventoryTable />;
      case 'requests':
        return <RequestsTable />;
      case 'analytics':
        return <DashboardOverview />;
      case 'settings':
        return <DashboardOverview />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        transition: 'margin-left 0.3s',
        marginLeft: sidebarOpen ? 0 : '-280px',
      }}
    >
      <Toolbar />
      {renderContent()}
    </Box>
  );
};

export default DashboardContent;