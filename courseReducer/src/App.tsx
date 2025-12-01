import { useContext, useReducer, useState, type ChangeEvent, type Reducer } from 'react';
import produitsData from '../data/produits.json';

import './App.css';
import VignetteProduit from './VignetteProduit';
import { range } from './utils';

import CartouchePanier from './CartouchePanier';
import { ContextCompteur } from './main';
import { usePanier } from './contextes/ContextPanier';

function App() {
  const {panier, dispatch} = usePanier()
  const [nbProduitPage, setNbProduitPage] = useState<number>(10)
  const [numPage, setNumPage] = useState<number>(1)
  
  
  const compteur = useContext(ContextCompteur)

  // Version sans contexte:
  // const [panier, dispatch] = useReducer(panierReducer, [])

  // Version avec  contexte sans custom Hook (undefined possible)
  // const contextPanier = useContext(ContextPanier)
  // if (!contextPanier) {
  //   throw new Error("Utilisation du panier sans mise en place du provider")
  // }
  // const {panier, dispatch} = contextPanier
  

  // data recalculées à chaque re-rendering déclenché par un changement de state (nbProduitPage ou numPage)
  const firstIndexProduit = (numPage - 1) * nbProduitPage // included
  const lastIndexProduit = numPage  * nbProduitPage // excluded
  const nbPage = Math.ceil(produitsData.length / nbProduitPage)
  const produitsDisplay = produitsData.slice(firstIndexProduit, lastIndexProduit)
  const pages = range(nbPage, 1)
  console.log('Pages:', pages)
  console.log(`Display produits: page=${numPage} de ${firstIndexProduit} à ${lastIndexProduit}`)

  const handleChangeNbProduitPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const newNbProduitPage = Number(e.target.value)
    setNbProduitPage(newNbProduitPage)
    setNumPage(1)
    console.log('Changement du nb de produits par page:', 
      newNbProduitPage, // nouvelle valeur calculée localement
      nbProduitPage // toujours l'ancienne valeur jusqu'au prochain render
    )
  }

  const handleChangePage = (numPage: number) => {
    console.log("Changement de page:", numPage)
    setNumPage(numPage)
  }

  // handlers modifiant 1 tableau:
  // tips: https://react.dev/learn/updating-arrays-in-state
  
  const handleAddProduit = (idProduit: number, quantite: number) => {
    dispatch({
      type: 'ajouterProduit',
      idProduit: idProduit,
      quantite: quantite
    })
  }

  const handleRemoveProduit = (idProduitToRemove: number) => {
    dispatch({
      type: 'supprimerProduit',
      idProduit: idProduitToRemove
    })
  }
  
  return (
    <>
      <div>Compteur : {compteur}</div>
      <CartouchePanier panier={panier} handleRemoveProduit={handleRemoveProduit}/>
      <div className='taillePage'>
          <select value={nbProduitPage} onChange={handleChangeNbProduitPage}>
             <option value="10">10</option>
             <option value="25">25</option>
             <option value="50">50</option>
        </select>
      </div>
      <div className='navigation'>
        { pages.map(numPage => (
            <button 
              onClick={() => handleChangePage(numPage)}
              key={`page_${numPage}`}
            >
              {numPage}
            </button>
          ))
        }
      </div>
      <div className='listeProduit'>
          {produitsDisplay.map((produit, index) => (
            <VignetteProduit 
                key={`vgntprod_${index}`} // ou index du parcours du map 
                produit={produit}
                handleAddProduit={handleAddProduit} 
            />)
          )}
      </div>
    </>
  )
}

export default App;