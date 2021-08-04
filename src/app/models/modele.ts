import { Marque } from './marque';

export class Modele {
  constructor(
    public id: number,
    public nomModele: string,
    public Marque: Marque
  ) {}
}
