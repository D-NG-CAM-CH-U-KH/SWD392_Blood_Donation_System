import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    open: '/home', // mở trình duyệt tại localhost:5173/home
  },
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})