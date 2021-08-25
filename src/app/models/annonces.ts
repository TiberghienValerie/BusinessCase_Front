import { Carburant } from './carburant';
import { Modele } from './modele';
import { Garage } from './garage';
import {Photos} from "./photos";

export class Annonces {
  constructor(
    public id: number,
    public refAnnonce: string,
    public DateAnnonce: Date,
    public nom: string,
    public descriptionCourte: string,
    public descriptionLongue: string,
    public anneeCirculation: number,
    public kilometrage: number,
    public prix: number,
    public modele: Modele,
    public garage: Garage,
    public carburant: Carburant,
    public photos: Photos []
  ) {}
}
