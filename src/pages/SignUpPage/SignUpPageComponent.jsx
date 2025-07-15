import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SignUpIconStepIcon } from './SignUpIcon'
import SignUp_Profile from './SignUp_Profile';
import { BLACK_COLOR, BLUE_700 } from '~/theme';
import SignUp_UploadCitizenId from './SignUp_UploadCitizenId';
import SignUp_Verifying from './SignUp_Verifying';


const SignUpPageComponent = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const profileRef = React.useRef();

  const [signUpForm, setSignUpForm] = React.useState ({
    frontCardFile: null,
    backCardFile: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    citizenID: '',
    phone: '',
    gender: 1,
    city: '',
    district: '',
    ward: '',
    houseNumber: '',
  });

  const steps = [
    { label: 'ID documents', page: <SignUp_UploadCitizenId ref={profileRef} signUpForm={signUpForm} setSignUpForm={setSignUpForm} /> },
    { label: 'User Profile', page: <SignUp_Profile ref={profileRef} signUpForm={signUpForm} setSignUpForm={setSignUpForm} /> },
    { label: 'Verifying', page: <SignUp_Verifying /> },
  ];

  const isStepOptional = (step) => {
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    const result = await profileRef.current?.onNext?.(); // Call child function
    if (result === false) {
      console.log('Validation failed. Do not proceed.');
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkippedf.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setSignUpForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="#f1f3fb" padding={5}>
      <Box
        sx={{
          width: '80vw',
          maxWidth: '1200px',
          bgcolor: '#fff',
          borderRadius: 2,
          boxShadow: '0 10px 20px 0 rgba(153,153,153, .25)',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stepper activeStep={activeStep}>
          {steps.map((object, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={object.label} {...stepProps}>
                <StepLabel slots={{ stepIcon: SignUpIconStepIcon }} {...labelProps}>{object.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {steps[activeStep].page}

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color={BLACK_COLOR}
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1, fontSize: 18 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1, fontSize: 18 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}
                sx={{
                  color: BLUE_700,
                  fontSize: 18
                }}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}

export default SignUpPageComponent
