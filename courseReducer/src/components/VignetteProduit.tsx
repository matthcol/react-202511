import { useContext, type FC } from "react";
import type { Produit } from "../types/produit";
import './VignetteProduit.css'
import { ContextCompteur } from "../main";
import { usePanier } from "../contextes/ContextPanier";

type VignetteProduitProps = {
    produit: Produit,
    // handleAddProduit: (idProduit: number, quantite: number) => void
}


const VignetteProduit: FC<VignetteProduitProps> = ({produit}) => {
    const {dispatch} = usePanier()
    const compteur = useContext(ContextCompteur)
    return (
        <div>
            <div>Compteur : {compteur}</div>
            <div><img src={produit.PhotoListe} alt={produit.Libelle} /></div>
            <button onClick={() => dispatch(
                {
                    type: 'ajouterProduit',
                    idProduit: produit.Id,
                    quantite: 1
                })}
            >+</button>
            <div>{produit.Libelle}</div>
            <div>{produit.Prix}€</div>
            {
                (produit.FiltresLabelsQualite.length > 0) && (
                <div>
                    {produit.FiltresLabelsQualite.map((qualite, i) => <div key={i} className="qualite">{qualite}</div>)}
                </div>
                )

                // nutriscore: afficher nutriscore ou label indiquant non connu
            }
            {
                (produit.FiltresNutriscore.length > 0) ? ( 
                    <div className="nutriscore">{produit.FiltresNutriscore[0]}</div>
                ):(
                    <div className="nonutriscore">nutriscore non disponible</div>
                )  
            }
        </div>
    )
}

export default VignetteProduit;
export {type VignetteProduitProps};