import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Box,
  Alert,
  FormHelperText,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  Divider,
  Badge,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  ArrowBack as ArrowBackIcon,
  Bloodtype as BloodtypeIcon,
  Emergency as EmergencyIcon,
  Schedule as ScheduleIcon,
  Send as SendIcon,
  Person as PersonIcon,
  LocationOn as LocationOnIcon,
  Info as InfoIcon,
  Phone as PhoneIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  LocalHospital as HospitalIcon,
  Favorite as HeartIcon,
} from '@mui/icons-material';

const bloodGroups = [
  { id: 1, name: 'A+', compatibility: 'A+, A-, O+, O-', color: '#e57373' },
  { id: 2, name: 'A-', compatibility: 'A-, O-', color: '#f06292' },
  { id: 3, name: 'B+', compatibility: 'B+, B-, O+, O-', color: '#ba68c8' },
  { id: 4, name: 'B-', compatibility: 'B-, O-', color: '#9575cd' },
  { id: 5, name: 'AB+', compatibility: 'All types', color: '#64b5f6' },
  { id: 6, name: 'AB-', compatibility: 'AB-, A-, B-, O-', color: '#4fc3f7' },
  { id: 7, name: 'O+', compatibility: 'O+, O-', color: '#4db6ac' },
  { id: 8, name: 'O-', compatibility: 'O- only', color: '#81c784' },
];

const urgencyLevels = [
  { value: 'Critical', label: 'Critical - Immediate Need', icon: '🚨', color: '#f44336' },
  { value: 'Urgent', label: 'Urgent - Within 24 hours', icon: '⚡', color: '#ff9800' },
  { value: 'Normal', label: 'Normal - Within 3-7 days', icon: '📅', color: '#4caf50' },
];

const statusOptions = [
  'Pending',
  'Approved',
  'In Progress',
  'Completed',
  'Cancelled'
];

const steps = ['Request Details', 'Location & Time', 'Review & Submit'];

export default function CreateBloodRequest() {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState({
    requesterID: 1, // Default user ID - in real app this would come from auth context
    bloodGroupID: '',
    volume: '',
    urgencyLevel: 'Normal',
    neededDate: null,
    status: 'Pending',
    location: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleDateChange = (date) => {
    setForm(prev => ({ ...prev, neededDate: date }));
    setErrors(prev => ({ ...prev, neededDate: '' }));
  };

  const validate = () => {
    const newErr = {};
    if (!form.bloodGroupID) newErr.bloodGroupID = 'Please select a blood group';
    if (!form.volume || form.volume <= 0 || form.volume > 2000) {
      newErr.volume = 'Enter valid volume (1-2000 ml)';
    }
    if (!form.neededDate) newErr.neededDate = 'Please select needed date';
    if (form.neededDate && form.neededDate < new Date()) {
      newErr.neededDate = 'Date cannot be in the past';
    }
    if (!form.location.trim()) newErr.location = 'Please enter location';
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!form.bloodGroupID || !form.volume || !form.urgencyLevel) return;
    }
    if (activeStep === 1) {
      if (!form.neededDate || !form.location.trim()) return;
    }
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 2000));

      // Success
      alert('Blood request submitted successfully! You will be notified when a donor is found.');
      setForm({
        requesterID: 1,
        bloodGroupID: '',
        volume: '',
        urgencyLevel: 'Normal',
        neededDate: null,
        status: 'Pending',
        location: '',
        notes: '',
      });
      setActiveStep(0);
    } catch (error) {
      alert('Error submitting request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedGroup = bloodGroups.find(bg => bg.id === parseInt(form.bloodGroupID));
  const selectedUrgency = urgencyLevels.find(u => u.value === form.urgencyLevel);

  const getStepContent = (step) => {
    switch (step) {
    case 0:
      return (
        <Box>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <BloodtypeIcon sx={{ mr: 1, color: '#d32f2f' }} />
            Blood Type & Volume
          </Typography>

          <FormControl fullWidth error={!!errors.bloodGroupID} sx={{ mb: 3 }}>
            <InputLabel>Blood Group Required *</InputLabel>
            <Select
              value={form.bloodGroupID}
              label="Blood Group Required *"
              onChange={handleChange('bloodGroupID')}
            >
              {bloodGroups.map(bg => (
                <MenuItem key={bg.id} value={bg.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        mr: 2,
                        backgroundColor: bg.color,
                        fontSize: '0.875rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {bg.name}
                    </Avatar>
                    {bg.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.bloodGroupID}</FormHelperText>
          </FormControl>

          {selectedGroup && (
            <Alert
              severity="info"
              sx={{ mb: 3 }}
              icon={<InfoIcon />}
            >
              <Typography variant="subtitle2" gutterBottom>
                <strong>Compatible Blood Types:</strong>
              </Typography>
              <Typography variant="body2">
                {selectedGroup.compatibility}
              </Typography>
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Volume Required (ml) *"
                value={form.volume}
                onChange={handleChange('volume')}
                error={!!errors.volume}
                helperText={errors.volume || 'Standard unit: 450ml'}
                InputProps={{
                  endAdornment: <Typography variant="body2" color="textSecondary">ml</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Urgency Level *</InputLabel>
                <Select
                  value={form.urgencyLevel}
                  label="Urgency Level *"
                  onChange={handleChange('urgencyLevel')}
                >
                  {urgencyLevels.map(u => (
                    <MenuItem key={u.value} value={u.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ mr: 1 }}>{u.icon}</Typography>
                        <Box>
                          <Typography variant="body1">{u.label}</Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      );

    case 1:
      return (
        <Box>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <LocationOnIcon sx={{ mr: 1, color: '#1976d2' }} />
            Location & Timing
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="When do you need the blood? *"
              value={form.neededDate}
              onChange={handleDateChange}
              minDateTime={new Date()}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  error={!!errors.neededDate}
                  helperText={errors.neededDate}
                  sx={{ mb: 3 }}
                />
              )}
            />
          </LocalizationProvider>

          <TextField
            fullWidth
            label="Hospital/Location *"
            placeholder="Enter hospital name or full address"
            value={form.location}
            onChange={handleChange('location')}
            error={!!errors.location}
            helperText={errors.location || 'Be specific to help donors find you'}
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: <HospitalIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />

          <TextField
            fullWidth
            label="Additional Notes"
            multiline
            rows={4}
            placeholder="Any additional information for potential donors (medical conditions, contact preferences, etc.)"
            value={form.notes}
            onChange={handleChange('notes')}
          />
        </Box>
      );

    case 2:
      return (
        <Box>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <CheckCircleIcon sx={{ mr: 1, color: '#4caf50' }} />
            Review Your Request
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BloodtypeIcon sx={{ mr: 1, color: selectedGroup?.color }} />
                    <Box>
                      <Typography variant="subtitle2" color="textSecondary">
                        Blood Group
                      </Typography>
                      <Typography variant="h6">
                        {selectedGroup?.name || 'Not selected'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ mr: 1, fontSize: '1.5rem' }}>💉</Typography>
                    <Box>
                      <Typography variant="subtitle2" color="textSecondary">
                        Volume
                      </Typography>
                      <Typography variant="h6">
                        {form.volume ? `${form.volume} ml` : 'Not specified'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ mr: 1, fontSize: '1.5rem' }}>
                      {selectedUrgency?.icon}
                    </Typography>
                    <Box>
                      <Typography variant="subtitle2" color="textSecondary">
                        Urgency
                      </Typography>
                      <Chip
                        label={form.urgencyLevel}
                        color={form.urgencyLevel === 'Critical' ? 'error' :
                          form.urgencyLevel === 'Urgent' ? 'warning' : 'success'}
                        size="small"
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ScheduleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="subtitle2" color="textSecondary">
                        Needed By
                      </Typography>
                      <Typography variant="body1">
                        {form.neededDate ? form.neededDate.toLocaleString() : 'Not specified'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <LocationOnIcon sx={{ mr: 1, color: 'text.secondary', mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="textSecondary">
                        Location
                      </Typography>
                      <Typography variant="body1">
                        {form.location || 'Not specified'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                {form.notes && (
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      Additional Notes
                    </Typography>
                    <Typography variant="body2">
                      {form.notes}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>

          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Important Reminders:
            </Typography>
            <Typography variant="body2" component="div">
              • Ensure all medical requirements are verified by healthcare professionals
              • Emergency requests are prioritized in the matching system
              • You will receive notifications when potential donors are found
              • All donations are voluntary and follow medical safety protocols
            </Typography>
          </Alert>
        </Box>
      );

    default:
      return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ color: 'white', mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                Create Blood Request
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Connect with donors in your community
              </Typography>
            </Box>
          </Box>
          <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 64, height: 64 }}>
            <HeartIcon sx={{ fontSize: 32, color: 'white' }} />
          </Avatar>
        </Box>
      </Paper>

      {/* Progress Stepper */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Grid container spacing={4}>
        {/* Main Form */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 4 }}>
            {loading && <LinearProgress sx={{ mb: 2 }} />}

            <Box component="form" onSubmit={handleSubmit}>
              {getStepContent(activeStep)}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>

                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                    disabled={loading}
                    sx={{
                      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    }}
                  >
                    {loading ? 'Submitting...' : 'Submit Request'}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* Emergency Contact */}
            <Grid item xs={12}>
              <Card sx={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                color: 'white'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EmergencyIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">Emergency Support</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Need immediate assistance?
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">1800-BLOOD-1</Typography>
                  </Box>
                  <Typography variant="caption">Available 24/7</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Blood Compatibility Chart */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <InfoIcon sx={{ mr: 1, color: 'primary.main' }} />
                    Blood Type Guide
                  </Typography>
                  <Grid container spacing={1}>
                    {bloodGroups.map(bg => (
                      <Grid item xs={6} key={bg.id}>
                        <Chip
                          avatar={
                            <Avatar sx={{ backgroundColor: bg.color }}>
                              {bg.name}
                            </Avatar>
                          }
                          label={bg.name}
                          variant="outlined"
                          size="small"
                          sx={{ width: '100%' }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Process Info */}
            <Grid item xs={12}>
              <Card sx={{ bgcolor: 'primary.50' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    How It Works
                  </Typography>
                  <Box sx={{ pl: 0 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      1️⃣ Submit your blood request
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      2️⃣ Our system matches you with donors
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      3️⃣ Donors are notified automatically
                    </Typography>
                    <Typography variant="body2">
                      4️⃣ Coordinate donation with matched donors
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}