import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Paper, TextField, Button, Card, CardContent, CardActions,
  Chip, MenuItem, Slider, Avatar, FormControl, InputLabel, Select, List, ListItem,
  ListItemText, ListItemAvatar, Divider, Switch, FormControlLabel, Collapse, Tooltip,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Tab, Tabs, LinearProgress,
  Snackbar, Alert, Badge, ThemeProvider, createTheme, styled, keyframes, AlertColor,
  Table, TableHead, TableBody, TableRow, TableCell, TableContainer
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  FilterList, LocationOn, Phone, Email, BloodtypeRounded, AccessTime, PersonAdd,
  Search, Refresh, FilterAlt, Map, FavoriteRounded, InfoOutlined, ExpandMore,
  Close, CheckCircle, Warning, EmergencyShare, PauseCircle, AddCircleOutline
} from '@mui/icons-material';
import DonorCard from './components/DonorCard';
import RequestCard from './components/RequestCard';
import BloodCompatibilityGuide from './components/BloodCompatibilityGuide';
import { StyledCard, StyledChip, BloodTypeChip, EmergencyCard } from './components/styled';
import axios from 'axios';
import CreateBloodRequestDialog from './components/CreateBloodRequestDialog';

// Theme configuration (giữ nguyên)
const theme = createTheme({
  palette: {
    primary: { main: '#d32f2f', light: '#ff6659', dark: '#9a0007' },
    secondary: { main: '#f44336', light: '#ff7961', dark: '#ba000d' },
    background: { default: '#fafafa', paper: '#ffffff' }
  },
  typography: {
    h4: { fontWeight: 600, color: '#d32f2f' },
    h6: { fontWeight: 500 }
  }
});

// Animation for emergency (giữ nguyên)
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(211,47,47,0.7); }
  70% { box-shadow: 0 0 0 10px rgba(211,47,47,0); }
  100% { box-shadow: 0 0 0 0 rgba(211,47,47,0); }
`;

const bloodTypes = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
const bloodComponents = ['Hồng cầu', 'Huyết tương', 'Tiểu cầu'];

const BloodDonorLookup = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('');
  const [maxDistance, setMaxDistance] = useState(10);
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertColor }>({ 
    open: false, message: '', severity: 'success' 
  });
  const [showFilters, setShowFilters] = useState(false);
  const [myBloodType, setMyBloodType] = useState('A+');
  const [showCompatibilityGuide, setShowCompatibilityGuide] = useState(false);
  const compatibilityGuideRef = React.useRef<HTMLDivElement>(null);
  
  // CREATE BLOOD REQUEST STATES
  const [openCreateRequestDialog, setOpenCreateRequestDialog] = useState(false);
  const [bloodRequests, setBloodRequests] = useState<any[]>([]);
  
  // ✅ THÊM STATES CHO DONORS TỪ API
  const [donors, setDonors] = useState<any[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<any[]>([]);
  const [selectedDonor, setSelectedDonor] = useState<any>(null);

  const handleToggleCompatibilityGuide = () => {
    setShowCompatibilityGuide((prev) => {
      const next = !prev;
      setTimeout(() => {
        if (next && compatibilityGuideRef.current) {
          compatibilityGuideRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
      return next;
    });
  };

  // ✅ FETCH DONORS TỪ API
  const fetchDonors = async () => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN')?.replaceAll('"', '');
      const response = await axios.get('https://localhost:5000/api/v1/account/account/all-with-appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('📊 API Donors Response:', JSON.stringify(response.data, null, 2));

      if (response.data?.is_success && response.data.data) {
        const transformedDonors = response.data.data.map((user: any) => ({
          id: user.userID,
          userID: user.userID,
          name: user.fullName || 'Chưa cập nhật',
          fullName: user.fullName || 'Chưa cập nhật',
          bloodType: user.bloodGroup || 'N/A',
          bloodGroup: user.bloodGroup || 'N/A',
          phone: user.phone || 'N/A',
          email: user.email || 'N/A',
          location: 'TP.HCM', // Default location
          distance: Math.random() * 10 + 1, // Random distance for demo
          lastDonation: user.lastDonationDate || null,
          lastDonationDate: user.lastDonationDate || null,
          donationCount: user.completedAppointmentsCount || 0,
          completedAppointmentsCount: user.completedAppointmentsCount || 0,
          totalVolumesDonated: user.totalVolumesDonated || 0,
          isAvailable: user.isActive !== false,
          isActive: user.isActive !== false,
          isEmergency: false,
          avatar: '/api/placeholder/50/50',
          compatibility: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
          components: ['Hồng cầu', 'Huyết tương', 'Tiểu cầu'],
          gender: user.gender,
          dateOfBirth: user.dateOfBirth
        }));
        
        setDonors(transformedDonors);
        setFilteredDonors(transformedDonors);
        console.log('✅ Donors loaded:', transformedDonors);
      }
    } catch (err: any) {
      console.error('❌ Error fetching donors:', err);
      setSnackbar({
        open: true,
        message: 'Không thể tải danh sách người hiến máu',
        severity: 'error'
      });
    }
  };

  // Filter handlers (cập nhật để sử dụng donors từ API)
  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      let filtered = donors.filter(donor => {
        const matchesQuery = donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           donor.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesBloodType = !selectedBloodType || donor.bloodType === selectedBloodType;
        const matchesComponent = !selectedComponent || donor.components.includes(selectedComponent);
        const matchesDistance = donor.distance <= maxDistance;
        const matchesEmergency = !emergencyOnly || donor.isEmergency;
        const matchesAvailable = !availableOnly || donor.isAvailable;

        return matchesQuery && matchesBloodType && matchesComponent && 
               matchesDistance && matchesEmergency && matchesAvailable;
      });
      setFilteredDonors(filtered);
      setLoading(false);
    }, 800);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedBloodType('');
    setSelectedComponent('');  
    setMaxDistance(10);
    setEmergencyOnly(false);
    setAvailableOnly(true);
    setFilteredDonors(donors);
  };

  const handleContact = (donor: any) => {
    setSelectedDonor(donor);
    setOpenDialog(true);
  };

  const handleRequestDonation = () => {
    setOpenDialog(false);
    setSnackbar({
      open: true,
      message: 'Yêu cầu hiến máu đã được gửi thành công!',
      severity: 'success'
    });
  };

  const getCompatibilityInfo = (bloodType: string) => {
    const compatibility: { [key: string]: { canDonate: string[]; canReceive: string[] } } = {
      'O-': { canDonate: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], canReceive: ['O-'] },
      'O+': { canDonate: ['O+', 'A+', 'B+', 'AB+'], canReceive: ['O-', 'O+'] },
      'A-': { canDonate: ['A-', 'A+', 'AB-', 'AB+'], canReceive: ['O-', 'A-'] },
      'A+': { canDonate: ['A+', 'AB+'], canReceive: ['O-', 'O+', 'A-', 'A+'] },
      'B-': { canDonate: ['B-', 'B+', 'AB-', 'AB+'], canReceive: ['O-', 'B-'] },
      'B+': { canDonate: ['B+', 'AB+'], canReceive: ['O-', 'O+', 'B-', 'B+'] },
      'AB-': { canDonate: ['AB-', 'AB+'], canReceive: ['O-', 'A-', 'B-', 'AB-'] },
      'AB+': { canDonate: ['AB+'], canReceive: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] }
    };
    return compatibility[bloodType] || { canDonate: [], canReceive: [] };
  };

  // Fetch Blood Request từ BE (giữ nguyên)
  const fetchBloodRequests = async () => {
    try {
      const res = await axios.get('https://localhost:5000/api/v1/blood-request');
      if (res.data) {
        console.log('JSON BloodRequest BE:', JSON.stringify(res.data, null, 2));
      }
      if (res.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
        setBloodRequests(res.data.data);
      } else {
        setBloodRequests([]);
      }
    } catch {
      setBloodRequests([]);
    }
  };

  // ✅ GỌI CẢ HAI API KHI COMPONENT MOUNT
  useEffect(() => {
    fetchBloodRequests();
    fetchDonors();
  }, []);

  const handleCreateRequestSuccess = () => {
    fetchBloodRequests();
    setTabValue(1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Tra cứu người hiến nhận máu
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" paragraph>
          Tìm kiếm và kết nối với những người hiến máu phù hợp trong khu vực của bạn
        </Typography>

        {/* Emergency Alert */}
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Lưu ý:</strong> Trong trường hợp khẩn cấp, vui lòng liên hệ trực tiếp với bệnh viện hoặc gọi cấp cứu 115
          </Typography>
        </Alert>

        {/* Search and Filter Section */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Tìm kiếm và lọc
            </Typography>
            <Button
              startIcon={<FilterAlt />}
              onClick={() => setShowFilters(!showFilters)}
              variant="outlined"
            >
              {showFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
            </Button>
          </Box>

          <Grid container spacing={2}>
            <Box sx={{ width: '100%', display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                fullWidth
                label="Tìm kiếm theo tên hoặc địa điểm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1 }} />
                }}
              />
              <FormControl fullWidth sx={{ width: { xs: '100%', md: 120 } }}>
                <InputLabel>Nhóm máu</InputLabel>
                <Select
                  value={selectedBloodType}
                  onChange={(e) => setSelectedBloodType(e.target.value)}
                  label="Nhóm máu"
                  fullWidth
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  {bloodTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ width: { xs: '100%', md: 120 } }}>
                <InputLabel>Thành phần máu</InputLabel>
                <Select
                  value={selectedComponent}
                  onChange={(e) => setSelectedComponent(e.target.value)}
                  label="Thành phần máu"
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  {bloodComponents.map((component) => (
                    <MenuItem key={component} value={component}>
                      {component}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* Advanced Filters */}
          <Collapse in={showFilters}>
            <Box mt={3}>
              <Box display="flex" alignItems="center" mb={2}>
                <FilterAlt sx={{ mr: 1 }} />
                <Typography variant="h6">Bộ lọc nâng cao</Typography>
                <IconButton onClick={() => setShowFilters(false)} sx={{ ml: 'auto' }}>
                  <Close />
                </IconButton>
              </Box>
              <Grid container spacing={3}>
                <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                  <Typography gutterBottom>
                    Khoảng cách tối đa: {maxDistance}km
                  </Typography>
                  <Slider
                    value={maxDistance}
                    onChange={(e, newValue) => setMaxDistance(newValue as number)}
                    min={1}
                    max={50}
                    step={1}
                    marks={[
                      { value: 1, label: '1km' },
                      { value: 25, label: '25km' },
                      { value: 50, label: '50km' }
                    ]}
                    valueLabelDisplay="auto"
                  />
                </Box>
                <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={emergencyOnly}
                        onChange={(e) => setEmergencyOnly(e.target.checked)}
                      />
                    }
                    label="Chỉ hiển thị trường hợp khẩn cấp"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={availableOnly}
                        onChange={(e) => setAvailableOnly(e.target.checked)}
                      />
                    }
                    label="Chỉ hiển thị người sẵn sàng hiến"
                  />
                </Box>
              </Grid>
            </Box>
          </Collapse>

          <Box mt={3} display="flex" gap={2}>
            <Button
              variant="contained"
              startIcon={<Search />}
              onClick={handleSearch}
              disabled={loading}
            >
              Tìm kiếm
            </Button>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleReset}
            >
              Đặt lại
            </Button>
          </Box>
        </Paper>

        {/* Blood Compatibility Guide Toggle */}
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleToggleCompatibilityGuide}
            endIcon={<InfoOutlined />}
          >
            {showCompatibilityGuide ? 'Ẩn hướng dẫn tương thích nhóm máu' : 'Xem hướng dẫn tương thích nhóm máu'}
          </Button>
        </Box>

        {/* Blood Compatibility Guide (Collapsible) */}
        <div ref={compatibilityGuideRef} />
        <Collapse in={showCompatibilityGuide} timeout="auto" unmountOnExit>
          <BloodCompatibilityGuide />
        </Collapse>

        {/* Statistics Summary - always 1 row */}
        <Paper sx={{ p: 3, mt: 0, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Thống kê hệ thống
          </Typography>
          <Box display="flex" flexDirection="row" justifyContent="space-between" gap={2}>
            <Box flex={1} textAlign="center">
              <Typography variant="h4" color="primary">
                {donors.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Người hiến máu
              </Typography>
            </Box>
            <Box flex={1} textAlign="center">
              <Typography variant="h4" color="secondary">
                {donors.filter(d => d.isAvailable).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sẵn sàng hiến
              </Typography>
            </Box>
            <Box flex={1} textAlign="center">
              <Typography variant="h4" color="warning.main">
                {bloodRequests.filter(r => r.status === 'Pending').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Yêu cầu đang chờ
              </Typography>
            </Box>
            <Box flex={1} textAlign="center">
              <Typography variant="h4" color="success.main">
                {bloodRequests.filter(r => r.status === 'Completed').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Đã hoàn thành
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Tạo Blood Request Button (đưa lên trên Tabs) */}
        {/* <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutline />}
            onClick={() => setOpenCreateRequestDialog(true)}
            sx={{ minWidth: 180, fontWeight: 600 }}
          >
            Tạo Blood Request
          </Button>
        </Box> */}

        {/* Results Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab
              label={
                <Box display="flex" alignItems="center">
                  <Badge badgeContent={filteredDonors.length} color="primary">
                    Người hiến máu
                  </Badge>
                </Box>
              }
            />
            <Tab
              label={
                <Box display="flex" alignItems="center">
                  <Badge badgeContent={bloodRequests.length} color="error">
                    Yêu cầu cần máu
                  </Badge>
                </Box>
              }
            />
          </Tabs>
        </Box>

        {/* Loading */}
        {loading && (
          <Box sx={{ width: '100%', mb: 3 }}>
            <LinearProgress />
          </Box>
        )}

        {/* Results */}
        {tabValue === 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)'
              },
              gap: 3
            }}
          >
            {filteredDonors.map((donor) => (
              <Box key={donor.id}>
                <DonorCard donor={donor} handleContact={handleContact} />
              </Box>
            ))}
            {filteredDonors.length === 0 && !loading && (
              <Box sx={{ gridColumn: '1/-1' }}>
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary">
                    Không tìm thấy người hiến máu phù hợp
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Thử điều chỉnh bộ lọc hoặc mở rộng khoảng cách tìm kiếm
                  </Typography>
                </Paper>
              </Box>
            )}
          </Box>
        )}

{tabValue === 1 && (
        <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutline />}
            onClick={() => setOpenCreateRequestDialog(true)}
            sx={{ minWidth: 180, fontWeight: 600 }}
          >
            Tạo Blood Request
          </Button>
        </Box>
        )}

        {tabValue === 1 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)'
              },
              gap: 3
            }}
          >
            {bloodRequests.map((request) => (
              <Box key={request.requestId || request.id}>
                <RequestCard request={request} />
              </Box>
            ))}
            {bloodRequests.length === 0 && (
              <Box sx={{ gridColumn: '1/-1' }}>
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary">
                    Không có yêu cầu nào
                  </Typography>
                </Paper>
              </Box>
            )}
          </Box>
        )}

        {/* Contact Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Liên hệ người hiến máu</Typography>
              <IconButton onClick={() => setOpenDialog(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            {selectedDonor && (
              <Box>
                <Box display="flex" alignItems="center" mb={3}>
                  <Avatar
                    src={selectedDonor.avatar}
                    sx={{ width: 60, height: 60, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{selectedDonor.name}</Typography>
                    <BloodTypeChip
                      bloodtype={selectedDonor.bloodType}
                      label={selectedDonor.bloodType}
                    />
                  </Box>
                </Box>

                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Phone />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary="Số điện thoại" 
                      secondary={selectedDonor.phone}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary="Email" 
                      secondary={selectedDonor.email}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <LocationOn />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary="Địa chỉ" 
                      secondary={selectedDonor.location}
                    />
                  </ListItem>
                </List>
                
                <Alert severity="info" sx={{ mt: 2 }}>
                  Vui lòng liên hệ trực tiếp với người hiến máu để thỏa thuận thời gian và địa điểm hiến máu.
                </Alert>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
            <Button variant="contained" onClick={handleRequestDonation}>
              Gửi yêu cầu
            </Button>
          </DialogActions>
        </Dialog>

        {/* CREATE BLOOD REQUEST DIALOG */}
        <CreateBloodRequestDialog
          open={openCreateRequestDialog}
          onClose={() => setOpenCreateRequestDialog(false)}
          onSuccess={handleCreateRequestSuccess}
        />

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity as AlertColor}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Quick Actions FAB */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000
          }}
        >
          <Tooltip title="Tìm kiếm nhanh">
            <IconButton
              color="primary" 
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': { backgroundColor: 'primary.dark' },
                width: 56,
                height: 56,
                mb: 1,
                display: 'block'
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Search />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xem bản đồ">
            <IconButton
              color="secondary" 
              sx={{
                backgroundColor: 'secondary.main',
                color: 'white',
                '&:hover': { backgroundColor: 'secondary.dark' },
                width: 56,
                height: 56,
                display: 'block'
              }}
              onClick={() => setSnackbar({
                open: true,
                message: 'Tính năng bản đồ đang được phát triển!',
                severity: 'info'
              })}
            >
              <Map />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Emergency Contact Banner */}
        <EmergencyCard sx={{ mt: 3, p: 3 }}>
          <Box display="flex" alignItems="center">
            <EmergencyShare sx={{ fontSize: 40, mr: 2 }} />
            <Box flex={1}>
              <Typography variant="h6" component="div">
                Trường hợp khẩn cấp?
              </Typography>
              <Typography variant="body2">
                Liên hệ ngay với trung tâm cấp cứu hoặc bệnh viện gần nhất
              </Typography>
            </Box>
            <Box>
              <Button 
                variant="outlined" 
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'white'
                  }
                }}
                href="tel:115"
              >
                Gọi 115
              </Button>
            </Box>
          </Box>
        </EmergencyCard>
      </Container>
    </ThemeProvider>
  );
};

export default BloodDonorLookup;
