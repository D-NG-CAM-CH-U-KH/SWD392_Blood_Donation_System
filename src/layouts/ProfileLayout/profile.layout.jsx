import { Box, Container, Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { BG_COLOR } from '~/theme'
import Footer from '~/layouts/Footer.jsx'
import Header from '~/layouts/Header.jsx'
import UserProfileNavbar from '~/pages/UserPage/UserProfileNavbar.component'

const ProfileLayout = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            sx={{ m: 0, p: 0, bgcolor: BG_COLOR }}
        >

            <Container maxWidth={'xl'}>
                {/* HEADER */}
                <Header />
                <Box justifyContent={'space-between'} display={'flex'} flexDirection={'row'}>
                    <Box>
                        <UserProfileNavbar/>
                    </Box>
                    <Box>
                        <Outlet />
                    </Box>
                </Box>
                {/* FOOTER */}
                <Footer />
            </Container>
        </Grid>
    )
}

export default ProfileLayout