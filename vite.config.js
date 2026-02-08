import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: "/KnowBuddy/",
  plugins: [
    react(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   manifest: {
    //     name: 'KnowBuddy',
    //     short_name: 'KnowBuddy',
    //     icons: [
    //       {
    //         src: '/KnowBuddy/icon-192.png',
    //         sizes: '192x192',
    //         type: 'image/png'
    //       },
    //       {
    //         src: '/KnowBuddy/icon-512.png',
    //         sizes: '512x512',
    //         type: 'image/png'
    //       }
    //     ],
    //     start_url: '/KnowBuddy/',
    //     display: 'standalone',
    //     background_color: '#ffffff',
    //     theme_color: '#ffffff'
    //   }
    // })
  ]
})