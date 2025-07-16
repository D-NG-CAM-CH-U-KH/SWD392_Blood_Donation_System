import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Box,
  TextField,
  Button,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  Warning as WarningIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

// Mock data for blood inventory
const inventoryData = [
  {
    bloodType: 'O+',
    totalUnits: 145,
    availableUnits: 125,
    reservedUnits: 20,
    expiringSoon: 8,
    minStock: 50,
    lastUpdated: '2024-02-15 14:30',
  },
  {
    bloodType: 'O-',
    totalUnits: 67,
    availableUnits: 52,
    reservedUnits: 15,
    expiringSoon: 3,
    minStock: 80,
    lastUpdated: '2024-02-15 14:25',
  },
  {
    bloodType: 'A+',
    totalUnits: 98,
    availableUnits: 78,
    reservedUnits: 20,
    expiringSoon: 5,
    minStock: 40,
    lastUpdated: '2024-02-15 14:20',
  },
  {
    bloodType: 'A-',
    totalUnits: 34,
    availableUnits: 28,
    reservedUnits: 6,
    expiringSoon: 2,
    minStock: 30,
    lastUpdated: '2024-02-15 14:15',
  },
  {
    bloodType: 'B+',
    totalUnits: 76,
    availableUnits: 65,
    reservedUnits: 11,
    expiringSoon: 4,
    minStock: 35,
    lastUpdated: '2024-02-15 14:10',
  },
  {
    bloodType: 'B-',
    totalUnits: 23,
    availableUnits: 18,
    reservedUnits: 5,
    expiringSoon: 1,
    minStock: 25,
    lastUpdated: '2024-02-15 14:05',
  },
  {
    bloodType: 'AB+',
    totalUnits: 45,
    availableUnits: 38,
    reservedUnits: 7,
    expiringSoon: 3,
    minStock: 20,
    lastUpdated: '2024-02-15 14:00',
  },
  {
    bloodType: 'AB-',
    totalUnits: 16,
    availableUnits: 12,
    reservedUnits: 4,
    expiringSoon: 1,
    minStock: 15,
    lastUpdated: '2024-02-15 13:55',
  },
];

const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory] = useState(inventoryData);

  const filteredInventory = inventory.filter(item =>
    item.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBloodTypeColor = (bloodType: string) => {
    const colors: { [key: string]: string } = {
      'O+': '#ff5722', 'O-': '#f44336',
      'A+': '#2196f3', 'A-': '#3f51b5',
      'B+': '#4caf50', 'B-': '#8bc34a',
      'AB+': '#ff9800', 'AB-': '#ffc107',
    };
    return colors[bloodType] || '#9e9e9e';
  };

  const getStockLevel = (available: number, minStock: number) => {
    const percentage = (available / minStock) * 100;
    if (percentage >= 100) return { level: 'Good', color: 'success' };
    if (percentage >= 50) return { level: 'Medium', color: 'warning' };
    return { level: 'Low', color: 'error' };
  };

  const getStockProgress = (available: number, minStock: number) => {
    return Math.min((available / minStock) * 100, 100);
  };

  const lowStockItems = inventory.filter(item => item.availableUnits < item.minStock);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Blood Inventory
        </Typography>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          sx={{
            backgroundColor: '#2e7d32',
            '&:hover': { backgroundColor: '#1b5e20' },
          }}
        >
          Refresh Inventory
        </Button>
      </Box>

      {lowStockItems.length > 0 && (
        <Alert
          severity="warning"
          icon={<WarningIcon />}
          sx={{ mb: 3 }}
        >
          <Typography variant="body2">
            <strong>Low Stock Alert:</strong> {lowStockItems.length} blood type(s) are below minimum stock levels: {' '}
            {lowStockItems.map(item => item.bloodType).join(', ')}
          </Typography>
        </Alert>
      )}

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Search blood types..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
          }}
          sx={{ minWidth: 300 }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Blood Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Total Units</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Available</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Reserved</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Expiring Soon</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Stock Level</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Stock Progress</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventory.map((item) => {
              const stockLevel = getStockLevel(item.availableUnits, item.minStock);
              const stockProgress = getStockProgress(item.availableUnits, item.minStock);

              return (
                <TableRow key={item.bloodType} hover>
                  <TableCell>
                    <Chip
                      label={item.bloodType}
                      sx={{
                        backgroundColor: getBloodTypeColor(item.bloodType),
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        minWidth: 50,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {item.totalUnits}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 'bold',
                        color: item.availableUnits < item.minStock ? '#d32f2f' : '#2e7d32'
                      }}
                    >
                      {item.availableUnits}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{item.reservedUnits}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        color: item.expiringSoon > 5 ? '#ff9800' : '#666',
                        fontWeight: item.expiringSoon > 5 ? 'bold' : 'normal'
                      }}
                    >
                      {item.expiringSoon}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={stockLevel.level}
                      color={stockLevel.color as any}
                      size="small"
                      variant={stockLevel.level === 'Low' ? 'filled' : 'outlined'}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
                      <LinearProgress
                        variant="determinate"
                        value={stockProgress}
                        sx={{
                          flex: 1,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: stockLevel.color === 'error' ? '#d32f2f' :
                              stockLevel.color === 'warning' ? '#ff9800' : '#2e7d32',
                          },
                        }}
                      />
                      <Typography variant="caption" sx={{ minWidth: 35 }}>
                        {Math.round(stockProgress)}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="textSecondary">
                      {item.lastUpdated}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InventoryTable;