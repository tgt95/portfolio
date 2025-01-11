import { StrictMode, React } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/style.scss'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)