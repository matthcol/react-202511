import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  // strict mode : chaque composant est monté en double 
  // pour vérifier qu'il correspond à une fonction pure
  <StrictMode>
    <App />
  </StrictMode>,
)
