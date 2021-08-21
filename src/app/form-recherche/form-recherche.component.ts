import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AnneeCirculation } from '../interface/annee-circulation';
import { Annonce } from '../models/annonce';
import { Carburant } from '../models/carburant';
import { Kilometrage } from '../interface/kilometrage';
import { Marque } from '../models/marque';
import { Modele } from '../models/modele';
import { PrixVente } from '../interface/prix-vente';
import {marqueApiService} from "../service/marque-api.service";
import {modeleApiService} from "../service/modele-api.service";
import {carburantApiService} from "../service/carburant-api.service";
import {Garage} from "../models/garage";
import {annonceApiService} from "../service/annonce-api.service";
import {Photos} from "../models/photos";

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
  public url!: string;
  public nbPages!: number;
  public photos: Photos[] = [];

  @Input() public tabAnnonces!: Annonce[];
  @Input() public nbTotalEnregistrement!: number;
  @Input() public tabKilometrage!: Kilometrage[];
  @Input() public tabPrixVente!: PrixVente[];
  @Input() public tabAnneeCirculation!: AnneeCirculation[];
  @Input() public mode!: string;

  @Output() public rechercheFormulaire: EventEmitter<Annonce[]>;
  @Output() public rechercheFormulaireNbEnregistrement: EventEmitter<number>;
  @Output() public rechercheFormulaireUrl: EventEmitter<string>;
  @Output() public rechercheFormulaireMode: EventEmitter<string>;

  faSearch = faSearch;


  getCarburants(page: number = 1) {
    this.serviceApiCarburant.getCollection(page).subscribe(
      (data) => {
        for (let o of data['hydra:member']) {
          this.tabCarburants.push(
            new Carburant(o.id, o.NomCarburant)
          );
        }

     /*   if(data['hydra:view']['hydra:next'] !== undefined) {
          let recherchePage = parseInt(data['hydra:view']['hydra:next'].split(/\s*=\s*///)[1]);
   /*       this.getCarburants(recherchePage);
        }*/
      },
      () => {
        alert('Cannot load Modele');
      },
    );
  }

  getMarques(page: number = 1) {
    this.serviceApiMarque.getCollection(page).subscribe(
      (data) => {
        for (let o of data['hydra:member']) {
          this.tabMarques.push(
            new Marque(o.id, o.nomMarque)
          );
        }
        /*if(data['hydra:view']['hydra:next'] !== undefined) {
          let recherchePage = parseInt(data['hydra:view']['hydra:next'].split(/\s*=\s*///)[1]);
         // this.getModeles(recherchePage);
       // }
      },
      () => {
        alert('Cannot load Modele');
      },
    );
  }

  getModeles(page: number = 1) {
    this.serviceApiModele.getCollection(page).subscribe(
      (data) => {
        for (let o of data['hydra:member'] ) {
          this.tabModeles.push(
            new Modele(o.id, o.nomModele, new Marque(o.Marque.id, o.Marque.nomMarque))
          );
        }
        if(data['hydra:view']['hydra:next']!== undefined) {
          let recherchePage = parseInt(data['hydra:view']['hydra:next'].split(/\s*=\s*/)[1]);
          this.getModeles(recherchePage);
        }
      },
      () => {
        alert('Cannot load Modele');
      },
    );
  }

  constructor( public serviceApiAnnonce: annonceApiService, public serviceApiCarburant: carburantApiService, public serviceApiMarque: marqueApiService, public serviceApiModele: modeleApiService) {
    this.rechercheFormulaire = new EventEmitter();
    this.rechercheFormulaireNbEnregistrement = new EventEmitter();
    this.rechercheFormulaireUrl = new EventEmitter();
    this.rechercheFormulaireMode = new EventEmitter();


    this.tabMarques = [];
    this.tabModeles = [];
    this.tabCarburants = [];
    this.getModeles();
    this.getMarques();
    this.getCarburants();


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
      return c.Marque.id === parseInt(value.target.value);
    });
    this.tabModelesFiltrer = val;

    if (value.target.value === '0') {
      this.disabled = true;
      this.modele = 0;
    } else this.disabled = false;

    this.modele = 0;
  }

  ngOnInit(
  ): void {
  }

  onSubmit() {
    this.mode = 'Recherche';
    this.tabAnnoncesFiltrer = [];

    this.serviceApiAnnonce.getCollectionSearch(this.kilometrage, this.marque, this.modele, this.prixVente, this.anneeCirculation, this.carburant).subscribe(
      (data) => {
        this.nbTotalEnregistrement = data['hydra:totalItems'];

        for (let o of data['hydra:member']) {

          this.photos = [];
          if(o.photos.length>0) {
            let i = 0;
            for(let p of o.photos) {
              this.photos[i] = new Photos(p.id, p.nomPhotos, p.pathPhotos);
              i = i+1;
            }
          }else{
            this.photos.push(new Photos(1, 'Générique', 'assets/img/photogenerique.jpg'))
          }


          this.tabAnnoncesFiltrer.push(
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
            ));
        }

        this.rechercheFormulaire.emit(this.tabAnnoncesFiltrer);
        this.rechercheFormulaireNbEnregistrement.emit(this.nbTotalEnregistrement);



        this.nbPages = parseInt(data['hydra:view']['hydra:last'].split(/\s*page=\s*/)[1]);

        this.url = (data['hydra:view']['hydra:last'].split(/\s*page=\s*/))[0]+'page=';


        this.rechercheFormulaireUrl.emit(this.url);
        this.rechercheFormulaireMode.emit(this.mode);
      });
  }
}
