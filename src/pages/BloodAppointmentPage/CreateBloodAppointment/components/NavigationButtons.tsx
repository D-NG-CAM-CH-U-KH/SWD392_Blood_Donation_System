import { Box, Button } from '@mui/material';

interface NavigationButtonsProps {
  currentStep: number;
  stepsLength: number;
  handleBack: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep, stepsLength, handleBack, handleNext, handleSubmit
}) => (
  <Box display="flex" justifyContent="space-between" mt={4}>
    <Button
      disabled={currentStep === 0}
      onClick={handleBack}
      variant="outlined"
      size="large"
    >
      Quay lại
    </Button>
    {currentStep === stepsLength - 1 ? (
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
);

export default NavigationButtons;