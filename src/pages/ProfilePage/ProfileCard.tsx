import { Avatar, Box, Typography, Divider, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import React, { useState } from 'react'
import Card from '@mui/material/Card';
import { User } from '../../entities/user/User';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmailIcon from '@mui/icons-material/Email';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import TransgenderIcon from '@mui/icons-material/Transgender';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BusinessIcon from '@mui/icons-material/Business';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';



const ProfileCard: React.FC = () => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => setOpen(false)

    // const handleChange =
    //     (field: keyof Partial<User>) =>
    //         (e: React.ChangeEvent<HTMLInputElement>) => {
    //             setDraft(prev => ({ ...prev, [field]: e.target.value }))
    //         }

    const handleSave = () => {
        setOpen(false)
    }

    return (
        <Box display={'flex'} flexDirection={'column'} width={1000} height={900} alignItems={'center'}>
            <Box display={'flex'} width={700} justifyContent={'center'} alignItems={'center'}>
                <Typography fontWeight={'bold'} fontSize={40} p={4}>
                    Introduce Yourself
                </Typography>
                <Box onClick={handleOpen} sx={{
                    backgroundColor: 'lightgrey', borderRadius: '10px', color: 'black', width: 100, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: "pointer", "&:hover": {
                        backgroundColor: "#f5f5f5",
                    },
                }}>
                    Edit
                </Box>
            </Box>
            <Card sx={{ width: 350, height: 250, py: 4, px: 2, borderRadius: '20px', boxShadow: 3, }}>

                <Box sx={{ height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar src='https://i.pinimg.com/236x/e0/e6/0a/e0e60aa11edece897eae6c5b55004f54.jpg' sx={{ width: 120, height: 120, mb: 2 }} />
                    <Typography sx={{ fontSize: 30, fontWeight: 'bold' }}>
                        Nguyen Dai Thinh
                    </Typography>
                    <Typography sx={{ fontSize: 15, color: 'grey' }}>
                        Member
                    </Typography>
                </Box>
            </Card>

            <Divider sx={{ width: '100%', my: 2, p: 2 }} />

            <Box display={'flex'} flexDirection={'row'} p={4} justifyContent={'space-between'} width={800}>
                <Box display="flex" flexDirection="column">
                    <Typography p={2} display={'flex'} justifyContent={'space-between'} width={420}>
                        <Box
                            component="span"
                            sx={{ fontWeight: 'bold', display: 'flex' }}
                        >
                            <EmailIcon /> Email:
                        </Box>{' '}
                        nguyendaithinh@gmail.com
                    </Typography>

                    <Typography p={2} display={'flex'} justifyContent={'space-between'} width={330}>
                        <Box
                            component="span"
                            sx={{ fontWeight: 'bold', display: 'flex' }}
                        >
                            <PermIdentityIcon /> CitizenID:
                        </Box>{' '}
                        0909090909090
                    </Typography>

                    <Typography p={2} display={'flex'} justifyContent={'space-between'} width={230}>
                        <Box
                            component="span"
                            sx={{ fontWeight: 'bold', display: 'flex' }}
                        >
                            <TransgenderIcon />Gender:
                        </Box>{' '}
                        Female
                    </Typography>

                    <Typography p={2} display={'flex'} justifyContent={'space-between'} width={320}>
                        <Box
                            component="span"
                            sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'row' }}
                        >
                            <CalendarMonthIcon />Date of birth:
                        </Box>{' '}
                        09/09/1000
                    </Typography>

                    <Typography p={2} display={'flex'} justifyContent={'space-between'} width={340} flexDirection={'row'}>
                        <Box
                            component="span"
                            sx={{ fontWeight: 'bold', display: 'flex' }}
                        >
                            <BusinessIcon /> Address:
                        </Box>{' '}
                        Day la dia chi nha
                    </Typography>

                    <Typography p={2} display={'flex'} justifyContent={'space-between'} width={230}>
                        <Box
                            component="span"
                            sx={{
                                fontWeight: 'bold',
                                display: 'flex',
                            }}
                        >
                            <BloodtypeIcon />  Blood group:
                        </Box>{' '}
                        O+
                    </Typography>
                </Box>

                <Divider orientation='vertical' />
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>

                    <Box
                        component="img"
                        src="https://i.pinimg.com/236x/e0/e6/0a/e0e60aa11edece897eae6c5b55004f54.jpg"
                        alt="Front"
                        sx={{
                            width: 150,
                            height: 150,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            mt: 2
                        }}
                    />
                    <Box
                        component="img"
                        src="https://i.pinimg.com/236x/e0/e6/0a/e0e60aa11edece897eae6c5b55004f54.jpg"
                        alt="Back"
                        sx={{
                            width: 150,
                            height: 150,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            mt: 2
                        }}
                    />
                </Box>

            </Box>
            {/* Edit Dialog */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent dividers>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="First Name"
                            value={''}
                            onChange={() => { }}
                            fullWidth
                        />
                        <TextField
                            label="Last Name"
                            value={''}
                            onChange={() => { }}
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            value={''}
                            onChange={() => { }}
                            fullWidth
                        />
                        <TextField
                            label="Citizen ID"
                            value={''}
                            onChange={() => { }}
                            fullWidth
                        />
                        <TextField
                            label="Phone"
                            value={''}
                            onChange={() => { }}
                            fullWidth
                        />
                        <TextField
                            label="City"
                            value={''}
                            onChange={() => { }}
                            fullWidth
                        />
                        <TextField
                            label="Date of Birth"
                            type="date"
                            value={''}
                            onChange={() => { }}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button  >
                        Save
                    </button>
                </DialogActions>
            </Dialog>


        </Box>
    )
}

export default ProfileCard