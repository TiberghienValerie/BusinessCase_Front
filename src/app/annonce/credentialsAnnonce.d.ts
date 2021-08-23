import {Validators} from "@angular/forms";

export interface CredentialsAnnonce {
  titre: string,
  description: string,
  anneeCirculation: number,
  kilometrage: number,
  prix: number,
  carburant: string,
  modele: string,
  marque: string,
  garage: string
}
