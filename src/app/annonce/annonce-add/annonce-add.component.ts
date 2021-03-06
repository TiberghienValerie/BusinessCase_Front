import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {GarageApiService} from "../../service/garage-api.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Carburant} from "../../models/carburant";
import {carburantApiService} from "../../service/carburant-api.service";
import {marqueApiService} from "../../service/marque-api.service";
import {modeleApiService} from "../../service/modele-api.service";
import {Marque} from "../../models/marque";
import {Modele} from "../../models/modele";
import {Garage} from "../../models/garage";
import {Collection} from "../../models/collection";
import {Garages} from "../../models/garages";
import {Ville} from "../../models/ville";
import {environment} from "../../../environments/environment";
import {CredentialsAnnonce} from "../credentialsAnnonce";


@Component({
  selector: 'app-annonce-add',
  templateUrl: './annonce-add.component.html',
  styleUrls: ['./annonce-add.component.css']
})
export class AnnonceAddComponent implements OnInit {

  public token: string |null | undefined;
  public url: string |null | undefined;
  public apiURL = environment.apiURL;
  public apiConnexion = environment.apiConnexion;

  public minNum = 0;
  public maxNum = 250000;

  public minDate = 1975;
  public maxDate = 2030;

  public annonceForm: FormGroup = this.formBuilder.group({
    nom: ['', [Validators.required]],
    description: ['', [Validators.required]],
    anneeCirculation: ['', [Validators.required, Validators.min(this.minDate), Validators.max(this.maxDate)]],
    kilometrage: ['', [Validators.required, Validators.min(this.minNum), Validators.max(this.maxNum)]],
    prix: ['', [Validators.required, Validators.min(this.minNum), Validators.max(this.maxNum)]],
    carburant:[0, [Validators.required]],
    modele: [0, [Validators.required]],
    marque: [0, [Validators.required]],
    garage: [0, [Validators.required]]

  });

  public tabCarburants: Carburant[] = [];
  public tabGarages: Garage[] = [];
  public tabMarques: Marque[] = [];
  public tabModeles: Modele[] = [];
  public tabModelesFiltrer: Modele[] = [];
  public disabled: boolean = true;

  getCarburants(page: number = 1) {
    this.serviceApiCarburant.getCollection(page).subscribe(
      (data) => {
        for (let o of data['hydra:member']) {
          this.tabCarburants.push(
            new Carburant(o.id, o.NomCarburant)
          );
        }
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

  getGarages() {

    if (this.authService.hasToken()) {
      this.token = this.authService.token();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };
      this.url = `/garages?user.id=${localStorage.getItem('id')}`;
      this.httpClient.get<Collection<Garages>>(`${this.apiURL}${this.url}`, httpOptions).subscribe(
        (data) => {
          for (let o of data['hydra:member']) {
            this.tabGarages.push(
              new Garage(
                o.id,
                o.nom
              )
            );
          }

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
    private garageApiService: GarageApiService,
    private httpClient: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    public serviceApiCarburant: carburantApiService,
    public serviceApiMarque: marqueApiService,
    public serviceApiModele: modeleApiService
  ) {
    this.tabCarburants = [];
    this.tabGarages = [];
    this.tabMarques = [];
    this.tabModeles = [];
    this.tabModelesFiltrer = [];
    this.getCarburants();
    this.getModeles();
    this.getMarques();
    this.getGarages();
  }

  ngOnInit(): void {
  }

  onMarqueChanged(value: any) {

    this.tabModelesFiltrer.length = 0;
    let val = this.tabModeles.filter(function (c) {
      return c.Marque.id === parseInt(value.target.value);
    });
    this.tabModelesFiltrer = val;

    if (value.target.value === '0') {
      this.disabled = true;
    } else this.disabled = false;
  }

  valider() {



    this.annonceForm.markAllAsTouched();
    // If the form is valid (all inputs valids).
    if (this.annonceForm.valid) {
      this.token = this.authService.token();
      const body = JSON.stringify(this.annonceForm.value as CredentialsAnnonce);

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };

      //Insertion du garage et de la ville

      this.httpClient.post<CredentialsAnnonce>(`${this.apiConnexion}/annonce/add`, body, httpOptions).subscribe(
        (data)=> {

          this.router.navigate(['mesAnnonces']);
        });
    }
  }



}
