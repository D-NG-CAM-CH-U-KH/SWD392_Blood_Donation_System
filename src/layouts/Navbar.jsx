import { Box, List, ListItem, ListItemText, Divider, Badge } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import LockIcon from '@mui/icons-material/Lock'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import ArticleIcon from '@mui/icons-material/Article'
import LoginIcon from '@mui/icons-material/Login'
import { ORANGE_COLOR } from '~/theme'
import { useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications'

const menus = [
  {
    title: 'Account',
    icon: AccountCircleIcon,
    url: '/staff'
  },
  {
    title: 'Password',
    icon: LockIcon,
    url: '/staff_password'
  },
  {
    title: 'Customer',
    icon: SupportAgentIcon,
    url: '/staff_customer'
  },
  {
    title: 'Booking',
    icon: CalendarMonthIcon,
    url: '/staff_booking'
  },
  {
    title: 'Veterian',
    icon: LocalHospitalIcon,
    url: '/staff_veterinarian_management'
  }
]

function Navbar() {
  const navigate = useNavigate()
  const [selectedMenu, setSelectedMenu] = useState(null)

  const handleMenuClick = (menu, idx) => {
    setSelectedMenu(idx)
    navigate(menu.url)
  }

  const handleLogout = () => {
    localStorage.removeItem("accountInfo");
    localStorage.removeItem("token");
    // navigate("/home");
    window.location.href = "/management-login";
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'flex-start',
          position: 'fixed',
          width: '100%'
        }}
      >
        <List>
          {menus.map((menu, idx) => {
            const IconComponent = menu.icon

            return (
              <Box
                key={`menu-${idx}`}
                sx={{ display: 'flex', alignItems: 'center', color: '#000' }}>
                <ListItem
                  button
                  onClick={() => handleMenuClick(menu, idx)}
                  sx={{
                    gap: 1.5,
                    cursor: 'pointer',
                    mt: 2,
                    fontWeight: selectedMenu === idx ? 'bold' : 'normal',
                    color: selectedMenu === idx ? 'bold' : 'normal'
                  }}
                >
                  <IconComponent />
                  <ListItemText
                    primary={menu.title}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '18px',
                        // color: '#000',
                        fontWeight: selectedMenu === idx ? 'bold' : 'normal',
                        color: selectedMenu === idx ? 'bold' : 'normal'
                      }
                    }}
                  />



                </ListItem>
              </Box>
            )
          })}


          <Divider sx={{ paddingTop: '50px' }} />
          <Box onClick={() => navigate('/staff/notification')} sx={{ display: 'flex', alignItems: 'center', color: ORANGE_COLOR, paddingTop: '10px', ml: 2 }}>
            <Badge badgeContent={4} color="ORANGE COLOR">
              <NotificationsIcon color="action" sx={{ color: ORANGE_COLOR }} />
            </Badge>
            <ListItem button component={Link} to="#" sx={{ color: ORANGE_COLOR, paddingTop: '10px' }}>
              <ListItemText
                primary="Notification"
                primaryTypographyProps={{
                  sx: {
                    fontSize: '18px',
                    color: ORANGE_COLOR,
                    fontWeight: 500
                  }
                }}
              />
            </ListItem>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', color: ORANGE_COLOR, paddingTop: '10px', ml: 2 }}>
            <LoginIcon />
            <ListItem onClick={handleLogout} button component={Link} to="#" sx={{ color: ORANGE_COLOR, paddingTop: '10px' }}>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  sx: {
                    fontSize: '18px',
                    color: ORANGE_COLOR,
                    fontWeight: 500
                  }
                }}
              />
            </ListItem>
          </Box>
        </List>
      </Box>
    </div >
  )
}

export default Navbar
