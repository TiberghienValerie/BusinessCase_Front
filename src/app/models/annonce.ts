import { Carburant } from './carburant';
import { Modele } from './modele';

export class Annonce {
  constructor(
    public idAnnonce: number,
    public refAnnonce: string,
    public dateAnnonce: Date,
    public titre: String,
    public descriptionCourte: string,
    public descriptionLongue: string,
    public anneeCirculation: number,
    public kilometrage: number,
    public prix: number,
    public prixEffectifVente: number,
    public modele: Modele,
    public IdGarage: number,
    public carburant: Carburant
  ) {}
}
