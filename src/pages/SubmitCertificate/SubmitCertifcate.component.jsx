import React, { useEffect, useState } from 'react'
import {
    Button,
    Box,
    Container,
    Typography,
    Alert,
} from '@mui/material'
import axios from 'axios'
import UploadBox from '~/components/UploadBox'
import FormTextField from '~/components/FormTextField'
import { useAuth } from '~/hooks/useAuth'
import { BLACK_COLOR, RED_700 } from '~/theme'
import PrivateAPI from '~/api/private-api'
import { useNavigate } from 'react-router-dom'
import PageEndpoints from '~/meta-data/contants/page-endpoints'
import { toast } from 'react-toastify'

const SubmitCertificateComponent = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        fileProof: null,
        citizenID: '',
        fullName: '',
        dateOfBirth: '',
        address: '',
        bloodDonationCenter: '',
        donatedVolumn: 0,
        seriNumber: '',
        email: '',
    })

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                fullName: `${user.lastName} ${user.firstName}`,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                citizenID: user.citizenID
            }))
        }
    }, [user])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleFileChange = (name, file) => {
        setFormData((prev) => ({
            ...prev,
            [name]: file,
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!(formData.fileProof instanceof File)) {
            toast.error("Please select a valid image file before submitting.");
            return;
        }
        try {
            await PrivateAPI.createCertificateWithImage(formData);
            toast.success("Submit certificate successful!")
            navigate(PageEndpoints.PublicEndpoints.HOME_ENDPOINT);
        } catch (err) {
            if (!axios.isAxiosError(err)) {
                toast.warning(err.message)
                console.log(err)
            }
        }
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8 }}>
                <Typography sx={{ fontSize: 45, textAlign: 'center', color: BLACK_COLOR }}>
                    Submit Blood Donation <span style={{ color: RED_700, fontWeight: 'bold' }}>Certificate</span>
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Typography sx={{
                        fontWeight: 600,
                        fontSize: 16,
                        alignSelf: 'flex-start',
                        textAlign: 'left',
                        width: '100%',
                        mt: 2,
                        marginBottom: '8px'
                    }}>
                        Image Proof:
                    </Typography>
                    <UploadBox file={formData.fileProof} setFile={(file) => handleFileChange("fileProof", file)} />

                    <FormTextField
                        valueName="email"
                        value={formData.email}
                        onChange={handleChange}
                        width='100%'
                        disabled
                        required
                    />
                    <FormTextField
                        valueName="citizenID"
                        value={formData.citizenID}
                        onChange={handleChange}
                        width='100%'
                        disabled
                        required
                        type="number"
                    />
                    <FormTextField
                        valueName="fullName"
                        value={formData.fullName}
                        width='100%'
                        disabled
                        onChange={handleChange}
                        required
                    />
                    <FormTextField
                        valueName="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        type="date"
                        width='100%'
                        disabled
                        required
                        InputLabelProps={{ shrink: true }}
                    />
                    <FormTextField
                        valueName="address"
                        value={formData.address}
                        width='100%'
                        onChange={handleChange}
                    />
                    <FormTextField
                        valueName="bloodDonationCenter"
                        value={formData.bloodDonationCenter}
                        width='100%'
                        onChange={handleChange}
                    />
                    <FormTextField
                        valueName="donatedVolumn"
                        value={formData.donatedVolumn}
                        onChange={handleChange}
                        width='100%'
                        type="number"
                        required
                    />
                    <FormTextField
                        valueName="seriNumber"
                        value={formData.seriNumber}
                        onChange={handleChange}
                        width='100%'
                        type="number"
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </Container>
    )
}

export default SubmitCertificateComponent
