type LigneArticle = {
    idProduit: number
    quantite: number
}

type Panier = LigneArticle[]

export {type LigneArticle, type Panier}