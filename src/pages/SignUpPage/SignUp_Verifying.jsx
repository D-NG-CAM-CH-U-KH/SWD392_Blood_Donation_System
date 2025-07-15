import { Button, Box, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import PageEndpoints from "~/meta-data/contants/page-endpoints";
import { RED_600 } from "~/theme"

const SignUp_Verifying = () => {
    const navigate = useNavigate();
 
    return (
        <Box>
            <Box
                sx={{
                    mt: 4,
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: '#e8f5e9', // light green
                    border: '2px solid #4caf50',
                    textAlign: 'center',
                    animation: 'fadeIn 0.5s ease-in-out',
                }}
            >
                <Typography sx={{ fontSize: 32, fontWeight: 'bold', color: '#2e7d32' }}>
                    🎉 Welcome!
                </Typography>
                <Typography sx={{ fontSize: 18, mt: 1, color: '#388e3c' }}>
                    Your account has been created successfully.
                </Typography>
            </Box>

            <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" sx={{
                    borderRadius: '15px',
                    bgcolor: RED_600,
                    height: '60px',
                    width: '560px',
                    fontSize: 16,
                    boxShadow: 'none',
                    gap: 2,
                    color: '#fff'
                }}
                    onClick={() => navigate(PageEndpoints.PublicEndpoints.LOGIN_ENDPOINT)}
                >
                    Back to Login!
                </Button>
            </Box>

        </Box>

    )
}

export default SignUp_Verifying