import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AnneeCirculation } from '../models/annee-circulation';
import { Annonce } from '../models/annonce';
import { Carburant } from '../models/carburant';
import { Kilometrage } from '../models/kilometrage';
import { Marque } from '../models/marque';
import { Modele } from '../models/modele';
import { PrixVente } from '../models/prix-vente';

@Component({
  selector: 'app-form-recherche',
  templateUrl: './form-recherche.component.html',
  styleUrls: ['./form-recherche.component.css'],
})
export class FormRechercheComponent implements OnInit {
  public modele!: number;
  public kilometrage!: number;
  public anneeCirculation!: number;
  public prixVente!: number;
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
  @Input() public tabKilometrage!: Kilometrage[];
  @Input() public tabPrixVente!: PrixVente[];
  @Input() public tabAnneeCirculation!: AnneeCirculation[];

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
    this.kilometrage = 0;
    this.modele = 0;
    this.anneeCirculation = 0;
    this.prixVente = 0;
  }

  onMarqueChanged(value: any) {
    this.tabModelesFiltrer.length = 0;
    let val = this.tabModeles.filter(function (c) {
      return c.marque.idMarque === parseInt(value.target.value);
    });
    this.tabModelesFiltrer = val;

    if (value.target.value === '0') {
      this.disabled = true;
      this.modele = 0;
    } else this.disabled = false;

    this.modele = 0;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.tabAnnoncesFiltrer.length = 0;

    let val = this.tabAnnonces.filter((a) => {
      if (this.carburant != 0 && this.modele == 0 && this.kilometrage == 0) {
        console.log('cas 1');
        return a.carburant.idCarburant == this.carburant;
      } else if (
        this.modele != 0 &&
        this.carburant == 0 &&
        this.kilometrage == 0
      ) {
        return a.modele.idModele == this.modele;
      } else if (
        this.modele == 0 &&
        this.carburant == 0 &&
        this.kilometrage != 0
      ) {
        console.log('cas 2');
        return (
          a.kilometrage > this.kilometrage - 15000 &&
          a.kilometrage <= this.kilometrage
        );
      } else if (
        this.modele != 0 &&
        this.carburant != 0 &&
        this.kilometrage == 0
      ) {
        console.log('cas 3');
        return (
          a.carburant.idCarburant == this.carburant &&
          a.modele.idModele == this.modele
        );
      } else if (
        this.modele != 0 &&
        this.carburant == 0 &&
        this.kilometrage != 0
      ) {
        console.log('cas 4');
        return (
          a.kilometrage > this.kilometrage - 15000 &&
          a.kilometrage <= this.kilometrage &&
          a.modele.idModele == this.modele
        );
      } else if (
        this.modele == 0 &&
        this.carburant != 0 &&
        this.kilometrage != 0
      ) {
        console.log('cas 5');
        return (
          a.kilometrage > this.kilometrage - 15000 &&
          a.kilometrage <= this.kilometrage &&
          a.carburant.idCarburant == this.carburant
        );
      } else if (
        this.carburant != 0 &&
        this.modele != 0 &&
        this.carburant != 0
      ) {
        console.log('cas 6');
        return (
          a.carburant.idCarburant == this.carburant &&
          a.modele.idModele == this.modele &&
          a.kilometrage > this.kilometrage - 15000 &&
          a.kilometrage <= this.kilometrage
        );
      } else return false;
    });

    if (this.carburant == 0 && this.marque == 0 && this.kilometrage == 0) {
      this.rechercheFormulaire.emit(this.tabAnnonces);
    } else {
      this.tabAnnoncesFiltrer.push(...val);
      this.rechercheFormulaire.emit(this.tabAnnoncesFiltrer);
    }
  }
}
