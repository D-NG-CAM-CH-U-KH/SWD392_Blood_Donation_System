import { Box, Container, Divider, Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { BG_COLOR } from '~/theme'
import Footer from '~/layouts/Footer.jsx'
import Header from '~/layouts/Header.jsx'
import UserProfileNavbar from '~/pages/UserPage/UserProfileNavbar.component'
import SideNavbarProfile from '~/pages/ProfilePage/SideNavbarProfile'

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
                <Box display={'flex'} flexDirection={'row'} >
                    <SideNavbarProfile />
                    <Divider orientation='vertical' flexItem          // Giúp Divider kéo dài hết chiều cao của flex box
                        sx={{ mx: 2 }} />
                    <Outlet />
                </Box>
                {/* FOOTER */}
                <Footer />
            </Container>
        </Grid>
    )
}

export default ProfileLayout