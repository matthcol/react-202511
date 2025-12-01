import { createContext, useContext, useReducer, type ActionDispatch } from "react"
import type { Panier } from "../types/panier"
import { panierReducer, type ActionPanier } from "../reducers/panierReducer"

type ContextPanierProviderProps = {
     children: React.ReactNode
}

type ContextPanierValue = {
    panier: Panier
    dispatch : ActionDispatch<[action: ActionPanier]>
}

// hors d'un composant react, un hook n'est pas disponible => init à undefined
const ContextPanier = createContext<ContextPanierValue|undefined>(undefined)

// le composant React permet de mettre en place le hook reducer
const ContextPanierProvider = ({children}: ContextPanierProviderProps) => {
    const [panier, dispatch] = useReducer(panierReducer, [])
    return (
        <ContextPanier.Provider value={{panier, dispatch}}>
            {children}
        </ContextPanier.Provider>
    )
}

// custom Hook pour recuperer le panier si disponible
function usePanier(): ContextPanierValue {
      const contextPanier = useContext(ContextPanier)
      if (!contextPanier) {
        throw new Error("Utilisation du panier sans mise en place du provider")
      }
      return contextPanier
} 

export {ContextPanier, ContextPanierProvider, usePanier}