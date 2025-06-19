import { Box, Container, Divider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { BG_COLOR } from '~/theme';
import Footer from '~/layouts/Footer.jsx';
import Header from '~/layouts/Header.jsx';
import SideNavbarProfile from '~/pages/ProfilePage/SideNavbarProfile';

const ProfileLayout = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: BG_COLOR,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* HEADER */}
            <Header />

            {/* CONTENT */}
            <Container maxWidth="xl" sx={{ flex: 1, mt: 2, mb: 4 }}>
                <Box display="flex" flexDirection="row">
                    {/* Sidebar */}
                    <SideNavbarProfile />

                    {/* Divider */}
                    <Divider
                        orientation="vertical"
                        flexItem
                        cc
                    />

                    {/* Nội dung bên phải */}
                    <Box sx={{ flex: 1 }}>
                        <Outlet />
                    </Box>
                </Box>
            </Container>

            {/* FOOTER */}
            <Footer />
        </Box>
    );
};

export default ProfileLayout;
