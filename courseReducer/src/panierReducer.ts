import type { LigneArticle, Panier } from "./types/panier";

type ActionPanier = 
  | { type: 'ajouterProduit'; idProduit: number; quantite: number }
  | { type: 'supprimerProduit'; idProduit: number }
  | { type: 'modifierProduit'; idProduit: number; quantite: number };

const panierReducer = (panier: Panier, action: ActionPanier) => {
    switch (action.type) {
        case 'ajouterProduit':  // idProduit + quantite
            const newLigneArticle: LigneArticle = {idProduit: action.idProduit, quantite: action.quantite}
            console.log('Ajout ligne article:', newLigneArticle)
            return [...panier, newLigneArticle]
        case 'supprimerProduit': // idProduit
            console.log('Supprimer ligne article du produit:', action.idProduit)
            return panier.filter(({idProduit}) => idProduit != action.idProduit)
        case 'modifierProduit': // idProduit + quantite
            return panier.map(ligneArticle => 
                ligneArticle.idProduit == action.idProduit ?
                {...ligneArticle, quantite: action.quantite} :
                ligneArticle
            )
    }
}

export {panierReducer, type ActionPanier}