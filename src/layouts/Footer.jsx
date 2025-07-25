import CopyrightIcon from '@mui/icons-material/Copyright'
import { Box, Typography, Divider } from '@mui/material'
import { BG_COLOR, RED_600 } from '~/theme'
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()

  return (
    <Box>
      <Divider />
      <Box
        sx={{
          backgroundColor: BG_COLOR,
          px: 3, // padding trái phải cho khoảng cách sát lề
          pt: 6, // top padding (increase as needed)
          pb: 4,
          color: RED_600,
        }}
      >
        <Box
          sx={{
            maxWidth: 'xl',
            margin: '0 auto', // canh giữa container theo chiều ngang
            display: 'flex',
            justifyContent: 'space-between', // dời 2 phần sang 2 bên
            alignItems: 'center',
            flexWrap: 'wrap', // responsive xuống dòng nếu nhỏ màn hình
            gap: 2,
          }}
        >
          {/* Logo hoặc tên bên trái */}
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 14,
              textTransform: 'capitalize',
            }}
          >
            Blood Donation Center
          </Typography>

          {/* Menu bên phải */}
          <Box
            sx={{
              display: 'flex',
              gap: 5,
              flexWrap: 'wrap', // responsive
              justifyContent: 'flex-end',
            }}
          >
            <Typography sx={{ fontSize: 12, cursor: 'pointer' }}>
              Terms of Use
            </Typography>
            <Typography sx={{ fontSize: 12, cursor: 'pointer' }}>
              Privacy Policy
            </Typography>
            <Typography sx={{ fontSize: 12, cursor: 'pointer' }}>
              News
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
