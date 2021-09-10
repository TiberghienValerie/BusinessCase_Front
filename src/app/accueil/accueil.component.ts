import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AnneeCirculation } from '../interface/annee-circulation';
import { Annonce } from '../models/annonce';
import { Carburant } from '../models/carburant';
import { Kilometrage } from '../interface/kilometrage';
import { Marque } from '../models/marque';
import { Modele } from '../models/modele';
import { Garage } from '../models/garage';
import { PrixVente } from '../interface/prix-vente';
import { Resultat } from '../interface/resultat';
import {annonceApiService} from "../service/annonce-api.service";
import {Collection} from "../models/collection";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {NgxSpinnerService} from "ngx-spinner";
import {Photos} from "../models/photos";


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
 // public tabResultat: Resultat[] = [];
  public tabAnnoncesFilter: Annonce[] = [];

  public  maxKilometrage: number = 200000;
  public  minAnneeCirculation: number = 1975;
  public maxPrixVente: number = 200000;
  public  anneeEnCours:number = (new Date ()).getFullYear();
  public nbTotalEnregistrement!: number;
  public nbPages!: number;
  public url!: string;
  public resultatParPage!: number;
  public maxPrix!: number;
  public mode!: string;
  public apiURL = environment.apiURL;
  public apiConnexion = environment.apiConnexion;
  public photos: Photos[] = [];

  getParametre() {

    /* Initialisation du tableau des kilomètrages */
    var j = 0;
    for (var i = 5000; i <= this.maxKilometrage; i = i + 15000) {
      this.tabKilometrage.push({idKilometrage: j, nomKilometrage: i});
      j++;
    }
    if (i > this.maxKilometrage) {
      this.tabKilometrage.push({idKilometrage: j, nomKilometrage: i});
    }

    /* Initialisation du tableau des années de circulation */
    var j = 0;
    for (var i = this.minAnneeCirculation; i <= this.anneeEnCours; i = i + 5) {
      this.tabAnneeCirculation.push({
        idAnneeCirculation: j,
        nomAnneeCirculation: i,
      });
      j++;
    }
    if (i > this.anneeEnCours) {
      this.tabAnneeCirculation.push({
        idAnneeCirculation: j,
        nomAnneeCirculation: i,
      });
    }
    /* Initialisation du tableau des prix de vente */
    var j = 0;
    this.maxPrix = Math.round(this.maxPrixVente / 10000) * 10000;
    for (var i = 5000; i <= this.maxPrix; i = i + 15000) {
      this.tabPrixVente.push({idPrixVente: j, nomPrixVente: i});
      j++;
    }
    if (i > this.maxPrix) {
      this.tabPrixVente.push({idPrixVente: j, nomPrixVente: i});
    }
}

  getAnnonces(page: number = 1)
  {
    this.spinner.show("accueil");
    this.serviceApiAnnonce.getCollection().subscribe(
      (data) => {
        for (let o of data['hydra:member']) {
          this.photos = [];
          if(o.photos.length>0) {
            let i = 0;
            for(let p of o.photos) {
              this.photos[i] = new Photos(p.id, p.nomPhotos, `${this.apiConnexion}/uploads/${o.id}/${p.pathPhotos}`);
              i = i+1;
            }
          }else{
            this.photos.push(new Photos(1, 'Voiture Générique', 'assets/img/voiture-photogenerique.jpg'))
          }
            this.tabAnnonces.push(
              new Annonce(
                o.id,
                o.refAnnonce,
                o.DateAnnonce,
                o.nom,
                o.descriptionCourte,
                o.descriptionLongue,
                o.anneeCirculation,
                o.kilometrage,
                o.prix,
                new Modele(o.modele.id, o.modele.nomModele, new Marque(o.modele.Marque.id, o.modele.Marque.nomMarque)),
                new Garage(o.garage.id, o.garage.nom),
                new Carburant(o.carburant.id, o.carburant.NomCarburant),
                this.photos
              ));
          }


        this.tabAnnoncesFilter.push(...this.tabAnnonces);

        this.nbTotalEnregistrement = data['hydra:totalItems'];
        this.nbPages = parseInt(data['hydra:view']['hydra:last'].split(/\s*=\s*/)[1]);
        this.url = (data['hydra:view']['hydra:last'].split(/\s*=\s*/))[0]+'=';
        this.spinner.hide("accueil");
      }


      );
  }



  constructor(
    private httpClient: HttpClient,
    public serviceApiAnnonce: annonceApiService,
    private spinner: NgxSpinnerService
  ) {

    /* calcul du max des kilometrages, du min de la date de mise en circulation, du max des prix de vente */
    this.tabAnnonces = [];
    this.tabAnnoncesFilter = [];
    this.getAnnonces();
    this.getParametre();
    this.resultatParPage = 30;
    this.mode = 'nonRecherche';
  }

  ngOnInit(): void {

  }

  pageChanged(event: PageChangedEvent, url: string, mode: string): void {

    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    url = url + event.page;
    this.mode = mode;
    this.tabAnnonces = [];
    this.tabAnnoncesFilter = [];
    this.spinner.show("accueil");
    this.serviceApiAnnonce.getCollectionSpecifique(`${this.apiURL}${url}`).subscribe(
        (data) => {
          for (let o of data['hydra:member']) {
            this.photos = [];
            if(o.photos.length>0) {
              let i = 0;
              for(let p of o.photos) {
                this.photos[i] = new Photos(p.id, p.nomPhotos, `${this.apiConnexion}/uploads/${o.id}/${p.pathPhotos}`);
                i = i+1;
              }
            }else{
              this.photos.push(new Photos(1, 'Voiture Générique', 'assets/img/voiture-photogenerique.jpg'))
            }


            this.tabAnnonces.push(
              new Annonce(
                o.id,
                o.refAnnonce,
                o.DateAnnonce,
                o.nom,
                o.descriptionCourte,
                o.descriptionLongue,
                o.anneeCirculation,
                o.kilometrage,
                o.prix,
                new Modele(o.modele.id, o.modele.nomModele, new Marque(o.modele.Marque.id, o.modele.Marque.nomMarque)),
                new Garage(o.garage.id, o.garage.nom),
                new Carburant(o.carburant.id, o.carburant.NomCarburant),
                this.photos
              ));
          }

          this.tabAnnoncesFilter.push(...this.tabAnnonces);

          this.nbTotalEnregistrement = data['hydra:totalItems'];



          if(this.mode=='nonRecherche') {
            this.nbPages = parseInt(data['hydra:view']['hydra:last'].split(/\s*=\s*/)[1]);
            this.url = (data['hydra:view']['hydra:last'].split(/\s*=\s*/))[0]+'=';
          }else{
            this.nbPages = parseInt(data['hydra:view']['hydra:last'].split(/\s*page=\s*/)[1]);
            this.url = (data['hydra:view']['hydra:last'].split(/\s*page=\s*/))[0]+'page=';
          }

          this.spinner.hide("accueil");
        });
  }

  /*Fin pagination */

  rechercheFormulaireNbEnregistrement(nbTotalEnregistrement: number) {
    this.nbTotalEnregistrement = nbTotalEnregistrement;
  }

  rechercheFormulaireUrl(url: string) {
    this.url = url;
  }

  rechercheFormulaireMode(mode: string) {
    this.mode = mode;
  }

  rechercheFormulaire(tabAnnonce: Annonce[]) {
    this.tabAnnoncesFilter.length = 0;
    this.tabAnnoncesFilter.push(...tabAnnonce);

    this.ngOnInit();
  }

  onSubmit() {}
}
