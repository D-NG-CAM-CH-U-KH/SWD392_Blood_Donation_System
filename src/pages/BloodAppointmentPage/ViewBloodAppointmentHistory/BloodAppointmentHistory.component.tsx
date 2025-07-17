import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Stack,
  Paper,
  Fade,
  CircularProgress,
  Tabs,
  Tab
} from '@mui/material';
import {
  CalendarToday,
  LocationOn,
  Schedule,
  MoreVert,
  Add,
  Search,
  CheckCircle,
  Cancel,
  Pending,
  Refresh,
  Edit,
  Delete,
  Bloodtype,
  TrendingUp,
  History,
  EventNote
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PublicAPI from '../../../api/public-api';
import FormHeader from './components/FormHeader';
import StatsCards from './components/StatsCards';
import FilterBar from './components/FilterBar';
import AppointmentList from './components/AppointmentList';
import EmptyState from './components/EmptyState';
import ContextMenu from './components/ContextMenu';
import AppointmentDetailDialog from './components/AppointmentDetailDialog';
import EditNoteDialog from './components/EditNoteDialog';
import DeleteConfirmDialog from './components/DeleteConfirmDialog';

const theme = createTheme({
  palette: {
    primary: { main: '#d32f2f' },
    secondary: { main: '#f57c00' },
    success: { main: '#388e3c' },
    error: { main: '#d32f2f' },
    background: { default: '#fafafa' }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h4: { fontWeight: 600 },
    h6: { fontWeight: 600 }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600
        }
      }
    }
  }
});

interface DonationForm {
  donationFormID: number;
  isDonated: boolean;
  illness: string;
  dangerousIllness: string;
  twelveMonthProblem: string;
  sixMonthProblem: string;
  oneMonthProblem: string;
  fourteenDayProblem: string;
  sevenDayProblem: string;
  womanProblem: string;
  createdAt: string;
}

interface DonationAppointment {
  AppointmentID: number;
  UserID: number;
  ScheduledDate: string;
  Status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  Location: string;
  Note: string;
  TimeSlot: string;
  BloodType?: string;
  donationForm?: DonationForm;
}

const BloodDonationDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<DonationAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<DonationAppointment | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuId, setMenuId] = useState<number | null>(null);
  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState('');
  const [editNote, setEditNote] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        // TODO: Lấy userId thực tế từ auth hoặc props, tạm hardcode là 1
        const data = await PublicAPI.getDonationAppointmentsByUserId(3);
        // Map dữ liệu từ BE sang FE model
        const mapped = data.map((item: any) => ({
          AppointmentID: item.appointmentID,
          UserID: item.userID || 1, // fallback nếu BE không trả về userID
          ScheduledDate: item.scheduledDate,
          Status: (item.status.charAt(0).toUpperCase() + item.status.slice(1)).replace('Pending', 'Pending').replace('Confirmed', 'Confirmed').replace('Completed', 'Completed').replace('Cancelled', 'Cancelled'),
          Location: item.location,
          Note: item.note || '',
          TimeSlot: `${item.startTime} - ${item.endTime}`,
          BloodType: item.bloodType,
          donationForm: item.donationForm ? {
            donationFormID: item.donationForm.donationFormID,
            isDonated: item.donationForm.isDonated,
            illness: item.donationForm.illness,
            dangerousIllness: item.donationForm.dangerousIllness,
            twelveMonthProblem: item.donationForm.twelveMonthProblem,
            sixMonthProblem: item.donationForm.sixMonthProblem,
            oneMonthProblem: item.donationForm.oneMonthProblem,
            fourteenDayProblem: item.donationForm.fourteenDayProblem,
            sevenDayProblem: item.donationForm.sevenDayProblem,
            womanProblem: item.donationForm.womanProblem,
            createdAt: item.donationForm.createdAt,
          } : undefined,
        }));
        setAppointments(mapped);
      } catch (error) {
        setAppointments([]);
      }
      setLoading(false);
    };
    fetchAppointments();
  }, []);

  const getStatusConfig = (status: string) => {
    const configs = {
      Confirmed: { color: 'success', icon: <CheckCircle />, label: 'Đã xác nhận' },
      Completed: { color: 'primary', icon: <CheckCircle />, label: 'Hoàn thành' },
      Cancelled: { color: 'error', icon: <Cancel />, label: 'Đã hủy' },
      Pending: { color: 'warning', icon: <Pending />, label: 'Chờ xác nhận' }
    };
    return configs[status as keyof typeof configs];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getFilteredAppointments = () => {
    const statusMap = ['all', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];
    const statusFilter = statusMap[filter];
    
    return appointments.filter(app => {
      const matchesStatus = statusFilter === 'all' || app.Status === statusFilter;
      const matchesSearch = app.Location.toLowerCase().includes(search.toLowerCase()) ||
                           app.Note.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  };

  const getStats = () => {
    return [
      { label: 'Tổng cộng', value: appointments.length, color: 'primary', icon: <EventNote /> },
      { label: 'Hoàn thành', value: appointments.filter(a => a.Status === 'Completed').length, color: 'success', icon: <CheckCircle /> },
      { label: 'Chờ xác nhận', value: appointments.filter(a => a.Status === 'Pending').length, color: 'warning', icon: <Pending /> },
      { label: 'Sắp tới', value: appointments.filter(a => a.Status === 'Confirmed').length, color: 'info', icon: <TrendingUp /> }
    ];
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuId(null);
  };

  const handleAction = (action: string) => {
    const appointment = appointments.find(a => a.AppointmentID === menuId);
    if (!appointment) return;

    setSelectedAppointment(appointment);
    if (action === 'view') setDetailOpen(true);
    else if (action === 'edit') {
      setEditNote(appointment.Note);
      setEditOpen(true);
    } else if (action === 'delete') setDeleteOpen(true);
    handleMenuClose();
  };

  const handleSave = () => {
    if (selectedAppointment) {
      setAppointments(prev => prev.map(app =>
        app.AppointmentID === selectedAppointment.AppointmentID
          ? { ...app, Note: editNote }
          : app
      ));
      setEditOpen(false);
    }
  };

  const handleDelete = () => {
    if (selectedAppointment) {
      setAppointments(prev => prev.filter(app => app.AppointmentID !== selectedAppointment.AppointmentID));
      setDeleteOpen(false);
    }
  };

  const canEdit = (appointment: DonationAppointment) => {
    return ['Pending', 'Confirmed'].includes(appointment.Status);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress size={60} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <FormHeader onRefresh={() => window.location.reload()} onAdd={() => {}} />
          <StatsCards stats={getStats()} />
          <FilterBar search={search} onSearchChange={setSearch} filter={filter} onFilterChange={setFilter} />
          {getFilteredAppointments().length > 0 ? (
            <AppointmentList
              appointments={getFilteredAppointments()}
              getStatusConfig={getStatusConfig}
              onMenuOpen={handleMenuOpen}
              onDetail={(appointment) => { setSelectedAppointment(appointment); setDetailOpen(true); }}
            />
          ) : (
            <EmptyState onAdd={() => {}} />
          )}
          <ContextMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onView={() => handleAction('view')}
            onEdit={() => handleAction('edit')}
            onDelete={() => handleAction('delete')}
            canEdit={menuId ? canEdit(appointments.find(a => a.AppointmentID === menuId)!) : false}
          />
          <AppointmentDetailDialog
            open={detailOpen}
            onClose={() => setDetailOpen(false)}
            appointment={selectedAppointment}
            getStatusConfig={getStatusConfig}
          />
          <EditNoteDialog
            open={editOpen}
            value={editNote}
            onChange={setEditNote}
            onClose={() => setEditOpen(false)}
            onSave={handleSave}
          />
          <DeleteConfirmDialog
            open={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            onDelete={handleDelete}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default BloodDonationDashboard;