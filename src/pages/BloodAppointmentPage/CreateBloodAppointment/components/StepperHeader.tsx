import { Stepper, Step, StepLabel, Box } from '@mui/material';

interface StepperHeaderProps {
  steps: string[];
  stepIcons: React.ElementType[];
  currentStep: number;
}

const StepperHeader: React.FC<StepperHeaderProps> = ({ steps, stepIcons, currentStep }) => (
  <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
    {steps.map((label, index) => {
      const Icon = stepIcons[index];
      return (
        <Step key={label}>
          <StepLabel
            StepIconComponent={() => (
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
            )}
          >
            {label}
          </StepLabel>
        </Step>
      );
    })}
  </Stepper>
);

export default StepperHeader;