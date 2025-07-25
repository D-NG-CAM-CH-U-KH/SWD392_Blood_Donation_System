import React from 'react';
import { Box, Button } from '@mui/material';
import { ArrowBack, ArrowForward, CheckCircle } from '@mui/icons-material';

interface NavigationButtonsProps {
  currentStep: number;
  stepsLength: number;
  handleBack: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
  loading?: boolean;
  canProceedToNext?: boolean; // ✅ Thêm prop mới
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  stepsLength,
  handleBack,
  handleNext,
  handleSubmit,
  loading = false,
  canProceedToNext = true // ✅ Default true cho các step khác
}) => {
  // ✅ Logic kiểm tra có thể tiếp tục không
  const canProceed = () => {
    // Step 1 (Health Check) cần kiểm tra canProceedToNext
    if (currentStep === 1) {
      return canProceedToNext;
    }
    return true; // Các step khác cho phép tiếp tục
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Button
        onClick={handleBack}
        disabled={currentStep === 0 || loading}
        startIcon={<ArrowBack />}
        variant="outlined"
        size="large"
        sx={{ 
          minWidth: 120,
          visibility: currentStep === 0 ? 'hidden' : 'visible'
        }}
      >
        Quay lại
      </Button>

      {currentStep < stepsLength - 1 ? (
        <Button
          onClick={handleNext}
          disabled={loading || !canProceed()}
          endIcon={<ArrowForward />}
          variant="contained"
          size="large"
          sx={{ 
            minWidth: 120,
            opacity: canProceed() ? 1 : 0.6,
            background: canProceed() 
              ? 'linear-gradient(135deg, #ef4444, #f97316)'
              : 'linear-gradient(135deg, #e0e0e0, #bdbdbd)',
            '&:hover': {
              background: canProceed() 
                ? 'linear-gradient(135deg, #dc2626, #ea580c)'
                : 'linear-gradient(135deg, #e0e0e0, #bdbdbd)'
            }
          }}
        >
          {currentStep === 1 && !canProceed() ? 'Cần kiểm tra sức khỏe' : 'Tiếp tục'}
        </Button>
      ) : (
        <Button
          onClick={handleSubmit}
          disabled={loading}
          startIcon={<CheckCircle />}
          variant="contained"
          size="large"
          color="success"
          sx={{ minWidth: 140 }}
        >
          {loading ? 'Đang xử lý...' : 'Hoàn thành đăng ký'}
        </Button>
      )}
    </Box>
  );
};