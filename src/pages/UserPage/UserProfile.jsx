import React from 'react'
import UserProfileForm from './UserProfile.component'
import UserProfileNavbar from './UserProfileNavbar.component'
import Footer from '~/layouts/Footer'

function UserProfile() {
    return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar bên trái */}
      <UserProfileNavbar />

      {/* Nội dung bên phải */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1, padding: 3 }}>
          <UserProfileForm />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default UserProfile
