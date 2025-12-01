import { useState, type ChangeEvent } from 'react';
import produitsData from '../data/produits.json';

import './App.css';
import VignetteProduit from './VignetteProduit';
import { range } from './utils';
import type { Panier } from './types/panier';
import CartouchePanier from './CartouchePanier';

function App() {
  const [nbProduitPage, setNbProduitPage] = useState<number>(10)
  const [numPage, setNumPage] = useState<number>(1)
  const [panier, setPanier] = useState<Panier>([])
  
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
    const newLigneArticle = {idProduit: idProduit, quantite: quantite}
    // NE PAS FAIRE: modier sur place un object ou array
    // setPanier(panier => {
    //   panier.push(newLigneArticle)
    //   return panier
    // })

    // OK: retourner 1 nouvel objet
    setPanier(panier => {
      const newPanier = [...panier, newLigneArticle]
      console.log("Panier modifié:", newPanier)
      return newPanier
    })
  }

  const handleRemoveProduit = (idProduitToRemove: number) => {
    setPanier(panier => panier.filter(({idProduit}) => idProduit != idProduitToRemove))
  }
  
  return (
    <>
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