import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DashboardProvider from './DashboardContext'
import ToolBarProvider from './ToolBarContext'
import WeatherProvider from './WeatherContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DashboardProvider>
      <ToolBarProvider>
        <WeatherProvider>
          <App />
        </WeatherProvider>
      </ToolBarProvider>
    </DashboardProvider>
  </StrictMode>,
)
