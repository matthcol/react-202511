import type { FC } from "react"
import type { Panier } from "./types/panier"
import produitsData from '../data/produits.json';
import type { Produit } from "./types/produit";

type CartouchePanierProps = {
    panier: Panier,
    handleRemoveProduit: (idProduit: number) => void
}

const CartouchePanier: FC<CartouchePanierProps> = ({panier, handleRemoveProduit}) => {
    const getProduit = (idProduit: number): Produit|undefined => {
        return produitsData.find(p => p.Id == idProduit)
    }

    return (
        <>
            {/* <div>{JSON.stringify(panier)}</div>
            <button onClick={() => {
                if (panier.length > 0) handleRemoveProduit(panier[0].idProduit)
            }}>🗑️</button> */}
            <div>Nombre d'articles: {panier.length}</div>
            {panier.map(({idProduit, quantite}, i) => {
                const produit = getProduit(idProduit)
                return (
                <div className="ligneArticle" key={i}>
                    {produit && (<div><img src={produit.PhotoListe} alt={produit.Libelle} /></div>)}
                    <div>Quantité: {quantite}</div>
                    <button onClick={() => handleRemoveProduit(idProduit)}>🗑️</button>
                </div>
                )})
            }
        </>
    )
} 

export default CartouchePanier