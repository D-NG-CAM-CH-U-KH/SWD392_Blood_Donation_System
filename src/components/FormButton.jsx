const FormButton = ({backgroundColor,  }) => {
    return (
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
                onClick={handleLogin}
            >
                Login
            </Button>
        </Box>
    )
}

export default FormButton;