import { Container, Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { BG_COLOR } from '~/theme'
import Footer from '~/layouts/Footer.jsx'
import Header from '~/layouts/Header.jsx'

const DefaultLayout = () => {
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
                <Outlet />
                {/* FOOTER */}
                <Footer />
            </Container>
        </Grid>
    )
}

export default DefaultLayout