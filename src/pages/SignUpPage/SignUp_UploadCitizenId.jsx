import React, { forwardRef, useImperativeHandle } from 'react';
import { Box, Typography } from '@mui/material';
import { BLACK_COLOR, RED_700 } from '~/theme';
import UploadBox from '~/components/UploadBox';
import { toast } from 'react-toastify';

const SignUp_UploadCitizenId = forwardRef(({ signUpForm, setSignUpForm }, ref) => {
    const handleFrontFile = (file) => {
        setSignUpForm(prev => ({
            ...prev,
            frontCardFile: file,
        }));
    };

    const handleBackFile = (file) => {
        setSignUpForm(prev => ({
            ...prev,
            backCardFile: file,
        }));
    };
    const onNext = () => {
        if (!signUpForm.frontCardFile || !signUpForm.backCardFile) {
            toast.error("Please upload both front and back of the ID.");
            return false; // prevent moving to next step
        }
        return true;
    };

    useImperativeHandle(ref, () => ({
        onNext,
    }));

    return (
        <Box
            sx={{
                borderRadius: 2,
                overflow: 'hidden',
                padding: 5,
                backgroundSize: '150%',
                backgroundPosition: '0 5%',
                position: 'relative',
                mb: 2,
                display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
            }}
        >
            <Typography sx={{ fontSize: 45, textAlign: 'center', color: BLACK_COLOR }}>
                Upload <span style={{ color: RED_700, fontWeight: 'bold' }}>Citizen ID</span>
            </Typography>

            <Box>
                <Typography sx={{
                    fontWeight: 600,
                    fontSize: 22,
                    alignSelf: 'flex-start',
                    textAlign: 'left',
                    width: '100%',
                    mt: 2,
                    marginBottom: '8px'
                }}>
                    Front Side of Citizen ID:
                </Typography>
                <UploadBox file={signUpForm.frontCardFile} setFile={handleFrontFile} />
            </Box>

            <Box>
                <Typography sx={{
                    fontWeight: 600,
                    fontSize: 22,
                    alignSelf: 'flex-start',
                    textAlign: 'left',
                    width: '100%',
                    mt: 2,
                    marginBottom: '8px'
                }}>
                    Back Side of Citizen ID:
                </Typography>
                <UploadBox file={signUpForm.backCardFile} setFile={handleBackFile} />
            </Box>
        </Box>

    );
})
export default SignUp_UploadCitizenId;
