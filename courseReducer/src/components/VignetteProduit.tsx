import { useContext, useState, type FC } from "react";
import type { Produit } from "../types/produit";
import './VignetteProduit.css'
import { ContextCompteur } from "../main";
import { usePanier } from "../contextes/ContextPanier";

type VignetteProduitProps = {
    produit: Produit,
    // handleAddProduit: (idProduit: number, quantite: number) => void
}


const VignetteProduit: FC<VignetteProduitProps> = ({produit}) => {
    const {dispatch} = usePanier();
    const compteur = useContext(ContextCompteur);
    const [isAdding, setIsAdding] = useState(false);

    const handleAjouterPanier = () => {
        setIsAdding(true);
        dispatch({
            type: 'ajouterProduit',
            idProduit: produit.Id,
            quantite: 1
        });
        
        setTimeout(() => setIsAdding(false), 400);
    }

    return (
        <div className="vignetteProduit">
            <div className="vignette-image">
                <img src={produit.PhotoListe} alt={produit.Libelle} />
                <button 
                    className={`btn-ajouter ${isAdding ? 'adding' : ''}`}
                    onClick={handleAjouterPanier}
                    aria-label="Ajouter au panier"
                >
                    +
                </button>
            </div>
            {/* Contenu */}
            <div className="vignette-content">
                <div className="vignette-libelle">{produit.Libelle}</div>
                <div className="vignette-prix">{produit.Prix.toFixed(2)}</div>

                {/* Labels qualité */}
                {produit.FiltresLabelsQualite.length > 0 && (
                    <div className="vignette-qualites">
                        {produit.FiltresLabelsQualite.map((qualite, i) => (
                            <div key={i} className="qualite">{qualite}</div>
                        ))}
                    </div>
                )}

                {/* Nutriscore */}
                <div className="vignette-nutriscore">
                    {produit.FiltresNutriscore.length > 0 ? (
                        <div 
                            className="nutriscore" 
                            data-score={produit.FiltresNutriscore[0]}
                        >
                            {produit.FiltresNutriscore[0]}
                        </div>
                    ) : (
                        <div className="nonutriscore">Nutriscore non disponible</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VignetteProduit;
export {type VignetteProduitProps};