import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AnneeCirculation } from '../models/annee-circulation';
import { Annonce } from '../models/annonce';
import { Carburant } from '../models/carburant';
import { Kilometrage } from '../models/kilometrage';
import { Marque } from '../models/marque';
import { Modele } from '../models/modele';
import { PrixVente } from '../models/prix-vente';
import { Resultat } from '../models/resultat';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {
  public tabAnnonces: Annonce[] = [];
  public tabKilometrage: Kilometrage[] = [];
  public tabAnneeCirculation: AnneeCirculation[] = [];
  public tabPrixVente: PrixVente[] = [];
  public tabResultat: Resultat[] = [];
  public tabAnnoncesFilter: Annonce[] = [];

  public maxKilometrage!: number;
  public minAnneeCirculation!: number;
  public maxPrixVente!: number;

  public resultat!: number;
  public resultatParPage!: number;

  constructor() {
    this.tabAnnonces.push(
      new Annonce(
        1,
        'AZERTY12',
        new Date('31/05/2021'),
        'Voiture de course',
        'voiture de course géniale',
        'Voiture de course géniale',
        2017,
        100000,
        250000.0,
        0,
        new Modele(1, '2000', new Marque(1, 'Alfa Romeo')),
        1,
        new Carburant(1, 'Essence')
      ),
      new Annonce(
        2,
        'AZERTY12',
        new Date('31/05/2021'),
        'Voiture de course',
        'voiture de course géniale',
        'Voiture de course géniale',
        2017,
        100000,
        250000,
        0,
        new Modele(3, 'A3', new Marque(2, 'Audi')),
        1,
        new Carburant(1, 'Essence')
      ),
      new Annonce(
        3,
        'AZERTY12',
        new Date('31/05/2021'),
        'Voiture de course',
        'voiture de course géniale',
        'Voiture de course géniale',
        2017,
        100000,
        250000.0,
        0,
        new Modele(3, 'A3', new Marque(2, 'Audi')),
        1,
        new Carburant(1, 'Essence')
      ),
      new Annonce(
        4,
        'AZERTY12',
        new Date('31/05/2021'),
        'Voiture de course',
        'voiture de course géniale',
        'Voiture de course géniale',
        2017,
        100000,
        250000.0,
        0,
        new Modele(3, 'A3', new Marque(2, 'Audi')),
        1,
        new Carburant(1, 'Essence')
      ),
      new Annonce(
        5,
        'AZERTY12',
        new Date('31/05/2021'),
        'Voiture de course',
        'voiture de course géniale',
        'Voiture de course géniale',
        2017,
        100000,
        250000.0,
        0,
        new Modele(3, 'A3', new Marque(2, 'Audi')),
        1,
        new Carburant(1, 'Essence')
      ),
      new Annonce(
        6,
        'AZERTY12',
        new Date('31/05/2021'),
        'Voiture de course',
        'voiture de course géniale',
        'Voiture de course géniale',
        1995,
        250000,
        250000.0,
        0,
        new Modele(3, 'A3', new Marque(2, 'Audi')),
        1,
        new Carburant(1, 'Essence')
      ),
      new Annonce(
        7,
        'AZERTY12',
        new Date('31/05/2021'),
        'Voiture de course',
        'voiture de course géniale',
        'Voiture de course géniale',
        2008,
        100000,
        250000.0,
        0,
        new Modele(3, 'A3', new Marque(2, 'Audi')),
        1,
        new Carburant(1, 'Essence')
      ),
      new Annonce(
        8,
        'AZERTY12',
        new Date('31/05/2021'),
        'Voiture de course',
        'voiture de course géniale',
        'Voiture de course géniale',
        2017,
        100000,
        250000.0,
        0,
        new Modele(3, 'A3', new Marque(2, 'Audi')),
        1,
        new Carburant(1, 'Essence')
      ),
      new Annonce(
        9,
        'AZERTY12',
        new Date('31/05/2021'),
        'Voiture de course',
        'voiture de course géniale',
        'Voiture de course géniale',
        2017,
        100000,
        250000.0,
        0,
        new Modele(3, 'A3', new Marque(2, 'Audi')),
        1,
        new Carburant(1, 'Essence')
      ),
      new Annonce(
        10,
        'AZERTY12',
        new Date('31/05/2021'),
        'Voiture de course',
        'voiture de course géniale',
        'Voiture de course géniale',
        2017,
        125000,
        250000.0,
        0,
        new Modele(3, 'A3', new Marque(2, 'Audi')),
        1,
        new Carburant(2, 'Diesel')
      )
    );

    this.tabAnnoncesFilter.push(...this.tabAnnonces);

    this.resultat = 0;
    this.resultatParPage = 25;

    /* calcul du max des kilometrages, du min de la date de mise en circulation, du max des prix de vente */
    this.maxKilometrage = 0;
    this.minAnneeCirculation = 2021;
    this.maxPrixVente = 0;
    for (let i = 0; i < this.tabAnnonces.length; i++) {
      if (this.maxKilometrage < this.tabAnnonces[i].kilometrage) {
        this.maxKilometrage = this.tabAnnonces[i].kilometrage;
      }
      if (this.minAnneeCirculation > this.tabAnnonces[i].anneeCirculation) {
        this.minAnneeCirculation = this.tabAnnonces[i].anneeCirculation;
      }
      if (this.maxPrixVente < this.tabAnnonces[i].prix) {
        this.maxPrixVente = this.tabAnnonces[i].prix;
      }
    }

    /* Initialisation du tableau des résultats */
    var j = 0;
    for (var i = 2; i <= 10; i = i + 2) {
      this.tabResultat.push(new Resultat(j, i));
      j++;
    }

    /* Initialisation du tableau des kilomètrages */
    var j = 0;
    for (var i = 5000; i <= this.maxKilometrage; i = i + 15000) {
      this.tabKilometrage.push(new Kilometrage(j, i));
      j++;
    }
    if (i > this.maxKilometrage) {
      this.tabKilometrage.push(new Kilometrage(j, i));
    }

    /* Initialisation du tableau des années de circulation */
    var j = 0;
    var anneeEnCours = 2021;
    for (var i = this.minAnneeCirculation; i <= anneeEnCours; i = i + 5) {
      this.tabAnneeCirculation.push(new AnneeCirculation(j, i));
      j++;
    }
    if (i > anneeEnCours) {
      this.tabAnneeCirculation.push(new AnneeCirculation(j, i));
    }

    /* Initialisation du tableau des prix de vente */
    var j = 0;
    var maxPrix = Math.round(this.maxPrixVente / 10000) * 10000;
    for (var i = 5000; i <= maxPrix; i = i + 15000) {
      this.tabPrixVente.push(new PrixVente(j, i));
      j++;
    }
    if (i > maxPrix) {
      this.tabPrixVente.push(new PrixVente(j, i));
    }
  }

  /* Pagination */

  contentArray: Annonce[] = new Array(10).fill('');
  returnedArray!: Annonce[];
  showBoundaryLinks: boolean = true;
  showDirectionLinks: boolean = true;

  ngOnInit(): void {
    this.contentArray = this.tabAnnoncesFilter;
    this.returnedArray = this.tabAnnoncesFilter.slice(0, this.resultatParPage);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.contentArray.slice(startItem, endItem);
  }

  /*Fin pagination */

  rechercheFormulaire(tabAnnonce: Annonce[]) {
    this.tabAnnoncesFilter.length = 0;
    this.tabAnnoncesFilter.push(...tabAnnonce);
    this.ngOnInit();
  }

  onResultatChanged(value: any) {
    if (value.target.value != 0) this.resultatParPage = value.target.value;
    else this.resultatParPage = 25;

    this.ngOnInit();
  }

  onSubmit() {}
}
