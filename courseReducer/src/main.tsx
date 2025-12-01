import { createContext, StrictMode, useReducer } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ContextPanierProvider } from './contextes/ContextPanier'

// demo principe contexte
const ContextCompteur = createContext<number>(0)

// contexte : partager le panier
 



createRoot(document.getElementById('root')!).render(
  // strict mode : chaque composant est monté en double 
  // pour vérifier qu'il correspond à une fonction pure
  <StrictMode>
    <ContextPanierProvider>    
      <ContextCompteur.Provider value={1}>
        <App />
      </ContextCompteur.Provider>
    </ContextPanierProvider>
  </StrictMode>,
)

export {ContextCompteur}
