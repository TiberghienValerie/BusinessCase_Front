import { Component, OnInit } from '@angular/core';
import { Photos } from '../models/photos';
import { ActivatedRoute } from '@angular/router';
import { Annonce } from '../models/annonce';
import { Modele } from '../models/modele';
import { Carburant } from '../models/carburant';
import { Marque } from '../models/marque';
import {Garage} from "../models/garage";
import {annonceApiService} from "../service/annonce-api.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css'],
})
export class FicheComponent implements OnInit {
  public tabPhotos: Photos[] = [];

  idObj!: string;
  public itemsPerSlide = 2;
  public singleSlideOffset = false;
  public noWrap = false;
  public cycleInterval = 3000;
  public showIndicator = false;
  public tabAnnoncesId: Annonce[] = [];
  public photos: Photos[] = [];

  slides: { image: string; text?: string }[] = [];
  constructor(
    private route: ActivatedRoute,
    public serviceApiAnnonce: annonceApiService,
    private spinner: NgxSpinnerService
  ) {

    this.route.paramMap.subscribe((params) => {
      this.idObj = params.get('id')!;
    });
    this.spinner.show("fiche");
    this.serviceApiAnnonce.getItem(parseInt(this.idObj)).subscribe(
      (data) => {
        this.photos = [];
        if(data.photos.length>0) {
          for(let p of data.photos) {
              this.photos[p.ordre-1] = new Photos(p.id, p.nomPhotos, p.pathPhotos, p.ordre);
          }
          for(let p1 of this.photos) {
            this.slides.push({
              image: `${p1.pathPhotos}`,
            });
          }
        }else{
          this.photos.push(new Photos(1, 'Générique', 'assets/img/photogenerique.jpg', 1))
        }

        console.log(this.photos);
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
              new Carburant(data.carburant.id, data.carburant.NomCarburant),
              this.photos
            ));
        this.spinner.hide("fiche");
      });
  }

  ngOnInit(): void {}
}
