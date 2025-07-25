import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, FormControlLabel,
  Checkbox, TextField, FormGroup, Button, Alert,
  CircularProgress, Backdrop, Skeleton
} from '@mui/material';
import { Favorite, HealthAndSafety, Warning, Error as ErrorIcon, CheckCircle } from '@mui/icons-material';
import { DonorEligibilityChecker, EligibilityCheckResult } from './EligibilityChecker';
import EligibilityResultDialog from './EligibilityResultDialog';
import { HealthQuestion, DonationFormData } from '../../../../types/health.types';
import { useCurrentUser } from '../../../../hooks/useCurrentUser';
import PrivateAPI from '../../../../api/private-api';

export interface StepHealthCheckProps {
  formData: DonationFormData;
  errors: { [key: string]: string };
  healthQuestions: HealthQuestion[];
  setFormData: React.Dispatch<React.SetStateAction<DonationFormData>>;
  handleCheckboxChange: (questionKey: string, option: string, checked: boolean) => void;
  onNext: () => void;
  onGoHome: () => void;
  setErrors: React.Dispatch<React.SetStateAction<{[key: string]: string}>>;
  canProceedToNext: boolean;
  setCanProceedToNext: React.Dispatch<React.SetStateAction<boolean>>;
}

const StepHealthCheck: React.FC<StepHealthCheckProps> = ({
  formData, errors, healthQuestions, setFormData, handleCheckboxChange,
  onNext, onGoHome, setErrors, canProceedToNext, setCanProceedToNext
}) => {
  const [eligibilityResult, setEligibilityResult] = useState<EligibilityCheckResult | null>(null);
  const [showEligibilityDialog, setShowEligibilityDialog] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [hasCompletedCheck, setHasCompletedCheck] = useState(false);
  const [useBackendCheck, setUseBackendCheck] = useState(true);
  
  const { user, loading: userLoading, error: userError, isAuthenticated, refetch } = useCurrentUser();
  const userGender: 'male' | 'female' = user?.gender || 'male';

  // ✅ Early return with loading state
  if (userLoading) {
    return (
      <Box>
        <Skeleton variant="text" width="60%" height={40} />
        <Skeleton variant="rectangular" width="100%" height={300} sx={{ mt: 2 }} />
      </Box>
    );
  }

  // ✅ Early return with error state
  if (userError || !isAuthenticated) {
    return (
      <Alert severity="error" action={
        <Button color="inherit" size="small" onClick={refetch}>
          Thử lại
        </Button>
      }>
        {!isAuthenticated ? 'Bạn cần đăng nhập để sử dụng tính năng này' : 'Lỗi tải thông tin người dùng'}
        {userError && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            {userError}
          </Typography>
        )}
      </Alert>
    );
  }

  // ✅ Early return if formData is not ready
  if (!formData) {
    return (
      <Box>
        <Skeleton variant="text" width="60%" height={40} />
        <Skeleton variant="rectangular" width="100%" height={300} sx={{ mt: 2 }} />
      </Box>
    );
  }

  const validateForm = (): boolean => {
    if (!formData) return false;

    const newErrors: { [key: string]: string } = {};
    
    // Validate donation history
    if (formData.isDonated && !formData.lastDonationDate) {
      newErrors.lastDonationDate = 'Vui lòng chọn ngày hiến máu gần nhất';
    }

    // Validate health questions
    healthQuestions.forEach(question => {
      if (question.required) {
        const value = formData[question.key as keyof DonationFormData] as string[];
        if (!value || value.length === 0) {
          newErrors[question.key] = 'Vui lòng chọn ít nhất một tùy chọn';
        }
        
        if (value?.includes('Khác') && !formData[`${question.key}Other` as keyof DonationFormData]) {
          newErrors[`${question.key}Other`] = 'Vui lòng mô tả chi tiết';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckEligibility = async () => {
    if (!validateForm()) {
      return;
    }

    setIsChecking(true);
    try {
      let result: EligibilityCheckResult;
      
      if (useBackendCheck) {
        await checkEligibilityWithBackend();
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
        result = DonorEligibilityChecker.checkEligibility(formData, userGender);
        setEligibilityResult(result);
        setShowEligibilityDialog(true);
        setHasCompletedCheck(true);
        setCanProceedToNext(result.isEligible);
      }
    } catch (error) {
      console.error('Error checking eligibility:', error);
      setErrors({ general: 'Có lỗi xảy ra khi kiểm tra điều kiện. Vui lòng thử lại.' });
      setCanProceedToNext(false);
    } finally {
      setIsChecking(false);
    }
  };

  const checkEligibilityWithBackend = async () => {
    console.log('=== USER DEBUG INFO ===');
    console.log('Current user object:', user);
    console.log('Form data userID:', formData.userID);
    
    const possibleUserIds = [
      user?.userID,
      user?.id, 
      user?.userId,
      user?.UserID,
      formData.userID
    ];
    
    const validUserId = possibleUserIds.find(id => 
      id !== undefined && id !== null && id !== 0 && id !== ''
    );
    
    if (!validUserId) {
      console.error('❌ NO VALID USER ID FOUND!');
      setErrors({ 
        general: 'Không thể xác định ID người dùng. Vui lòng đăng nhập lại.' 
      });
      return;
    }
    
    try {
      const requestData = {
        isDonated: formData.isDonated,
        lastDonationDate: formData.lastDonationDate || null,
        illness: formData.illness,
        illnessOther: formData.illnessOther,
        dangerousIllness: formData.dangerousIllness,
        dangerousIllnessOther: formData.dangerousIllnessOther,
        twelveMonthProblem: formData.twelveMonthProblem,
        twelveMonthProblemOther: formData.twelveMonthProblemOther,
        sixMonthProblem: formData.sixMonthProblem,
        sixMonthProblemOther: formData.sixMonthProblemOther,
        oneMonthProblem: formData.oneMonthProblem,
        oneMonthProblemOther: formData.oneMonthProblemOther,
        fourteenDayProblem: formData.fourteenDayProblem,
        fourteenDayProblemOther: formData.fourteenDayProblemOther,
        sevenDayProblem: formData.sevenDayProblem,
        sevenDayProblemOther: formData.sevenDayProblemOther,
        womanProblem: formData.womanProblem,
        womanProblemOther: formData.womanProblemOther
      };

      console.log('Using user ID:', validUserId);
      console.log('Request data:', requestData);
      
      const result = await PrivateAPI.checkDonorEligibility(validUserId, requestData);
      
      console.log('✅ Backend API success:', result);
      
      setEligibilityResult(result);
      setShowEligibilityDialog(true);
      setHasCompletedCheck(true);
      setCanProceedToNext(result.isEligible);
      
    } catch (error: any) {
      console.error('❌ Backend eligibility check failed:', error);
      
      // Fallback to frontend check
      console.log('🔄 Falling back to frontend eligibility check...');
      const result = DonorEligibilityChecker.checkEligibility(formData, userGender);
      setEligibilityResult(result);
      setShowEligibilityDialog(true);
      setHasCompletedCheck(true);
      setCanProceedToNext(result.isEligible);
    }
  };

  const handleEligibilityDialogClose = () => {
    setShowEligibilityDialog(false);
    
    if (eligibilityResult?.isEligible) {
      setTimeout(() => {
        onNext();
      }, 500);
    }
  };

  const canCheckEligibility = () => {
    if (!formData || !healthQuestions || healthQuestions.length === 0) {
      return false;
    }

    return healthQuestions.every(question => {
      const value = formData[question.key as keyof DonationFormData] as string[];
      return value && value.length > 0;
    }) && (!formData.isDonated || formData.lastDonationDate);
  };

  // ✅ Fixed validateLastDonation with proper checks
  const validateLastDonation = (): string => {
    if (!formData || typeof formData.isDonated === 'undefined') {
      return '';
    }
    
    if (!formData.isDonated || !formData.lastDonationDate) {
      return '';
    }

    const lastDonation = new Date(formData.lastDonationDate);
    const today = new Date();
    
    if (lastDonation > today) {
      return 'Ngày hiến máu không được lớn hơn ngày hiện tại';
    }

    const daysSince = Math.floor((today.getTime() - lastDonation.getTime()) / (1000 * 60 * 60 * 24));
    const requiredDays = userGender === 'male' ? 56 : 84;
    
    if (daysSince < requiredDays) {
      const waitingDays = requiredDays - daysSince;
      const nextEligibleDate = new Date(lastDonation);
      nextEligibleDate.setDate(nextEligibleDate.getDate() + requiredDays);
      return `Bạn cần chờ thêm ${waitingDays} ngày. Có thể hiến lại từ ${nextEligibleDate.toLocaleDateString('vi-VN')}`;
    }

    return '';
  };

  const lastDonationError = validateLastDonation();

  return (
    <Box>
      {/* Header */}
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <HealthAndSafety sx={{ color: '#ef4444', fontSize: 32 }} />
        <Typography variant="h4" fontWeight={700} color="primary.main">
          Khám sức khỏe
        </Typography>
      </Box>

      <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
        Vui lòng trả lời các câu hỏi về tình trạng sức khỏe một cách trung thực để đảm bảo an toàn cho bạn và người nhận máu.
      </Typography>

      {/* Alert yêu cầu bắt buộc kiểm tra */}
      {!hasCompletedCheck && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Lưu ý:</strong> Bạn phải hoàn thành kiểm tra sức khỏe trước khi có thể tiếp tục bước tiếp theo.
          </Typography>
        </Alert>
      )}

      {/* Alert hiển thị kết quả kiểm tra */}
      {hasCompletedCheck && eligibilityResult && (
        <Alert 
          severity={eligibilityResult.isEligible ? 'success' : 'error'} 
          sx={{ mb: 3 }}
        >
          <Typography variant="body1" fontWeight={600}>
            {eligibilityResult.isEligible
              ? "✓ Bạn đã đạt yêu cầu sức khỏe để hiến máu. Có thể tiếp tục bước tiếp theo."
              : "✗ Bạn hiện tại chưa đủ điều kiện hiến máu. Vui lòng xem chi tiết và cải thiện sức khỏe."
            }
          </Typography>
        </Alert>
      )}

      {/* General Error Alert */}
      {errors.general && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErrors(prev => ({ ...prev, general: '' }))}>
          {errors.general}
        </Alert>
      )}

      {/* Donation History */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isDonated || false}
                onChange={(e) => setFormData((prev) => ({
                  ...prev,
                  isDonated: e.target.checked,
                  lastDonationDate: e.target.checked ? prev.lastDonationDate : ''
                }))}
              />
            }
            label="Tôi đã từng hiến máu trước đây"
          />
          
          {formData.isDonated && (
            <TextField
              fullWidth
              type="date"
              label="Ngày hiến máu gần nhất *"
              value={formData.lastDonationDate || ''}
              onChange={(e) => setFormData((prev) => ({
                ...prev,
                lastDonationDate: e.target.value
              }))}
              sx={{ mt: 2 }}
              InputLabelProps={{ shrink: true }}
              error={!!lastDonationError}
              helperText={lastDonationError || 'Chọn ngày hiến máu gần nhất để tính toán thời gian chờ'}
              required
            />
          )}
        </CardContent>
      </Card>

      {/* Health Questions */}
      {healthQuestions.map((question) => {
        const noneOption = question.key === 'womanProblem' ? 'Không áp dụng' : 'Không có';
        const selected = Array.isArray(formData[question.key as keyof DonationFormData])
          ? formData[question.key as keyof DonationFormData] as string[]
          : [];
        const isNoneSelected = selected.includes(noneOption);

        return (
          <Card key={question.key} elevation={1} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                {question.label}
                {question.required && <Typography component="span" color="error.main"> *</Typography>}
              </Typography>
              
              {question.description && (
                <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                  {question.description}
                </Typography>
              )}
              
              <FormGroup>
                {question.options.map((option: string) => (
                  <FormControlLabel
                    key={option}
                    control={
                      <Checkbox
                        checked={selected.includes(option)}
                        onChange={(e) => handleCheckboxChange(question.key, option, e.target.checked)}
                        disabled={
                          (isNoneSelected && option !== noneOption) ||
                          (!isNoneSelected && option === noneOption && selected.length > 0)
                        }
                      />
                    }
                    label={option}
                  />
                ))}
              </FormGroup>

              {selected.includes('Khác') && (
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Vui lòng mô tả chi tiết..."
                  value={formData[`${question.key}Other` as keyof DonationFormData] || ''}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    [`${question.key}Other`]: e.target.value
                  } as any))}
                  sx={{ mt: 2 }}
                  error={!!errors[`${question.key}Other`]}
                  helperText={errors[`${question.key}Other`]}
                  required
                />
              )}

              {errors[question.key] && (
                <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                  {errors[question.key]}
                </Typography>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Health Check Button */}
      <Card elevation={2} sx={{ mb: 3, backgroundColor: '#f8f9fa' }}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <HealthAndSafety sx={{ fontSize: 48, color: '#4caf50', mb: 2 }} />
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Kiểm tra điều kiện hiến máu
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
            Hệ thống sẽ tự động đánh giá tình trạng sức khỏe của bạn dựa trên các thông tin đã cung cấp.
          </Typography>

          {!canCheckEligibility() && !hasCompletedCheck && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="body2">
                Vui lòng điền đầy đủ tất cả thông tin bắt buộc trước khi kiểm tra
              </Typography>
            </Alert>
          )}

          {/* Button kiểm tra hoặc kết quả */}
          {!hasCompletedCheck ? (
            <Button
              variant="contained"
              size="large"
              onClick={handleCheckEligibility}
              disabled={!canCheckEligibility() || isChecking}
              startIcon={isChecking ? <CircularProgress size={20} color="inherit" /> : <HealthAndSafety />}
              sx={{
                py: 1.5, px: 4, fontSize: '1.1rem', fontWeight: 700, borderRadius: 3,
                background: canCheckEligibility() && !isChecking
                  ? 'linear-gradient(135deg, #4caf50, #66bb6a)'
                  : 'linear-gradient(135deg, #e0e0e0, #bdbdbd)',
              }}
            >
              {isChecking ? 'Đang kiểm tra...' : 'Kiểm tra ngay'}
            </Button>
          ) : (
            <Box>
              <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={2}>
                {eligibilityResult?.isEligible ? (
                  <CheckCircle sx={{ color: 'success.main', fontSize: 32 }} />
                ) : (
                  <ErrorIcon sx={{ color: 'error.main', fontSize: 32 }} />
                )}
                <Typography variant="h6" fontWeight={600}>
                  {eligibilityResult?.isEligible ? 'Đạt yêu cầu sức khỏe' : 'Chưa đạt yêu cầu'}
                </Typography>
              </Box>
              
              <Box display="flex" gap={2} justifyContent="center">
                <Button
                  variant="outlined"
                  onClick={() => setShowEligibilityDialog(true)}
                  sx={{ minWidth: 140 }}
                >
                  Xem chi tiết
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setHasCompletedCheck(false);
                    setEligibilityResult(null);
                    setCanProceedToNext(false);
                  }}
                  sx={{ minWidth: 140 }}
                >
                  Kiểm tra lại
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isChecking}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <CircularProgress color="inherit" size={60} />
          <Typography variant="h6">Đang đánh giá tình trạng sức khỏe...</Typography>
          <Typography variant="body2" color="inherit" sx={{ opacity: 0.8 }}>
            Vui lòng chờ trong giây lát
          </Typography>
        </Box>
      </Backdrop>

      {/* Eligibility Result Dialog */}
      {eligibilityResult && (
        <EligibilityResultDialog
          open={showEligibilityDialog}
          onClose={handleEligibilityDialogClose}
          result={eligibilityResult}
          onGoHome={onGoHome}
        />
      )}
    </Box>
  );
};

export default StepHealthCheck;
