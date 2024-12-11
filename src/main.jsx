import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PronosticoProvider } from './Provider/PronosticoProvider.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <PronosticoProvider >     
      <App /> 
    </PronosticoProvider >
  </StrictMode>,
)
