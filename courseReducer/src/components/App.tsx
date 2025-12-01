import { useContext, useEffect, useReducer, useState, type ChangeEvent, type Reducer } from 'react';

import _produitsData from '../../data/produits.json';

import './App.css';
import VignetteProduit from './VignetteProduit';
import { range } from '../utils';

import CartouchePanier from './CartouchePanier';
import { ContextCompteur } from '../main';
import type { Produit } from '../types/produit';
import loadPageProduits from '../services/catalogueService';

function App() {
  const [produitsData, setProduitsData] = useState<Produit[]>([])
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
  
  // Version avec custom hook
  // const {panier, dispatch} = usePanier() // finalement plus utilisé ici, uniquement ds enfants

  // data recalculées à chaque re-rendering déclenché par un changement de state (nbProduitPage ou numPage)
  const firstIndexProduit = (numPage - 1) * nbProduitPage // included
  const lastIndexProduit = numPage  * nbProduitPage // excluded
  const nbPage = Math.ceil(produitsData.length / nbProduitPage)
  const produitsDisplay = produitsData.slice(firstIndexProduit, lastIndexProduit)
  const pages = range(nbPage, 1)
  
  console.log('Pages:', pages)
  console.log(`Display produits: page=${numPage} de ${firstIndexProduit} à ${lastIndexProduit}`)

  useEffect(() => {
    console.log('Chargement des données 0')
    loadPageProduits(numPage, nbProduitPage)
      .forEach(
          newProduitsData => setProduitsData(newProduitsData)
      )
  }, [nbProduitPage, numPage])

  // useEffect(() => {
  //   // phase 1 : fait qd le useEffect est joué
  //   const intervalId = setInterval(() => {
  //     console.log('Chargement des données Refresh')
  //     setProduitsData(_produitsData.slice(0, 20))
  //   }, 5000)

    // phase 2 : fait avant de rejouer l'effet
  //   return () => clearInterval(intervalId)
  // }, [produitsData])

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
  
  // const handleAddProduit = (idProduit: number, quantite: number) => {
  //   dispatch({
  //     type: 'ajouterProduit',
  //     idProduit: idProduit,
  //     quantite: quantite
  //   })
  // }

  // const handleRemoveProduit = (idProduitToRemove: number) => {
  //   dispatch({
  //     type: 'supprimerProduit',
  //     idProduit: idProduitToRemove
  //   })
  // }
  
  return (
     <div className="app-container">
      {/* Header avec compteur */}
      <div className="app-header">
        <div>Compteur : {compteur}</div>
      </div>

      {/* Panier sticky */}
      <div className="panier-section">
        <CartouchePanier />
      </div>
    
          {/* Contrôles de pagination et taille */}
      <div className="controls-container">
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
      </div>

        {/* Liste des produits */}
      <div className='listeProduit'>
          {produitsDisplay.map((produit, index) => (
            <VignetteProduit 
                key={`vgntprod_${index}`} // ou index du parcours du map 
                produit={produit}
            />)
          )}
      </div>
    </div>
  )
}

export default App;