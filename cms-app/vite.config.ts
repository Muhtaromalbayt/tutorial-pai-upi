import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        TanStackRouterVite()
    ],
    server: {
        port: 5173,
        proxy: {
            // Proxy API requests to the main website during development
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            }
        }
    },
    // For production, API calls go to the main website domain
    define: {
        'import.meta.env.VITE_API_BASE_URL': JSON.stringify(
            process.env.NODE_ENV === 'production'
                ? 'https://tutorial-pai-upi.pages.dev' // Update with your production URL
                : ''
        )
    }
})
