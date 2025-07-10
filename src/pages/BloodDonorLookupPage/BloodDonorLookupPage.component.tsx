import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  MenuItem,
  Slider,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Switch,
  FormControlLabel,
  Collapse,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  LinearProgress,
  Snackbar,
  Alert,
  Badge,
  ThemeProvider,
  createTheme,
  styled,
  keyframes,
  AlertColor,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  FilterList,
  LocationOn,
  Phone,
  Email,
  BloodtypeRounded,
  AccessTime,
  PersonAdd,
  Search,
  Refresh,
  FilterAlt,
  Map,
  FavoriteRounded,
  InfoOutlined,
  ExpandMore,
  Close,
  CheckCircle,
  Warning,
  EmergencyShare,
  PauseCircle
} from '@mui/icons-material';
import DonorCard from './components/DonorCard';
import RequestCard from './components/RequestCard';
import BloodCompatibilityGuide from './components/BloodCompatibilityGuide';
import { StyledCard, StyledChip, BloodTypeChip, EmergencyCard } from './components/styled';

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f',
      light: '#ff6659',
      dark: '#9a0007'
    },
    secondary: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d'
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff'
    }
  },
  typography: {
    h4: {
      fontWeight: 600,
      color: '#d32f2f'
    },
    h6: {
      fontWeight: 500
    }
  }
});

// Animation for emergency
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(211,47,47,0.7); }
  70% { box-shadow: 0 0 0 10px rgba(211,47,47,0); }
  100% { box-shadow: 0 0 0 0 rgba(211,47,47,0); }
`;

// Mock data
const mockDonors = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    bloodType: 'O-',
    phone: '0901234567',
    email: 'nguyenvana@email.com',
    location: 'Quận 1, TP.HCM',
    distance: 2.5,
    lastDonation: '2024-01-15',
    nextAvailable: '2024-04-15',
    donationCount: 15,
    isAvailable: true,
    isEmergency: false,
    avatar: '/api/placeholder/50/50',
    compatibility: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    components: ['Hồng cầu', 'Huyết tương', 'Tiểu cầu']
  },
  {
    id: 2,
    name: 'Trần Thị B',
    bloodType: 'A+',
    phone: '0912345678',
    email: 'tranthib@email.com',
    location: 'Quận 3, TP.HCM',
    distance: 1.8,
    lastDonation: '2024-02-20',
    nextAvailable: '2024-05-20',
    donationCount: 8,
    isAvailable: true,
    isEmergency: true,
    avatar: '/api/placeholder/50/50',
    compatibility: ['A+', 'AB+'],
    components: ['Hồng cầu', 'Huyết tương']
  },
  {
    id: 3,
    name: 'Lê Minh C',
    bloodType: 'B-',
    phone: '0923456789',
    email: 'leminhc@email.com',
    location: 'Quận 7, TP.HCM',
    distance: 5.2,
    lastDonation: '2024-03-10',
    nextAvailable: '2024-06-10',
    donationCount: 22,
    isAvailable: false,
    isEmergency: false,
    avatar: '/api/placeholder/50/50',
    compatibility: ['B-', 'B+', 'AB-', 'AB+'],
    components: ['Hồng cầu', 'Tiểu cầu']
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    bloodType: 'B+',
    phone: '0934567890',
    email: 'phamthid@email.com',
    location: 'Quận 5, TP.HCM',
    distance: 3.1,
    lastDonation: '2024-03-25',
    nextAvailable: '2024-06-25',
    donationCount: 10,
    isAvailable: true,
    isEmergency: false,
    avatar: '/api/placeholder/50/50',
    compatibility: ['B+', 'AB+'],
    components: ['Hồng cầu', 'Huyết tương']
  },
  {
    id: 5,
    name: 'Đỗ Văn E',
    bloodType: 'AB-',
    phone: '0945678901',
    email: 'dovane@email.com',
    location: 'Quận 10, TP.HCM',
    distance: 4.7,
    lastDonation: '2024-01-30',
    nextAvailable: '2024-04-30',
    donationCount: 5,
    isAvailable: false,
    isEmergency: false,
    avatar: '/api/placeholder/50/50',
    compatibility: ['AB-', 'AB+'],
    components: ['Tiểu cầu']
  },
  {
    id: 6,
    name: 'Lý Minh F',
    bloodType: 'AB+',
    phone: '0956789012',
    email: 'lyminhf@email.com',
    location: 'Quận Bình Thạnh, TP.HCM',
    distance: 2.9,
    lastDonation: '2024-02-10',
    nextAvailable: '2024-05-10',
    donationCount: 12,
    isAvailable: true,
    isEmergency: true,
    avatar: '/api/placeholder/50/50',
    compatibility: ['AB+'],
    components: ['Hồng cầu', 'Huyết tương', 'Tiểu cầu']
  }
];

const mockRequests = [
  {
    id: 1,
    patientName: 'Nguyễn Văn X',
    bloodType: 'O-',
    hospital: 'Bệnh viện Chợ Rẫy',
    urgency: 'Khẩn cấp',
    needed: 3,
    received: 1,
    deadline: '2024-07-10',
    contact: '0901111111',
    components: ['Hồng cầu'],
    status: 'active'
  },
  {
    id: 2,
    patientName: 'Trần Thị Y',
    bloodType: 'A+',
    hospital: 'Bệnh viện Bình Dân',
    urgency: 'Bình thường',
    needed: 2,
    received: 2,
    deadline: '2024-07-15',
    contact: '0902222222',
    components: ['Huyết tương'],
    status: 'completed'
  }
];

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
  const [filteredDonors, setFilteredDonors] = useState(mockDonors);
  const [filteredRequests, setFilteredRequests] = useState(mockRequests);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<DonorType | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertColor }>({ open: false, message: '', severity: 'success' });
  const [showFilters, setShowFilters] = useState(false);
  // 1. Thêm state cho nhóm máu của bạn
  const [myBloodType, setMyBloodType] = useState('A+');
  const [showCompatibilityGuide, setShowCompatibilityGuide] = useState(false);
  const compatibilityGuideRef = React.useRef<HTMLDivElement>(null);

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

  // Filter handlers
  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      let filtered = mockDonors.filter(donor => {
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
    setFilteredDonors(mockDonors);
  };

  type DonorType = typeof mockDonors[number];
  type RequestType = typeof mockRequests[number];
  const handleContact = (donor: DonorType) => {
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
                    onChange={(e, newValue) => setMaxDistance(newValue)}
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
                {mockDonors.length}
                </Typography>
              <Typography variant="body2" color="text.secondary">
                Người hiến máu
              </Typography>
                </Box>
            <Box flex={1} textAlign="center">
              <Typography variant="h4" color="secondary">
                {mockDonors.filter(d => d.isAvailable).length}
              </Typography>
                  <Typography variant="body2" color="text.secondary">
                Sẵn sàng hiến
                  </Typography>
                </Box>
            <Box flex={1} textAlign="center">
              <Typography variant="h4" color="warning.main">
                {mockRequests.filter(r => r.status === 'active').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Yêu cầu đang chờ
              </Typography>
              </Box>
            <Box flex={1} textAlign="center">
              <Typography variant="h4" color="success.main">
                {mockRequests.filter(r => r.status === 'completed').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Đã hoàn thành
              </Typography>
            </Box>
          </Box>
        </Paper>

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
                  <Badge badgeContent={filteredRequests.length} color="error">
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
            {filteredRequests.map((request) => (
              <Box key={request.id}>
                <RequestCard request={request} />
              </Box>
            ))}
            {filteredRequests.length === 0 && (
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

        {/* Footer Information */}
        {/* <Box sx={{ mt: 4, py: 3, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            Hệ thống hỗ trợ hiến máu - Kết nối yêu thương, cứu sống sinh mệnh
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            Hotline: 1900-XXX-XXX | Email: support@blooddonation.vn
          </Typography>
        </Box> */}
    </Container>
    </ThemeProvider>
  );
};

export default BloodDonorLookup;