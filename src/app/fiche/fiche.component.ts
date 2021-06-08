import { Component, OnInit } from '@angular/core';
import { Photos } from '../models/photos';
import { ActivatedRoute } from '@angular/router';
import { Annonce } from '../models/annonce';
import { Modele } from '../models/modele';
import { Carburant } from '../models/carburant';
import { Marque } from '../models/marque';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css'],
})
export class FicheComponent implements OnInit {
  public tabPhotos: Photos[] = [];

  idObj!: string;
  public itemsPerSlide = 3;
  public singleSlideOffset = false;
  public noWrap = false;
  public cycleInterval = 3000;
  public showIndicator = false;
  public tabAnnoncesId: Annonce[] = [];

  slides: { image: string; text?: string }[] = [];
  constructor(private route: ActivatedRoute) {
    this.tabAnnoncesId.push(
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
      )
    );

    this.tabPhotos.push(
      new Photos(1, 'audi-rs3-25-tfsi-121974821.jpg', 1),
      new Photos(2, 'audi-rs3-25-tfsi-121974822.jpg', 2),
      new Photos(3, 'audi-rs3-25-tfsi-121974823.jpg', 3),
      new Photos(4, 'audi-rs3-25-tfsi-121974824.jpg', 4),
      new Photos(5, 'audi-rs3-25-tfsi-121974825.jpg', 5)
    );

    this.route.paramMap.subscribe((params) => {
      this.idObj = params.get('id')!;
    });

    for (let i = 0; i < this.tabPhotos.length; i++) {
      this.slides.push({
        image: `assets/img/${this.idObj}/${this.tabPhotos[i]['nomPhotos']}`,
      });
    }
  }

  ngOnInit(): void {}
}
