// types/produit.ts
export type Produit = {
  Id: number;
  Libelle: string;
  Prix: number;
  PhotoListe: string;
  PhotoDetail: string;
  FiltresMarque: string[];
  FiltresEnCeMoment: string[];
  FiltresLabelsQualite: string[];
  FiltresNutriscore: string[];
  IdRangement: string;
  Url: string;
};