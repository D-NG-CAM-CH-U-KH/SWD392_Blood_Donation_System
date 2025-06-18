import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card';

function ProfileCard() {
    return (
        <Box display={'flex'} flexDirection={'column'} width={900} height={500} alignItems={'center'}>
            <Box display={'flex'} width={700} justifyContent={'center'} alignItems={'center'}>
                <Typography fontWeight={'bold'} fontSize={40} p={4}>
                    Introduce Yourself
                </Typography>
                <Box onClick={() => { }} sx={{
                    backgroundColor: 'lightgrey', borderRadius: '10px', color: 'black', width: 100, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: "pointer", "&:hover": {
                        backgroundColor: "#f5f5f5",
                    },
                }}>
                    Edit
                </Box>
            </Box>
            <Card sx={{ width: 350, height: 250, py: 4, px: 2, borderRadius: '20px', boxShadow: 3, }}>

                <Box sx={{ height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ width: 120, height: 120, mb: 2 }} />
                    <Typography sx={{ fontSize: 30, fontWeight: 'bold' }}>
                        Nguyen Dai Thinh
                    </Typography>
                    <Typography sx={{ fontSize: 15, color: 'grey' }}>
                        Member
                    </Typography>
                </Box>
            </Card>
        </Box>
    )
}

export default ProfileCard