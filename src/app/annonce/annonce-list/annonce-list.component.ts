import { Component, OnInit } from '@angular/core';
import {Annonces} from "../../models/annonces";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Collection} from "../../models/collection";
import {Garages} from "../../models/garages";
import {Ville} from "../../models/ville";
import {Annonce} from "../../models/annonce";
import {Modele} from "../../models/modele";
import {Marque} from "../../models/marque";
import {Garage} from "../../models/garage";
import {Carburant} from "../../models/carburant";
import {AuthService} from "../../service/auth.service";
import {annonceApiService} from "../../service/annonce-api.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgxSpinnerService} from "ngx-spinner";
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import {Photos} from "../../models/photos";

@Component({
  selector: 'app-annonce-list',
  templateUrl: './annonce-list.component.html',
  styleUrls: ['./annonce-list.component.css']
})
export class AnnonceListComponent implements OnInit {

  public token: string |null | undefined;
  public url: string |null | undefined;
  public tabAnnonces: Array<Annonces> = [];
  public apiURL = environment.apiURL;
  public nbTotalEnregistrement!: number;
  public nbPages!: number;
  public resultatParPage!: number;
  public url2!: string;
  public photos: Photos[] = [];

  listeAnnonces() {
    if (this.authService.hasToken()) {
      this.token = this.authService.token();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };
      this.url = `/api/annonces?garage.user.id=${localStorage.getItem('id')}`;
      this.spinner.show("annonce-list");
      this.httpClient.get<Collection<Annonces>>(`${this.apiURL}${this.url}`, httpOptions).subscribe(
        (data) => {
          for (let o of data['hydra:member']) {
            this.photos = [];
            if(o.photos.length>0) {
              for(let p of o.photos) {
                this.photos[p.ordre-1] = new Photos(p.id, p.nomPhotos, p.pathPhotos, p.ordre);
              }
            }else{
              this.photos.push(new Photos(1, 'Générique', 'assets/img/photogenerique.jpg', 1))
            }
            this.tabAnnonces.push(
              new Annonce(
                o.id,
                o.refAnnonce,
                o.DateAnnonce,
                o.titre,
                o.descriptionCourte,
                o.descriptionLongue,
                o.anneeCirculation,
                o.kilometrage,
                o.prix,
                new Modele(o.modele.id, o.modele.nomModele, new Marque(o.modele.Marque.id, o.modele.Marque.nomMarque)),
                new Garage(o.garage.id, o.garage.nom),
                new Carburant(o.carburant.id, o.carburant.NomCarburant),
                this.photos

              )
            );
          }

          this.nbTotalEnregistrement = data['hydra:totalItems'];
          if(this.nbTotalEnregistrement>30) {
            this.nbPages = parseInt(data['hydra:view']['hydra:last'].split(/\s*page=\s*/)[1]);
            this.url2 = (data['hydra:view']['hydra:last'].split(/\s*page=\s*/))[0]+'page=';
          }else{
            this.nbPages = 1;
            this.url2 = '';
          }
            this.spinner.hide("annonce-list");

        },
        (e: { error: { code: number, message: string } }) => {
          // When error.
          alert(e.error.message);
        },
      );

    }
  }


  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {
    this.resultatParPage = 30;

  }

  ngOnInit(): void {
    this.tabAnnonces = [];
    this.listeAnnonces();
  }

  pageChanged(event: PageChangedEvent, url2: string): void {

    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    url2 = url2 + event.page;
    this.tabAnnonces = [];
    if (this.authService.hasToken()) {
      this.token = this.authService.token();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };

    this.spinner.show("annonce-list");
    this.httpClient.get<Collection<Annonces>>(`${this.apiURL}${url2}`, httpOptions).subscribe(
      (data) => {
        for (let o of data['hydra:member']) {
          this.photos = [];
          if(o.photos.length>0) {
            for(let p of o.photos) {
              this.photos[p.ordre-1] = new Photos(p.id, p.nomPhotos, p.pathPhotos, p.ordre);
            }
          }else{
            this.photos.push(new Photos(1, 'Générique', 'assets/img/photogenerique.jpg', 1))
          }
          this.tabAnnonces.push(
            new Annonce(
              o.id,
              o.refAnnonce,
              o.DateAnnonce,
              o.titre,
              o.descriptionCourte,
              o.descriptionLongue,
              o.anneeCirculation,
              o.kilometrage,
              o.prix,
              new Modele(o.modele.id, o.modele.nomModele, new Marque(o.modele.Marque.id, o.modele.Marque.nomMarque)),
              new Garage(o.garage.id, o.garage.nom),
              new Carburant(o.carburant.id, o.carburant.NomCarburant),
              this.photos
            )
          );
        }

        this.nbTotalEnregistrement = data['hydra:totalItems'];

        if(this.nbTotalEnregistrement>30) {
          this.nbPages = parseInt(data['hydra:view']['hydra:last'].split(/\s*page=\s*/)[1]);
          this.url2 = (data['hydra:view']['hydra:last'].split(/\s*page=\s*/))[0]+'page=';
        }else{
          this.nbPages = 1;
          this.url2 = '';
        }
        this.spinner.hide("annonce-list");

      },
      (e: { error: { code: number, message: string } }) => {
        // When error.
        alert(e.error.message);
      },
    );






    }
  }
}
