import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, Box, Stepper, Step, StepLabel, 
  Button, Typography, Alert, CircularProgress, DialogActions,
  IconButton, Divider
} from '@mui/material';
import { Close, CheckCircle, LocalHospital } from '@mui/icons-material';

import StepHealthCheck from '../../BloodAppointmentPage/CreateBloodAppointment/components/StepHealthCheck';
import StepAppointment from '../../BloodAppointmentPage/CreateBloodAppointment/components/StepAppointment';
import StepConfirmation from '../../BloodAppointmentPage/CreateBloodAppointment/components/StepConfirmation';
import PublicAPI from '../../../api/public-api';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import { DonationFormData } from '../../../types/health.types';

interface BloodDonationRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
  // ✅ Thêm props cho BloodRequest
  request?: any; // BloodRequest object
  currentUserId?: number;
  onSuccess?: (matchingLog: any) => void;
  onError?: (error: string) => void;
}

interface DonationAppointmentDTO {
  donationScheduleID: number;
  status: string;
  location: string;
  note: string;
  scheduledDate: string;
  bloodVolume: number;
  donationForm: any;
  // ✅ Thêm thông tin BloodRequest
  bloodRequestId?: number;
}

const BloodDonationRegistrationDialog: React.FC<BloodDonationRegistrationDialogProps> = ({
  open,
  onClose,
  request, // ✅ BloodRequest object
  currentUserId,
  onSuccess,
  onError
}) => {
  const { user: currentUser, loading: userLoading } = useCurrentUser();

  // ✅ Xác định flow: có request = bỏ qua step appointment
  const isBloodRequestMode = !!request;
  const totalSteps = isBloodRequestMode ? 2 : 3; // Bỏ step 1 nếu có request
  
  const [activeStep, setActiveStep] = useState(0);
  
  // ✅ States cho health form data
  const [formData, setFormData] = useState<DonationFormData>({
    userID: 0,
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

  // ✅ States cho appointment - auto fill từ request
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedDonationScheduleId, setSelectedDonationScheduleId] = useState<number | null>(null);
  const [bloodVolume, setBloodVolume] = useState(450);
  const [note, setNote] = useState('');
  const [location, setLocation] = useState('');
  
  // ✅ States cho UI
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [canProceedToNext, setCanProceedToNext] = useState(false);

  // ✅ Health questions (giữ nguyên)
  const [healthQuestions] = useState([
    {
      key: 'illness',
      label: 'Bạn có đang mắc bệnh gì không?',
      description: 'Bao gồm các bệnh đang điều trị hoặc theo dõi',
      required: true,
      options: ['Không có', 'Cao huyết áp', 'Tiểu đường', 'Bệnh tim', 'Khác']
    },
    {
      key: 'dangerousIllness',
      label: 'Bạn có từng mắc các bệnh nguy hiểm sau đây không?',
      description: 'Các bệnh có thể ảnh hưởng đến an toàn máu hiến',
      required: true,
      options: ['Không có', 'HIV/AIDS', 'Viêm gan B/C', 'Giang mai', 'Lao', 'Khác']
    },
    {
      key: 'twelveMonthProblem',
      label: 'Trong 12 tháng qua, bạn có gặp vấn đề gì không?',
      required: true,
      options: ['Không có', 'Phẫu thuật', 'Nội soi', 'Xăm hình', 'Khoan tai', 'Khác']
    },
    {
      key: 'sixMonthProblem',
      label: 'Trong 6 tháng qua, bạn có gặp vấn đề gì không?',
      required: true,
      options: ['Không có', 'Tiêm phòng', 'Điều trị răng', 'Uống thuốc kháng sinh', 'Khác']
    },
    {
      key: 'oneMonthProblem',
      label: 'Trong 1 tháng qua, bạn có gặp vấn đề gì không?',
      required: true,
      options: ['Không có', 'Sốt cao', 'Cảm cúm', 'Tiêu chảy', 'Khác']
    },
    {
      key: 'fourteenDayProblem',
      label: 'Trong 14 ngày qua, bạn có gặp vấn đề gì không?',
      required: true,
      options: ['Không có', 'Sốt', 'Đau đầu', 'Mệt mỏi', 'Khác']
    },
    {
      key: 'sevenDayProblem',
      label: 'Trong 7 ngày qua, bạn có gặp vấn đề gì không?',
      required: true,
      options: ['Không có', 'Uống rượu bia', 'Thức khuya', 'Stress', 'Khác']
    },
    {
      key: 'womanProblem',
      label: 'Đối với phụ nữ: Tình trạng hiện tại',
      required: true,
      options: ['Không áp dụng', 'Có thai', 'Cho con bú', 'Trong kỳ kinh nguyệt', 'Khác']
    }
  ]);

  // ✅ Steps dựa trên mode
  const steps = isBloodRequestMode 
    ? ['Kiểm tra sức khỏe', 'Xác nhận đăng ký']
    : ['Kiểm tra sức khỏe', 'Chọn lịch hẹn', 'Xác nhận đăng ký'];

  // ✅ Auto fill thông tin từ BloodRequest
  useEffect(() => {
    if (request) {
      // Format date từ request
      const requestDate = new Date(request.neededDate);
      const formattedDate = requestDate.toISOString().split('T')[0]; // YYYY-MM-DD
      const formattedTime = requestDate.toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });

      setSelectedDate(formattedDate);
      setSelectedTimeSlot(`${formattedTime} - ${formattedTime}`); // Placeholder time slot
      setBloodVolume(request.volume || 450);
      setLocation(request.location || '');
      setNote(`Đăng ký hiến máu cho yêu cầu #${request.requestId}`);
      
      // Set dummy schedule ID for BloodRequest mode
      setSelectedDonationScheduleId(-1); // -1 indicates BloodRequest mode
    }
  }, [request]);

  // ✅ Set userID when user loads
  useEffect(() => {
    if (currentUser && currentUser.userID) {
      setFormData(prev => ({
        ...prev,
        userID: currentUser.userID
      }));
    }
  }, [currentUser]);

  // ✅ Reset form khi đóng dialog
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        resetForm();
      }, 300);
    }
  }, [open]);

  const resetForm = () => {
    setActiveStep(0);
    setFormData({
      userID: currentUser?.userID || 0,
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
    
    if (!isBloodRequestMode) {
      setSelectedDate('');
      setSelectedTimeSlot('');
      setSelectedDonationScheduleId(null);
      setBloodVolume(450);
      setNote('');
      setLocation('');
    }
    
    setErrors({});
    setIsSuccess(false);
    setCanProceedToNext(false);
  };

  // ✅ Handle checkbox change for health questions
  const handleCheckboxChange = (questionKey: string, option: string, checked: boolean) => {
    setFormData((prev) => {
      const currentValues = prev[questionKey as keyof DonationFormData] as string[] || [];
      const noneOption = questionKey === 'womanProblem' ? 'Không áp dụng' : 'Không có';
      
      let newValues: string[];
      
      if (option === noneOption) {
        newValues = checked ? [noneOption] : [];
      } else {
        if (checked) {
          newValues = currentValues.includes(noneOption) 
            ? [option] 
            : [...currentValues.filter(v => v !== noneOption), option];
        } else {
          newValues = currentValues.filter(v => v !== option);
        }
      }
      
      return {
        ...prev,
        [questionKey]: newValues
      };
    });
  };

  // ✅ Navigation handlers
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    setErrors({});
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setErrors({});
    setCanProceedToNext(false);
  };

  const handleGoHome = () => {
    onClose();
  };

  // ✅ Final submission - có thể là BloodRequest hoặc thông thường
  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      const getString = (arr: string[], other: string, fallback: string) => {
        let str = arr.length > 0 ? arr.join(', ') : fallback;
        if (arr.includes('Khác') && other) {
          str += (str === fallback ? '' : ', ') + 'Khác: ' + other;
        }
        return str;
      };

      if (isBloodRequestMode && request) {
        // ✅ Mode BloodRequest - gọi API match donor với requester
        const matchingData = {
          requestId: request.requestId,
          donorId: currentUserId || currentUser?.userID,
          donationFormData: {
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
          },
          note: note.trim(),
          scheduledDate: selectedDate,
          volume: bloodVolume
        };

        console.log('BloodRequest matching data:', JSON.stringify(matchingData, null, 2));
        
        // Call blood request matching API
        const result = await PublicAPI.matchBloodRequestDonor(matchingData);
        
        setIsSuccess(true);
        
        // Call success callback
        if (onSuccess) {
          onSuccess(result);
        }
        
      } else {
        // ✅ Mode thông thường - tạo appointment như cũ
        const dto: DonationAppointmentDTO = {
          donationScheduleID: selectedDonationScheduleId!,
          status: 'pending',
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

        console.log('Regular appointment DTO:', JSON.stringify(dto, null, 2));
        
        await PublicAPI.createDonationAppointment(dto);
        
        setIsSuccess(true);
      }
      
    } catch (error: any) {
      console.error('Submission error:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'Lỗi không xác định';
      
      setErrors({
        general: `Đăng ký thất bại: ${errorMessage}`
      });
      
      // Call error callback
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  // ✅ Render step content - điều chỉnh theo số bước
  const renderStepContent = (step: number) => {
    if (isBloodRequestMode) {
      // BloodRequest mode: chỉ có 2 bước
      switch (step) {
        case 0:
          return (
            <Box>
              <Typography variant="h6" gutterBottom color="primary.main">
                Bước 1: Kiểm tra tình trạng sức khỏe
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Vui lòng cung cấp thông tin sức khỏe chính xác để đảm bảo an toàn trong quá trình hiến máu
              </Typography>
              
              <StepHealthCheck
                formData={formData}
                errors={errors}
                healthQuestions={healthQuestions}
                setFormData={setFormData}
                handleCheckboxChange={handleCheckboxChange}
                onNext={handleNext}
                onGoHome={handleGoHome}
                setErrors={setErrors}
                canProceedToNext={canProceedToNext}
                setCanProceedToNext={setCanProceedToNext}
              />
            </Box>
          );

        case 1:
          return (
            <Box>
              <Typography variant="h6" gutterBottom color="primary.main">
                Bước 2: Xác nhận thông tin đăng ký
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Kiểm tra lại thông tin trước khi hoàn tất đăng ký
              </Typography>
              
              {/* ✅ Hiển thị thông tin BloodRequest */}
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  <strong>Đăng ký hiến máu cho yêu cầu #{request?.requestId}</strong><br/>
                  Thông tin lịch hẹn đã được tự động điền dựa trên yêu cầu hiến máu.
                </Typography>
              </Alert>
              
              <StepConfirmation
                selectedDate={selectedDate}
                selectedTimeSlot={selectedTimeSlot}
                note={note}
                location={location}
                formData={formData}
                currentUser={currentUser}
                selectedDonationScheduleId={selectedDonationScheduleId}
                bloodVolume={bloodVolume}
                isBloodRequestMode={true}
                bloodRequest={request}
              />
            </Box>
          );

        default:
          return null;
      }
    } else {
      // Normal mode: 3 bước như cũ
      switch (step) {
        case 0:
          return (
            <Box>
              <Typography variant="h6" gutterBottom color="primary.main">
                Bước 1: Kiểm tra tình trạng sức khỏe
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Vui lòng cung cấp thông tin sức khỏe chính xác để đảm bảo an toàn trong quá trình hiến máu
              </Typography>
              
              <StepHealthCheck
                formData={formData}
                errors={errors}
                healthQuestions={healthQuestions}
                setFormData={setFormData}
                handleCheckboxChange={handleCheckboxChange}
                onNext={handleNext}
                onGoHome={handleGoHome}
                setErrors={setErrors}
                canProceedToNext={canProceedToNext}
                setCanProceedToNext={setCanProceedToNext}
              />
            </Box>
          );

        case 1:
          return (
            <Box>
              <Typography variant="h6" gutterBottom color="primary.main">
                Bước 2: Chọn lịch hẹn hiến máu
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Chọn ngày và giờ phù hợp với lịch trình của bạn
              </Typography>
              
              <StepAppointment
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTimeSlot={selectedTimeSlot}
                setSelectedTimeSlot={setSelectedTimeSlot}
                setSelectedDonationScheduleId={setSelectedDonationScheduleId}
                errors={errors}
                note={note}
                setNote={setNote}
                location={location}
                setLocation={setLocation}
                bloodVolume={bloodVolume}
                setBloodVolume={setBloodVolume}
              />
            </Box>
          );

        case 2:
          return (
            <Box>
              <Typography variant="h6" gutterBottom color="primary.main">
                Bước 3: Xác nhận thông tin đăng ký
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Kiểm tra lại thông tin trước khi hoàn tất đăng ký
              </Typography>
              
              <StepConfirmation
                selectedDate={selectedDate}
                selectedTimeSlot={selectedTimeSlot}
                note={note}
                location={location}
                formData={formData}
                currentUser={currentUser}
                selectedDonationScheduleId={selectedDonationScheduleId}
                bloodVolume={bloodVolume}
              />
            </Box>
          );

        default:
          return null;
      }
    }
  };

  // ✅ Render success view - có thể custom cho BloodRequest
  const renderSuccessView = () => (
    <Box textAlign="center" py={4}>
      <LocalHospital sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
      <Typography variant="h4" fontWeight={600} color="success.main" gutterBottom>
        {isBloodRequestMode ? 'Đăng ký hiến máu thành công!' : 'Đăng ký thành công!'}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
        {isBloodRequestMode 
          ? `Cảm ơn bạn đã đăng ký hiến máu cho yêu cầu #${request?.requestId}. Chúng tôi sẽ kết nối bạn với người cần máu.`
          : 'Cảm ơn bạn đã tham gia hiến máu tình nguyện. Chúng tôi sẽ liên hệ trong vòng 24-48 giờ để xác nhận lịch hẹn.'
        }
      </Typography>
      
      <Alert severity="info" sx={{ textAlign: 'left', maxWidth: 500, mx: 'auto' }}>
        <Typography variant="body2">
          <strong>Lưu ý:</strong><br/>
          • Vui lòng để ý điện thoại và email<br/>
          • Chuẩn bị giấy tờ tùy thân khi đến hiến máu<br/>
          • Liên hệ hotline 1900-1234 nếu có thay đổi kế hoạch
        </Typography>
      </Alert>
    </Box>
  );

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '70vh',
          maxHeight: '90vh'
        }
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <LocalHospital color="primary" sx={{ fontSize: 32 }} />
            <Box>
              <Typography variant="h5" fontWeight={600}>
                {isBloodRequestMode ? `Đăng ký hiến máu cho yêu cầu #${request?.requestId}` : 'Đăng ký hiến máu tình nguyện'}
              </Typography>
              {!isSuccess && (
                <Typography variant="body2" color="text.secondary">
                  {steps[activeStep]} • Bước {activeStep + 1}/{steps.length}
                </Typography>
              )}
            </Box>
          </Box>
          
          <IconButton onClick={handleClose} disabled={loading}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ px: 3, py: 2 }}>
        {isSuccess ? (
          renderSuccessView()
        ) : (
          <Box>
            {/* Stepper */}
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Error Alert */}
            {errors.general && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errors.general}
              </Alert>
            )}

            {/* Step Content */}
            {renderStepContent(activeStep)}
          </Box>
        )}
      </DialogContent>

      {/* Footer Actions */}
      {!isSuccess && (
        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            disabled={activeStep === 0 || loading}
            onClick={handleBack}
            size="large"
          >
            Quay lại
          </Button>

          <Box flexGrow={1} />

          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleFinalSubmit}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
            >
              {loading ? 'Đang xử lý...' : 'Hoàn tất đăng ký'}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleNext}
              disabled={activeStep === 0 && !canProceedToNext}
            >
              Tiếp tục
            </Button>
          )}
        </DialogActions>
      )}

      {/* Success dialog footer */}
      {isSuccess && (
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleClose}
            fullWidth
          >
            Đóng
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default BloodDonationRegistrationDialog;
