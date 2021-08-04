import { Carburant } from './carburant';
import { Modele } from './modele';
import { Garage } from './garage';

export class Annonce {
  constructor(
    public id: number,
    public refAnnonce: string,
    public DateAnnonce: Date,
    public titre: String,
    public descriptionCourte: string,
    public descriptionLongue: string,
    public anneeCirculation: number,
    public kilometrage: number,
    public prix: number,
    public modele: Modele,
    public garage: Garage,
    public carburant: Carburant
  ) {}
}
