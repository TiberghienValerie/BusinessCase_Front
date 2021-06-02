import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { Annonce } from '../models/annonce';
import { Carburant } from '../models/carburant';
import { Kilometrage } from '../models/kilometrage';
import { Marque } from '../models/marque';
import { Modele } from '../models/modele';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {
  public tabAnnonces: Annonce[] = [];
  public tabKilometrage: Kilometrage[] = [];
  public tabAnnoncesFilter: Annonce[] = [];

  public maxKilometrage!: number;

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
        2017,
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
        2017,
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

    /* calcul du max des kilometrages */
    this.maxKilometrage = 0;
    for (let i = 0; i < this.tabAnnonces.length; i++) {
      if (this.maxKilometrage < this.tabAnnonces[i].kilometrage) {
        this.maxKilometrage = this.tabAnnonces[i].kilometrage;
      }
    }

    var j = 0;
    for (var i = 5000; i <= this.maxKilometrage; i = i + 15000) {
      this.tabKilometrage.push(new Kilometrage(j, i));
      j++;
    }
    if (i > this.maxKilometrage) {
      this.tabKilometrage.push(new Kilometrage(j, i));
    }
  }

  ngOnInit(): void {}

  rechercheFormulaire(tabAnnonce: Annonce[]) {
    this.tabAnnoncesFilter.length = 0;
    this.tabAnnoncesFilter.push(...tabAnnonce);
  }
}
