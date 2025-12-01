import type { Produit } from "../types/produit"
import produitsData from '../../data/produits.json';
import type { FC } from "react";
import { usePanier } from "../contextes/ContextPanier";

type LigneArticleProps = {
    idProduit: number
    quantite: number
    index : number
}

const getProduit = (idProduit: number): Produit|undefined => {
        return produitsData.find(p => p.Id == idProduit)
}

export const LigneArticle: FC<LigneArticleProps> = ({idProduit, quantite, index}) => {
    const {dispatch} = usePanier()
    const produit = getProduit(idProduit)
    return (
        <div className="ligneArticle" key={index}>
            {produit && (<div><img src={produit.PhotoListe} alt={produit.Libelle} /></div>)}
            <div>Quantité: {quantite}</div>
            <button onClick={() => dispatch({
                type: 'supprimerProduit',
                idProduit: idProduit
            })}>🗑️</button>
            {(quantite > 0) && (
            <button onClick={() => dispatch({
                type: 'modifierProduit',
                idProduit: idProduit,
                quantite: quantite -1
            })}>-</button>)}
            <button onClick={() => dispatch({
                type: 'modifierProduit',
                idProduit: idProduit,
                quantite: quantite + 1
            })}>+</button>
        </div>
    )
}
