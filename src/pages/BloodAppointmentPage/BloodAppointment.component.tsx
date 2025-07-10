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
import PublicAPI from '../../api/public-api';
import { DonationAppointmentDTO } from '../../dtos/request/BloodAppointment/blood-appointment-request.dto';

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
    primary: { main: '#ef4444' },
    secondary: { main: '#f97316' }
  }
});

const steps = ['Thông tin cá nhân', 'Khám sức khỏe', 'Chọn lịch hẹn', 'Xác nhận'];
const stepIcons = [Person, Favorite, CalendarToday, CheckCircle];
const timeSlots = ['08:00 - 10:00', '10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00'];

const healthQuestions = [
  { key: 'illness', label: 'Bạn có đang mắc bệnh gì không?', options: ['Không có', 'Cao huyết áp', 'Tiểu đường', 'Bệnh tim mạch', 'Hen suyễn', 'Dị ứng', 'Khác'] },
  { key: 'dangerousIllness', label: 'Bạn có từng mắc các bệnh nguy hiểm không?', options: ['Không có', 'HIV/AIDS', 'Viêm gan B', 'Viêm gan C', 'Lao phổi', 'Giang mai', 'Ung thư', 'Khác'] },
  { key: 'twelveMonthProblem', label: 'Trong 12 tháng qua, bạn có gặp vấn đề gì không?', options: ['Không có', 'Phẫu thuật', 'Truyền máu', 'Xăm mình/xỏ khuyên', 'Điều trị nha khoa lớn', 'Chích ngừa vaccine', 'Khác'] },
  { key: 'sixMonthProblem', label: 'Trong 6 tháng qua, bạn có gặp vấn đề gì không?', options: ['Không có', 'Uống thuốc kháng sinh', 'Tiêm vaccine', 'Điều trị y tế', 'Du lịch vùng dịch tễ', 'Khác'] },
  { key: 'oneMonthProblem', label: 'Trong 1 tháng qua, bạn có gặp vấn đề gì không?', options: ['Không có', 'Cảm cúm, sốt', 'Tiêu chảy', 'Viêm họng', 'Đau đầu thường xuyên', 'Mất ngủ', 'Khác'] },
  { key: 'fourteenDayProblem', label: 'Trong 14 ngày qua, bạn có gặp vấn đề gì không?', options: ['Không có', 'Đau răng', 'Viêm họng nhẹ', 'Sốt nhẹ', 'Căng thẳng, stress', 'Khác'] },
  { key: 'sevenDayProblem', label: 'Trong 7 ngày qua, bạn có gặp vấn đề gì không?', options: ['Không có', 'Uống rượu bia', 'Thức khuya', 'Tập thể dục quá sức', 'Ăn uống không điều độ', 'Khác'] },
  { key: 'womanProblem', label: 'Dành cho nữ giới (nếu có)', options: ['Không áp dụng', 'Đang có thai', 'Cho con bú', 'Đang trong kỳ kinh nguyệt', 'Sử dụng thuốc tránh thai', 'Khác'] }
];

const BloodAppointment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [donationScheduleID, setDonationScheduleID] = useState<number | null>(null);
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [note, setNote] = useState('');
  const [otherTimeReason, setOtherTimeReason] = useState('');
  const [formData, setFormData] = useState<DonationFormData>({
    userID: 3,
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
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (questionKey: string, option: string, checked: boolean) => {
    setFormData(prev => {
      const current = prev[questionKey as keyof DonationFormData] as string[];
      const noneOption = questionKey === 'womanProblem' ? 'Không áp dụng' : 'Không có';
      let updated = current;
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

  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};
    if (step === 1) {
      if (formData.isDonated && !formData.illness.length) {
        newErrors.illness = 'Vui lòng chọn ít nhất một tùy chọn';
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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const scheduledDate = selectedDate;
      const getString = (arr: string[], other: string, fallback: string) => {
        let str = arr.length > 0 ? arr.join(', ') : fallback;
        if (arr.includes('Khác') && other) str += (str ? ', ' : '') + 'Khác: ' + other;
        return str;
      };
      const dto = {
        donationScheduleID: donationScheduleID ?? 1,
        status: 'pending',
        location: location,
        note: note,
        scheduledDate: scheduledDate,
        donationForm: {
          userID: formData.userID,
          isDonated: formData.isDonated,
          lastDonationDate: formData.lastDonationDate,
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
      await PublicAPI.createDonationAppointment(dto);
      alert('Đăng ký hiến máu thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
      setCurrentStep(0);
      setSelectedDate('');
      setSelectedTimeSlot('');
      setOtherTimeReason('');
      setNote('');
      setLocation('');
      setFormData({
        userID: 3,
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
    } catch (error: any) {
      alert('Đăng ký thất bại: ' + (error?.message || 'Lỗi không xác định'));
    } finally {
      setLoading(false);
    }
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
            setSelectedTimeSlot={(slot: string) => {
              setSelectedTimeSlot(slot);
              const idx = timeSlots.findIndex(s => s === slot);
              setDonationScheduleID(idx !== -1 ? idx + 1 : null);
            }}
            errors={errors}
            timeSlots={timeSlots}
            note={note}
            setNote={setNote}
            otherTimeReason={otherTimeReason}
            setOtherTimeReason={setOtherTimeReason}
            location={location}
            setLocation={setLocation}
          />
        );
      case 3:
        return (
          <StepConfirmation
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
            note={note}
            location={location}
          />
        );
      default:
        return null;
    }
  };

  return (
<ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'linear-gradient(135deg, #fef2f2 0%, #fdf2f8 100%)', minHeight: '100vh', py: 0 , width: '100%'}}>
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