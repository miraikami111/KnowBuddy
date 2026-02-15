import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register'   // ←アイコンのための

createRoot(document.getElementById('root')).render(
  <App />
)

registerSW({ immediate: true })   // アイコンのやつ
