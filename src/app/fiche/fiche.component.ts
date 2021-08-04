import { Component, OnInit } from '@angular/core';
import { Photos } from '../models/photos';
import { ActivatedRoute } from '@angular/router';
import { Annonce } from '../models/annonce';
import { Modele } from '../models/modele';
import { Carburant } from '../models/carburant';
import { Marque } from '../models/marque';
import {Garage} from "../models/garage";
import {annonceApiService} from "../service/annonce-api.service";

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
  constructor(private route: ActivatedRoute, public serviceApiAnnonce: annonceApiService) {

    this.route.paramMap.subscribe((params) => {
      this.idObj = params.get('id')!;
    });

    this.serviceApiAnnonce.getItem(parseInt(this.idObj)).subscribe(
      (data) => {

          this.tabAnnoncesId.push(
            new Annonce(
              data.id,
              data.refAnnonce,
              data.DateAnnonce,
              data.titre,
              data.descriptionCourte,
              data.descriptionLongue,
              data.anneeCirculation,
              data.kilometrage,
              data.prix,
              new Modele(data.modele.id, data.modele.nomModele, new Marque(data.modele.Marque.id, data.modele.Marque.nomMarque)),
              new Garage(data.garage.id, data.garage.nom),
              new Carburant(data.carburant.id, data.carburant.NomCarburant)
            ));

      });


/*
    this.tabPhotos.push(
      new Photos(1, 'audi-rs3-25-tfsi-121974821.jpg', 1),
      new Photos(2, 'audi-rs3-25-tfsi-121974822.jpg', 2),
      new Photos(3, 'audi-rs3-25-tfsi-121974823.jpg', 3),
      new Photos(4, 'audi-rs3-25-tfsi-121974824.jpg', 4),
      new Photos(5, 'audi-rs3-25-tfsi-121974825.jpg', 5)
    );*/



    for (let i = 0; i < this.tabPhotos.length; i++) {
      this.slides.push({
        image: `assets/img/${this.idObj}/${this.tabPhotos[i]['nomPhotos']}`,
      });
    }
  }

  ngOnInit(): void {}
}
