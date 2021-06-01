import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Annonce } from '../models/annonce';
import { Carburant } from '../models/carburant';
import { Marque } from '../models/marque';
import { Modele } from '../models/modele';

@Component({
  selector: 'app-form-recherche',
  templateUrl: './form-recherche.component.html',
  styleUrls: ['./form-recherche.component.css'],
})
export class FormRechercheComponent implements OnInit {
  public modele!: number;
  public marque!: number;
  public carburant!: number;
  public filtrer!: string;

  public tabMarques: Marque[] = [];
  public tabModeles: Modele[] = [];
  public tabCarburants: Carburant[] = [];
  public tabModelesFiltrer: Modele[] = [];
  public tabAnnoncesFiltrer: Annonce[] = [];
  public disabled: boolean = true;

  @Input() public tabAnnonces!: Annonce[];
  @Output() public rechercheFormulaire: EventEmitter<Annonce[]>;

  faSearch = faSearch;

  constructor() {
    this.rechercheFormulaire = new EventEmitter();
    this.tabModeles.push(
      new Modele(1, '2000', new Marque(1, 'Alfa Romeo')),
      new Modele(2, 'Giulia', new Marque(1, 'Alfa Romeo')),
      new Modele(3, 'A3', new Marque(2, 'Audi')),
      new Modele(2, 'A5', new Marque(2, 'Audi'))
    );

    this.tabMarques.push(new Marque(1, 'Alfa Romeo'), new Marque(2, 'Audi'));

    this.tabCarburants.push(
      new Carburant(1, 'Essence'),
      new Carburant(2, 'Diesel')
    );

    this.marque = 0;
    this.carburant = 0;
  }

  onMarqueChanged(value: any) {
    this.tabModelesFiltrer.length = 0;
    let val = this.tabModeles.filter(function (c) {
      return c.marque.idMarque === parseInt(value.target.value);
    });
    this.tabModelesFiltrer = val;

    if (value.target.value === '0') this.disabled = true;
    else this.disabled = false;

    this.modele = 0;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.tabAnnoncesFiltrer.length = 0;

    let val = this.tabAnnonces.filter((a) => {
      if (this.carburant != 0 && this.modele == 0) {
        return a.carburant.idCarburant == this.carburant;
      } else if (this.modele != 0 && this.carburant == 0) {
        return a.modele.idModele == this.modele;
      } else if (this.carburant != 0 && this.modele != 0) {
        return (
          a.carburant.idCarburant == this.carburant &&
          a.modele.idModele == this.modele
        );
      } else return false;
    });
    if (this.carburant == 0 && this.marque == 0) {
      this.rechercheFormulaire.emit(this.tabAnnonces);
    } else {
      this.tabAnnoncesFiltrer.push(...val);
      this.rechercheFormulaire.emit(this.tabAnnoncesFiltrer);
    }
  }
}
