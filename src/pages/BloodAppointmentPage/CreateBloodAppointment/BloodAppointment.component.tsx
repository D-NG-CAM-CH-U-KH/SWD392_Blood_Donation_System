import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Container, ThemeProvider, createTheme, Dialog, DialogTitle, 
  DialogContent, DialogActions, Button, Typography, CircularProgress, Alert
} from '@mui/material';
import { Person, Favorite, CalendarToday, CheckCircle, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import FormHeader from './components/FormHeader';
import StepperHeader from './components/StepperHeader';
import StepPersonalInfo from './components/StepPersonalInfo';
import StepHealthCheck from './components/StepHealthCheck';
import StepAppointment from './components/StepAppointment';
import StepConfirmation from './components/StepConfirmation';
import { NavigationButtons } from './components/NavigationButtons';
import PublicAPI from '../../../api/public-api';
import PrivateAPI from '../../../api/private-api';
import { DonationAppointmentDTO } from '../../../dtos/request/BloodAppointment/blood-appointment-request.dto';
import { HealthQuestion } from '../../../types/health.types';

export interface DonationFormData {
  userID: number;
  isDonated: boolean;
  lastDonationDate: string;
  illness: string[];
  illnessOther: string;
  dangerousIllness: string[];
  dangerousIllnessOther: string;
  twelveMonthProblem: string[];
  twelveMonthProblemOther: string;
  sixMonthProblem: string[];
  sixMonthProblemOther: string;
  oneMonthProblem: string[];
  oneMonthProblemOther: string;
  fourteenDayProblem: string[];
  fourteenDayProblemOther: string;
  sevenDayProblem: string[];
  sevenDayProblemOther: string;
  womanProblem: string[];
  womanProblemOther: string;
}

const theme = createTheme({
  palette: {
    primary: { main: '#d32f2f' },
    secondary: { main: '#f44336' },
    success: { main: '#4caf50' },
    error: { main: '#f44336' },
    warning: { main: '#ff9800' }
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

const steps = ['Thông tin cá nhân', 'Khám sức khỏe', 'Chọn lịch hẹn', 'Xác nhận'];
const stepIcons = [Person, Favorite, CalendarToday, CheckCircle];
const timeSlots = ['08:00 - 10:00', '10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00'];

const healthQuestions: HealthQuestion[] = [
  { 
    key: 'illness', 
    label: 'Bạn có đang mắc bệnh gì không?', 
    options: ['Không có', 'Cao huyết áp', 'Tiểu đường', 'Bệnh tim mạch', 'Hen suyễn', 'Dị ứng', 'Khác'],
    required: true,
    description: 'Chọn tất cả các bệnh mà bạn đang mắc phải'
  },
  { 
    key: 'dangerousIllness', 
    label: 'Bạn có từng mắc các bệnh nguy hiểm không?', 
    options: ['Không có', 'HIV/AIDS', 'Viêm gan B', 'Viêm gan C', 'Lao phổi', 'Giang mai', 'Ung thư', 'Khác'],
    required: true,
    description: 'Các bệnh này có thể ảnh hưởng đến khả năng hiến máu'
  },
  { 
    key: 'twelveMonthProblem', 
    label: 'Trong 12 tháng qua, bạn có gặp vấn đề gì không?', 
    options: ['Không có', 'Phẫu thuật', 'Truyền máu', 'Xăm mình/xỏ khuyên', 'Điều trị nha khoa lớn', 'Chích ngừa vaccine', 'Khác'],
    required: true
  },
  { 
    key: 'sixMonthProblem', 
    label: 'Trong 6 tháng qua, bạn có gặp vấn đề gì không?', 
    options: ['Không có', 'Uống thuốc kháng sinh', 'Tiêm vaccine', 'Điều trị y tế', 'Du lịch vùng dịch tễ', 'Khác'],
    required: true
  },
  { 
    key: 'oneMonthProblem', 
    label: 'Trong 1 tháng qua, bạn có gặp vấn đề gì không?', 
    options: ['Không có', 'Cảm cúm, sốt', 'Tiêu chảy', 'Viêm họng', 'Đau đầu thường xuyên', 'Mất ngủ', 'Khác'],
    required: true
  },
  { 
    key: 'fourteenDayProblem', 
    label: 'Trong 14 ngày qua, bạn có gặp vấn đề gì không?', 
    options: ['Không có', 'Đau răng', 'Viêm họng nhẹ', 'Sốt nhẹ', 'Căng thẳng, stress', 'Khác'],
    required: true
  },
  { 
    key: 'sevenDayProblem', 
    label: 'Trong 7 ngày qua, bạn có gặp vấn đề gì không?', 
    options: ['Không có', 'Uống rượu bia', 'Thức khuya', 'Tập thể dục quá sức', 'Ăn uống không điều độ', 'Khác'],
    required: true
  },
  { 
    key: 'womanProblem', 
    label: 'Dành cho nữ giới (nếu có)', 
    options: ['Không áp dụng', 'Đang có thai', 'Cho con bú', 'Đang trong kỳ kinh nguyệt', 'Sử dụng thuốc tránh thai', 'Khác'],
    required: true,
    description: 'Nam giới chọn "Không áp dụng"'
  }
];

const BloodAppointment: React.FC = () => {
  // State management
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [donationScheduleID, setDonationScheduleID] = useState<number | null>(null);
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [note, setNote] = useState('');
  const [otherTimeReason, setOtherTimeReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [canProceedToNext, setCanProceedToNext] = useState(false);
  const [bloodVolume, setBloodVolume] = useState<number>(450);
  const [selectedDonationScheduleId, setSelectedDonationScheduleId] = useState<number | null>(null);
  
  const navigate = useNavigate();

  // Initialize form data with current user ID
  const [formData, setFormData] = useState<DonationFormData>({
    userID: 0, // Will be set from API
    isDonated: false,
    lastDonationDate: '',
    illness: [],
    illnessOther: '',
    dangerousIllness: [],
    dangerousIllnessOther: '',
    twelveMonthProblem: [],
    twelveMonthProblemOther: '',
    sixMonthProblem: [],
    sixMonthProblemOther: '',
    oneMonthProblem: [],
    oneMonthProblemOther: '',
    fourteenDayProblem: [],
    fourteenDayProblemOther: '',
    sevenDayProblem: [],
    sevenDayProblemOther: '',
    womanProblem: [],
    womanProblemOther: ''
  });

  // Fetch current user on component mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setUserLoading(true);
        const userData = await PrivateAPI.getUserByToken();
        setCurrentUser(userData);
        setFormData(prev => ({ ...prev, userID: parseInt(userData.userID) }));
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setErrors({ general: 'Không thể tải thông tin người dùng. Vui lòng đăng nhập lại.' });
      } finally {
        setUserLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Checkbox change handler
  const handleCheckboxChange = (questionKey: string, option: string, checked: boolean) => {
    setFormData(prev => {
      const current = prev[questionKey as keyof DonationFormData] as string[];
      const noneOption = questionKey === 'womanProblem' ? 'Không áp dụng' : 'Không có';
      let updated = current || [];
      
      if (checked) {
        if (option === noneOption) {
          updated = [noneOption];
        } else {
          updated = [...current.filter(opt => opt !== noneOption), option];
        }
      } else {
        updated = current.filter(opt => opt !== option);
      }
      
      if (option === 'Khác' && !checked) {
        return { ...prev, [questionKey]: updated, [`${questionKey}Other`]: '' };
      }
      
      return { ...prev, [questionKey]: updated };
    });
  };

  // Step validation
  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (step === 1) {
      // Validate health questions
      healthQuestions.forEach(q => {
        const value = formData[q.key as keyof DonationFormData] as string[];
        if (q.required && (!value || value.length === 0)) {
          newErrors[q.key] = 'Vui lòng chọn ít nhất một tùy chọn';
        }
        
        // Validate "Khác" option has description
        if (value?.includes('Khác') && !formData[`${q.key}Other` as keyof DonationFormData]) {
          newErrors[`${q.key}Other`] = 'Vui lòng mô tả chi tiết';
        }
      });

      // Validate donation history
      if (formData.isDonated && !formData.lastDonationDate) {
        newErrors.lastDonationDate = 'Vui lòng chọn ngày hiến máu gần nhất';
      }
    }
    
    if (step === 2) {
      if (!selectedDate) newErrors.selectedDate = 'Vui lòng chọn ngày hiến máu';
      if (!selectedTimeSlot) newErrors.selectedTimeSlot = 'Vui lòng chọn khung giờ';
      // if (!location.trim()) newErrors.location = 'Vui lòng nhập địa điểm hiến máu';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation handlers
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  // Form submission
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setLoading(true);
    try {
      const getString = (arr: string[], other: string, fallback: string) => {
        let str = arr.length > 0 ? arr.join(', ') : fallback;
        if (arr.includes('Khác') && other) {
          str += (str === fallback ? '' : ', ') + 'Khác: ' + other;
        }
        return str;
      };
  
      const dto: DonationAppointmentDTO = {
        // ✅ Sử dụng selectedDonationScheduleId thay vì donationScheduleID cũ
        donationScheduleID: selectedDonationScheduleId ?? 1,
        status: 'Confirmed',
        location: location.trim(),
        note: note.trim(),
        scheduledDate: selectedDate,
        bloodVolume: bloodVolume,
        donationForm: {
          userID: formData.userID,
          isDonated: formData.isDonated,
          lastDonationDate: formData.lastDonationDate || null,
          illness: getString(formData.illness, formData.illnessOther, 'Không có'),
          dangerousIllness: getString(formData.dangerousIllness, formData.dangerousIllnessOther, 'Không có'),
          twelveMonthProblem: getString(formData.twelveMonthProblem, formData.twelveMonthProblemOther, 'Không có'),
          sixMonthProblem: getString(formData.sixMonthProblem, formData.sixMonthProblemOther, 'Không có'),
          oneMonthProblem: getString(formData.oneMonthProblem, formData.oneMonthProblemOther, 'Không có'),
          fourteenDayProblem: getString(formData.fourteenDayProblem, formData.fourteenDayProblemOther, 'Không có'),
          sevenDayProblem: getString(formData.sevenDayProblem, formData.sevenDayProblemOther, 'Không có'),
          womanProblem: getString(formData.womanProblem, formData.womanProblemOther, 'Không áp dụng'),
        }
      };
  
      console.log('JSON gửi BE:', JSON.stringify(dto, null, 2));
      console.log('Selected Schedule ID:', selectedDonationScheduleId); // ✅ Debug log
  
      await PublicAPI.createDonationAppointment(dto);
      
      // Reset form and show success
      resetForm();
      setSuccessDialogOpen(true);
    } catch (error: any) {
      console.error('Submission error:', error);
      setErrors({
        general: 'Đăng ký thất bại: ' + (error?.response?.data?.message || error?.message || 'Lỗi không xác định')
      });
    } finally {
      setLoading(false);
    }
  };
  

  // Reset form to initial state
  const resetForm = () => {
    setCurrentStep(0);
    setSelectedDate('');
    setSelectedTimeSlot('');
    setDonationScheduleID(null);
    setOtherTimeReason('');
    setNote('');
    setLocation('');
    setErrors({});
    setFormData({
      userID: currentUser ? parseInt(currentUser.userID) : 0,
      isDonated: false,
      lastDonationDate: '',
      illness: [],
      illnessOther: '',
      dangerousIllness: [],
      dangerousIllnessOther: '',
      twelveMonthProblem: [],
      twelveMonthProblemOther: '',
      sixMonthProblem: [],
      sixMonthProblemOther: '',
      oneMonthProblem: [],
      oneMonthProblemOther: '',
      fourteenDayProblem: [],
      fourteenDayProblemOther: '',
      sevenDayProblem: [],
      sevenDayProblemOther: '',
      womanProblem: [],
      womanProblemOther: ''
    });
  };

  // Render step content
  const renderStepContent = () => {
    if (userLoading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Đang tải thông tin người dùng...
          </Typography>
        </Box>
      );
    }

    if (!currentUser) {
      return (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="body1" fontWeight={600}>
            Không thể tải thông tin người dùng. Vui lòng đăng nhập lại.
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={() => navigate('/login')}
            sx={{ mt: 2 }}
          >
            Đăng nhập
          </Button>
        </Alert>
      );
    }

    switch (currentStep) {
      case 0:
        return (
          <StepPersonalInfo 
            currentUser={currentUser}
            errors={errors}
          />
        );
        case 1:
          return (
            <StepHealthCheck
              formData={formData}
              errors={errors}
              healthQuestions={healthQuestions}
              setFormData={setFormData}
              handleCheckboxChange={handleCheckboxChange}
              onNext={() => setCurrentStep(2)}
              onGoHome={handleGoHome}
              setErrors={setErrors}
              // ✅ Thêm props mới
              canProceedToNext={canProceedToNext}
              setCanProceedToNext={setCanProceedToNext}
            />
          );
          case 2:
            return (
              <StepAppointment
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTimeSlot={selectedTimeSlot}
                setSelectedTimeSlot={setSelectedTimeSlot}
                // ✅ Thêm prop này
                setSelectedDonationScheduleId={setSelectedDonationScheduleId}
                
                errors={errors}
                note={note}
                setNote={setNote}
                location={location}
                setLocation={setLocation}
                bloodVolume={bloodVolume}
                setBloodVolume={setBloodVolume}
              />
            );
          
            case 3:
              return (
                <StepConfirmation
                  selectedDate={selectedDate}
                  selectedTimeSlot={selectedTimeSlot}
                  note={note}
                  location={location}
                  formData={formData}
                  currentUser={currentUser}
                  // ✅ Truyền đúng Schedule ID đã chọn
                  selectedDonationScheduleId={selectedDonationScheduleId}
                  bloodVolume={bloodVolume}
                />
              );
            
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        background: 'linear-gradient(135deg, #fef2f2 0%, #fdf2f8 100%)',
        minHeight: '100vh',
        py: { xs: 2, md: 4 },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: { xs: 2, sm: 3, md: 4 } }}>
          <Paper elevation={6} sx={{
            p: { xs: 3, sm: 4, md: 6 },
            borderRadius: 4,
            width: '100%',
            maxWidth: { xs: '100%', sm: 900, md: 900, lg: 900 }, 
            mx: 'auto',
            boxShadow: '0 8px 32px 0 rgba(211,47,47,0.12)',
            background: 'rgba(255,255,255,0.98)',
            position: 'relative'
          }}>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <FormHeader />
            </Box>
            
            <StepperHeader 
              steps={steps} 
              stepIcons={stepIcons} 
              currentStep={currentStep} 
            />
            
            {/* General Error Alert */}
            {errors.general && (
              <Alert 
                severity="error" 
                sx={{ mb: 3 }} 
                onClose={() => setErrors(prev => ({ ...prev, general: '' }))}
              >
                {errors.general}
              </Alert>
            )}
            
            <Box sx={{ 
              minHeight: { xs: 500, md: 600 }, 
              py: 3, 
              px: { xs: 1, sm: 3, md: 4 } 
            }}>
              {renderStepContent()}
            </Box>
            
            {!userLoading && currentUser && (
              <Box sx={{ mt: 3 }}>
  <NavigationButtons
    currentStep={currentStep}
    stepsLength={steps.length}
    handleBack={handleBack}
    handleNext={handleNext}
    handleSubmit={handleSubmit}
    loading={loading}
    canProceedToNext={canProceedToNext} // ✅ Thêm prop này
  />
              </Box>
            )}
            
            {loading && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                mt: 2,
                gap: 2
              }}>
                <CircularProgress color="primary" size={24} />
                <Typography variant="body2" color="text.secondary">
                  Đang xử lý đăng ký...
                </Typography>
              </Box>
            )}
          </Paper>
        </Container>

        {/* Success Dialog */}
        <Dialog 
          open={successDialogOpen} 
          onClose={() => setSuccessDialogOpen(false)} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 }
          }}
        >
          <DialogTitle sx={{ textAlign: 'center', pb: 0 }}>
            <CheckCircle sx={{ color: 'success.main', fontSize: 64, mb: 1 }} />
            <Typography variant="h4" fontWeight={700} mt={1} color="primary.main">
              Đăng ký thành công!
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', pt: 2, pb: 2 }}>
            <Typography variant="body1" color="text.secondary" mb={2}>
              Cảm ơn bạn đã đăng ký hiến máu tình nguyện.<br />
              Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận lịch hẹn.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bạn có thể theo dõi trạng thái đăng ký trong mục "Lịch sử hiến máu".
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 3, gap: 2 }}>
            <Button
              onClick={() => { 
                setSuccessDialogOpen(false); 
                navigate('/home'); 
              }}
              variant="outlined"
              color="primary"
              startIcon={<Home />}
              sx={{ minWidth: 140 }}
            >
              Về trang chủ
            </Button>
            <Button
              onClick={() => { 
                setSuccessDialogOpen(false); 
                navigate('/blood-donation/view-all'); 
              }}
              variant="contained"
              color="primary"
              sx={{ minWidth: 180 }}
            >
              Xem lịch sử hiến máu
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default BloodAppointment;
