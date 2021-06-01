import { Marque } from './marque';

export class Modele {
  constructor(
    public idModele: number,
    public nomModele: string,
    public marque: Marque
  ) {}
}
