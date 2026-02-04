import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { PlayerProvider } from './context/PlayerContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'
import { Toaster } from "react-hot-toast"

createRoot(document.getElementById('root')).render(
 <StrictMode>
  <AuthProvider>
   <PlayerProvider>
     <App />
     <Toaster position="top-right" />
   </PlayerProvider>
  </AuthProvider>
 </StrictMode>
)
