import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepIcon,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  Radio,
  Grid,
  Alert,
  AlertTitle,
  Card,
  CardContent,
  Chip,
  Divider,
  Container
} from '@mui/material';
import {
  Person,
  Favorite,
  CalendarToday,
  CheckCircle,
  Info,
  Warning
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#ef4444' },
    secondary: { main: '#f97316' }
  }
});

interface DonationFormData {
  FormID: number;
  UserID: number;
  IsDonated: boolean;
  LastDonationDate: string;
  Illness: string[];
  IllnessOther: string;
  DangerousIllness: string[];
  DangerousIllnessOther: string;
  TwelveMonthProblem: string[];
  TwelveMonthProblemOther: string;
  SixMonthProblem: string[];
  SixMonthProblemOther: string;
  OneMonthProblem: string[];
  OneMonthProblemOther: string;
  FourteenDayProblem: string[];
  FourteenDayProblemOther: string;
  SevenDayProblem: string[];
  SevenDayProblemOther: string;
  WomanProblem: string[];
  WomanProblemOther: string;
}

interface DonationAppointmentData {
  UserID: number;
  ScheduledDate: string;
  Status: string;
  Location: string;
  Note: string;
  DonationForm: DonationFormData;
}

const BloodDonationRegistration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const [formData, setFormData] = useState<DonationAppointmentData>({
    UserID: 0,
    ScheduledDate: '',
    Status: 'Pending',
    Location: '',
    Note: '',
    DonationForm: {
      FormID: 0,
      UserID: 0,
      IsDonated: false,
      LastDonationDate: '',
      Illness: [],
      IllnessOther: '',
      DangerousIllness: [],
      DangerousIllnessOther: '',
      TwelveMonthProblem: [],
      TwelveMonthProblemOther: '',
      SixMonthProblem: [],
      SixMonthProblemOther: '',
      OneMonthProblem: [],
      OneMonthProblemOther: '',
      FourteenDayProblem: [],
      FourteenDayProblemOther: '',
      SevenDayProblem: [],
      SevenDayProblemOther: '',
      WomanProblem: [],
      WomanProblemOther: ''
    }
  });

  const steps = ['Thông tin cá nhân', 'Khám sức khỏe', 'Chọn lịch hẹn', 'Xác nhận'];
  const stepIcons = [Person, Favorite, CalendarToday, CheckCircle];
  const timeSlots = ['08:00 - 10:00', '10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00'];

  const healthQuestions = [
    { key: 'Illness', label: 'Bạn có đang mắc bệnh gì không?', options: ['Không có bệnh gì', 'Cao huyết áp', 'Tiểu đường', 'Bệnh tim mạch', 'Hen suyễn', 'Dị ứng'] },
    { key: 'DangerousIllness', label: 'Bạn có từng mắc các bệnh nguy hiểm không?', options: ['Không có', 'HIV/AIDS', 'Viêm gan B', 'Viêm gan C', 'Lao phổi', 'Giang mai', 'Ung thư'] },
    { key: 'TwelveMonthProblem', label: 'Trong 12 tháng qua, bạn có gặp vấn đề gì không?', options: ['Không có', 'Phẫu thuật', 'Truyền máu', 'Xăm mình/xỏ khuyên', 'Điều trị nha khoa lớn', 'Chích ngừa vaccine'] },
    { key: 'SixMonthProblem', label: 'Trong 6 tháng qua, bạn có gặp vấn đề gì không?', options: ['Không có', 'Uống thuốc kháng sinh', 'Tiêm vaccine', 'Điều trị y tế', 'Du lịch vùng dịch tễ'] },
    { key: 'OneMonthProblem', label: 'Trong 1 tháng qua, bạn có gặp vấn đề gì không?', options: ['Không có', 'Cảm cúm, sốt', 'Tiêu chảy', 'Viêm họng', 'Đau đầu thường xuyên', 'Mất ngủ'] },
    { key: 'FourteenDayProblem', label: 'Trong 14 ngày qua, bạn có gặp vấn đề gì không?', options: ['Không có', 'Đau răng', 'Viêm họng nhẹ', 'Sốt nhẹ', 'Căng thẳng, stress'] },
    { key: 'SevenDayProblem', label: 'Trong 7 ngày qua, bạn có gặp vấn đề gì không?', options: ['Không có', 'Uống rượu bia', 'Thức khuya', 'Tập thể dục quá sức', 'Ăn uống không điều độ'] },
    { key: 'WomanProblem', label: 'Dành cho nữ giới (nếu có)', options: ['Không áp dụng', 'Đang có thai', 'Cho con bú', 'Đang trong kỳ kinh nguyệt', 'Sử dụng thuốc tránh thai'] }
  ];

  const handleCheckboxChange = (questionKey: string, option: string, checked: boolean) => {
    setFormData(prev => {
      const current = prev.DonationForm[questionKey as keyof DonationFormData] as string[];
      const updated = checked ? [...current, option] : current.filter(opt => opt !== option);
      return { ...prev, DonationForm: { ...prev.DonationForm, [questionKey]: updated } };
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (step === 1) {
      if (formData.DonationForm.IsDonated && !formData.DonationForm.LastDonationDate) {
        newErrors.LastDonationDate = 'Vui lòng nhập ngày hiến máu gần nhất';
      }
      
      if (formData.DonationForm.LastDonationDate) {
        const lastDonation = new Date(formData.DonationForm.LastDonationDate);
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        if (lastDonation > threeMonthsAgo) {
          newErrors.LastDonationDate = 'Bạn phải chờ ít nhất 3 tháng từ lần hiến máu cuối';
        }
      }
      
      healthQuestions.forEach(q => {
        const value = formData.DonationForm[q.key as keyof DonationFormData] as string[];
        if (!value || value.length === 0) newErrors[q.key] = 'Vui lòng chọn ít nhất một tùy chọn';
      });
    }
    
    if (step === 2) {
      if (!selectedDate) newErrors.selectedDate = 'Vui lòng chọn ngày hiến máu';
      if (!selectedTimeSlot) newErrors.selectedTimeSlot = 'Vui lòng chọn khung giờ';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = () => {
    alert('Đăng ký hiến máu thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
    setCurrentStep(0);
    setSelectedDate('');
    setSelectedTimeSlot('');
  };

  const renderStepContent = () => {
    const StepIcon = stepIcons[currentStep];
    
    switch (currentStep) {
      case 0:
        return (
          <Box textAlign="center">
            <Person sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom>Thông tin cá nhân</Typography>
            <Typography color="text.secondary" paragraph>Xác nhận thông tin cá nhân của bạn</Typography>
            
            <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
              <AlertTitle>Lưu ý quan trọng</AlertTitle>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>Tuổi từ 18-60, cân nặng tối thiểu 45kg</li>
                <li>Không hiến máu trong vòng 3 tháng gần đây</li>
                <li>Sức khỏe tốt, không mắc bệnh truyền nhiễm</li>
                <li>Mang theo CMND/CCCD khi đến hiến máu</li>
              </ul>
            </Alert>

            <Alert severity="success" sx={{ mb: 3, textAlign: 'left' }}>
              <Typography><strong>Thông tin của bạn:</strong></Typography>
              <Typography>Nhóm máu: <strong>AB+</strong></Typography>
            </Alert>

            <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
              <Typography color="text.secondary">
                Thông tin cá nhân sẽ được lấy từ tài khoản đăng nhập của bạn
              </Typography>
            </Paper>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Box textAlign="center" mb={4}>
              <Favorite sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom>Khám sức khỏe</Typography>
              <Typography color="text.secondary">Vui lòng trả lời các câu hỏi về tình trạng sức khỏe</Typography>
            </Box>

            <Card sx={{ mb: 3, bgcolor: 'grey.50' }}>
              <CardContent>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.DonationForm.IsDonated}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        DonationForm: { ...prev.DonationForm, IsDonated: e.target.checked }
                      }))}
                    />
                  }
                  label="Tôi đã từng hiến máu trước đây"
                />
                
                {formData.DonationForm.IsDonated && (
                  <TextField
                    fullWidth
                    type="date"
                    label="Ngày hiến máu gần nhất"
                    value={formData.DonationForm.LastDonationDate}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      DonationForm: { ...prev.DonationForm, LastDonationDate: e.target.value }
                    }))}
                    error={!!errors.LastDonationDate}
                    helperText={errors.LastDonationDate}
                    sx={{ mt: 2 }}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              </CardContent>
            </Card>

            {healthQuestions.map((question, idx) => (
              <Card key={question.key} sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{question.label} *</Typography>
                  <FormGroup>
                    {question.options.map(option => (
                      <FormControlLabel
                        key={option}
                        control={
                          <Checkbox
                            checked={(formData.DonationForm[question.key as keyof DonationFormData] as string[]).includes(option)}
                            onChange={(e) => handleCheckboxChange(question.key, option, e.target.checked)}
                          />
                        }
                        label={option}
                      />
                    ))}
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={(formData.DonationForm[question.key as keyof DonationFormData] as string[]).includes('Khác')}
                            onChange={(e) => handleCheckboxChange(question.key, 'Khác', e.target.checked)}
                          />
                        }
                        label="Khác:"
                      />
                      <TextField
                        size="small"
                        placeholder="Vui lòng mô tả..."
                        disabled={!(formData.DonationForm[question.key as keyof DonationFormData] as string[]).includes('Khác')}
                        value={formData.DonationForm[`${question.key}Other` as keyof DonationFormData] as string}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          DonationForm: { ...prev.DonationForm, [`${question.key}Other`]: e.target.value }
                        }))}
                        sx={{ flexGrow: 1 }}
                      />
                    </Box>
                  </FormGroup>
                  {errors[question.key] && (
                    <Typography color="error" variant="caption">{errors[question.key]}</Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        );

      case 2:
        return (
          <Box>
            <Box textAlign="center" mb={4}>
              <CalendarToday sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom>Đặt lịch hiến máu</Typography>
            </Box>
            <Alert severity="success" sx={{ mb: 3 }}>
              <Typography><strong>Thông tin của bạn:</strong> Nhóm máu: AB+</Typography>
            </Alert>

              <Grid item xs={12} marginBottom={3}>
                <Typography variant="subtitle1" fontWeight={700} mb={1} sx={{ fontSize: 16 }}>Chọn ngày hiến máu</Typography>
                <TextField
                  fullWidth
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  error={!!errors.selectedDate}
                  helperText={errors.selectedDate}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: new Date().toISOString().split('T')[0] }}
                  sx={{
                    fontSize: 16,
                    '& .MuiInputBase-root': { fontSize: 16 },
                    '& .MuiFormHelperText-root': { fontSize: 14 },
                  }}
                />
              </Grid>

              <Grid item xs={12} marginBottom={3}>
                <Typography variant="subtitle1" fontWeight={700} mb={1} sx={{ fontSize: 16 }}>Chọn khung giờ</Typography>
                <Grid container spacing={2}>
                  {timeSlots.map(slot => (
                    <Grid item xs={6} sm={3} key={slot}>
                      <Button
                        fullWidth
                        variant={selectedTimeSlot === slot ? 'contained' : 'outlined'}
                        color={selectedTimeSlot === slot ? 'primary' : 'inherit'}
                        onClick={() => setSelectedTimeSlot(slot)}
                        sx={{
                          py: 2,
                          borderRadius: 2,
                          fontWeight: 500,
                          fontSize: 16,
                        }}
                      >
                        {slot}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
                {errors.selectedTimeSlot && (
                  <Typography color="error" variant="caption" sx={{ fontSize: 14 }}>{errors.selectedTimeSlot}</Typography>
                )}
              </Grid>
              
              <Grid item xs={12} marginBottom={3}>
                <Alert severity="info">
                  <AlertTitle>Lưu ý:</AlertTitle>
                  Vui lòng chọn ngày và giờ phù hợp với lịch trình của bạn. Chúng tôi sẽ liên hệ để xác nhận lịch hẹn trước ngày hiến máu.
                </Alert>
              </Grid>

              <Grid item xs={12} marginBottom={3}>
                <Typography variant="subtitle1" fontWeight={700} mb={1} sx={{ fontSize: 16 }}>Ghi chú thêm</Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  value={formData.Note}
                  onChange={(e) => setFormData(prev => ({ ...prev, Note: e.target.value }))}
                  placeholder="Các yêu cầu đặc biệt hoặc thông tin bổ sung..."
                  sx={{
                    minHeight: 120,
                    width: '100%',
                    fontSize: 16,
                    '& .MuiInputBase-root': {
                      fontSize: 16,
                      borderRadius: 2,
                      padding: '16px 16px',
                    },
                    '& .MuiInputBase-input': {
                      padding: 0,
                    },
                  }}
                />
              </Grid>

          </Box>
        );

      case 3:
        return (
          <Box textAlign="center">
            <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom>Xác nhận thông tin</Typography>
            <Typography color="text.secondary" paragraph>Kiểm tra lại thông tin trước khi hoàn tất đăng ký</Typography>

            <Card sx={{ mb: 3, textAlign: 'left' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <CalendarToday sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Thông tin lịch hẹn
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography><strong>Ngày:</strong></Typography>
                    <Typography>{selectedDate ? new Date(selectedDate).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography><strong>Thời gian:</strong></Typography>
                    <Typography>{selectedTimeSlot}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {formData.Note && (
              <Card sx={{ mb: 3, textAlign: 'left' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Ghi chú</Typography>
                  <Typography>{formData.Note}</Typography>
                </CardContent>
              </Card>
            )}

            <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
              <AlertTitle>Lưu ý cuối cùng</AlertTitle>
              <ul>
                <li>Vui lòng đến đúng giờ hẹn</li>
                <li>Mang theo CMND/CCCD và thẻ BHYT (nếu có)</li>
                <li>Ăn no và uống đủ nước trước khi hiến máu</li>
                <li>Không uống rượu bia 24h trước khi hiến máu</li>
              </ul>
            </Alert>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'linear-gradient(135deg, #fef2f2 0%, #fdf2f8 100%)', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Box textAlign="center" mb={4}>
              <Typography variant="h3" gutterBottom>Đăng ký hiến máu</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Một giọt máu cho đi - Một cuộc đời ở lại
              </Typography>
            </Box>

            <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={() => {
                      const Icon = stepIcons[index];
                      return (
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: currentStep >= index ? 'primary.main' : 'grey.300',
                            color: 'white'
                          }}
                        >
                          <Icon />
                        </Box>
                      );
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ minHeight: 400 }}>
              {renderStepContent()}
            </Box>

            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button
                disabled={currentStep === 0}
                onClick={handleBack}
                variant="outlined"
                size="large"
              >
                Quay lại
              </Button>
              
              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  size="large"
                  color="success"
                >
                  Hoàn tất đăng ký
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  size="large"
                >
                  {currentStep === 2 ? 'Xác nhận' : 'Tiếp tục'}
                </Button>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default BloodDonationRegistration;