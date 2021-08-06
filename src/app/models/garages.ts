import {Ville} from "./ville";

export class Garages {
  constructor(
    public id: number,
    public nom: string,
    public telephone: string,
    public ville: Ville,
    public annonces: []
  ) {}
}
