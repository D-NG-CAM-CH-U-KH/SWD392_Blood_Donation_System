import React, { useState } from 'react';
import { Box, Paper, Container, ThemeProvider, createTheme } from '@mui/material';
import { Person, Favorite, CalendarToday, CheckCircle } from '@mui/icons-material';

import FormHeader from './components/FormHeader';
import StepperHeader from './components/StepperHeader';
import StepPersonalInfo from './components/StepPersonalInfo';
import StepHealthCheck from './components/StepHealthCheck';
import StepAppointment from './components/StepAppointment';
import StepConfirmation from './components/StepConfirmation';
import NavigationButtons from './components/NavigationButtons';

export interface DonationFormData {
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

const theme = createTheme({
  palette: {
    primary: { main: '#ef4444' },
    secondary: { main: '#f97316' }
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

const BloodAppointment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [note, setNote] = useState('');
  const [formData, setFormData] = useState<DonationFormData>({
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
  });

  const handleCheckboxChange = (questionKey: string, option: string, checked: boolean) => {
    setFormData(prev => {
      const current = prev[questionKey as keyof DonationFormData] as string[];
      const updated = checked ? [...current, option] : current.filter(opt => opt !== option);
      return { ...prev, [questionKey]: updated };
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};
    if (step === 1) {
      if (formData.IsDonated && !formData.LastDonationDate) {
        newErrors.LastDonationDate = 'Vui lòng nhập ngày hiến máu gần nhất';
      }
      if (formData.LastDonationDate) {
        const lastDonation = new Date(formData.LastDonationDate);
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        if (lastDonation > threeMonthsAgo) {
          newErrors.LastDonationDate = 'Bạn phải chờ ít nhất 3 tháng từ lần hiến máu cuối';
        }
      }
      healthQuestions.forEach(q => {
        const value = formData[q.key as keyof DonationFormData] as string[];
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
    setNote('');
    setFormData({
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
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <StepPersonalInfo />;
      case 1:
        return (
          <StepHealthCheck
            formData={formData}
            errors={errors}
            healthQuestions={healthQuestions}
            setFormData={setFormData}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      case 2:
        return (
          <StepAppointment
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTimeSlot={selectedTimeSlot}
            setSelectedTimeSlot={setSelectedTimeSlot}
            errors={errors}
            timeSlots={timeSlots}
            note={note}
            setNote={setNote}
          />
        );
      case 3:
        return (
          <StepConfirmation
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
            note={note}
          />
        );
      default:
        return null;
    }
  };

  return (
<ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'linear-gradient(135deg, #fef2f2 0%, #fdf2f8 100%)', minHeight: '100vh', py: 0 }}>
        <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 85px)' }}>
          <Box sx={{ flex: 1, py: 4 }}>
            <Container maxWidth="md">
              <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <FormHeader />
                <StepperHeader steps={steps} stepIcons={stepIcons} currentStep={currentStep} />
                <Box sx={{ minHeight: 400 }}>
                  {renderStepContent()}
                </Box>
                <NavigationButtons
                  currentStep={currentStep}
                  stepsLength={steps.length}
                  handleBack={handleBack}
                  handleNext={handleNext}
                  handleSubmit={handleSubmit}
                />
              </Paper>
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default BloodAppointment;