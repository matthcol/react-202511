import type { FC } from "react"
import type { Panier } from "./types/panier"

type CartouchePanierProps = {
    panier: Panier,
    handleRemoveProduit: (idProduit: number) => void
}

const CartouchePanier: FC<CartouchePanierProps> = ({panier, handleRemoveProduit}) => {
    return (
        <>
            {/* <div>{JSON.stringify(panier)}</div>
            <button onClick={() => {
                if (panier.length > 0) handleRemoveProduit(panier[0].idProduit)
            }}>🗑️</button> */}
            <div>Nombre d'articles: {panier.length}</div>
            {panier.map(({idProduit, quantite}, i) => (
                <div className="ligneArticle" key={i}>
                    {idProduit} ({quantite})
                    <button onClick={() => handleRemoveProduit(idProduit)}>🗑️</button>
                </div>
            ))}
        </>
    )
} 

export default CartouchePanier