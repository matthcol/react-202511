import { usePanier } from "../contextes/ContextPanier";
import { LigneArticle } from "./LigneArticle";

// type CartouchePanierProps = {
//     panier: Panier,
//     handleRemoveProduit: (idProduit: number) => void
// }

// const CartouchePanier: FC<CartouchePanierProps> = ({panier, handleRemoveProduit}) => {

const CartouchePanier = () => {
    const {panier} = usePanier()
    return (
        <div className="cartouchePanier">
            <div>Nombre d'articles: {panier.length}</div>
            {
                panier.map(({idProduit, quantite}, i) => 
                    <LigneArticle idProduit={idProduit} quantite={quantite} index={i} />
                )
            }
        </div>
    )
} 

export default CartouchePanier