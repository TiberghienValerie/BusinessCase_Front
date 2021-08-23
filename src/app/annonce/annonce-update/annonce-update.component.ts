import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {GarageApiService} from "../../service/garage-api.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
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
import {Annonces} from "../../models/annonces";

@Component({
  selector: 'app-annonce-update',
  templateUrl: './annonce-update.component.html',
  styleUrls: ['./annonce-update.component.css']
})
export class AnnonceUpdateComponent implements OnInit {

  public token: string |null | undefined;
  public url: string |null | undefined;
  public apiURL = environment.apiURL;
  public id: string |null | undefined;

  public annonceForm: FormGroup = this.formBuilder.group({
    titre: ['', [Validators.required]],
    description: ['', [Validators.required]],
    anneeCirculation: ['', [Validators.required, Validators.min(1975), Validators.max(2030)]],
    kilometrage: ['', [Validators.required, Validators.min(0), Validators.max(250000)]],
    prix: ['', [Validators.required, Validators.min(0), Validators.max(250000)]],
    carburant:[0, [Validators.required]],
    modele: [0, [Validators.required]],
    marque: [0, [Validators.required]],
    garage: [0, [Validators.required]]

  });

  @ViewChild('marque') marque!: ElementRef;


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
      this.url = `/api/garages?user.id=${localStorage.getItem('id')}`;
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

  ngAfterViewInit(): void {

    this.marque.nativeElement.focus();

  }


  constructor(
    private authService: AuthService,
    private garageApiService: GarageApiService,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
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
    this.getGarages();



    if (this.authService.hasToken()) {
      this.route.paramMap.subscribe((params) => {
        this.id = params.get('id')!;
      });
      this.token = this.authService.token();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };
      this.httpClient.get<Annonces>(`${this.apiURL}/api/annonces/${this.id}`, httpOptions).subscribe(
        (data) => {
          this.annonceForm.setValue({'titre':  data.titre, 'description' : data.descriptionLongue, 'anneeCirculation': data.anneeCirculation, 'kilometrage': data.kilometrage, 'prix': data.prix, 'carburant': data.carburant.id, 'modele': data.modele.id, 'marque': data.modele.Marque.id, 'garage': data.garage.id})
          this.getMarques();
          this.getModeles();
          this.onMarqueChanged(data.modele.Marque.id);
          this.ngAfterViewInit();
        },
        (e: {error: {code: number, message: string}}) => {
          // When error.
          alert(e.error.message);
        },
      );

    }

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

      //Insertion de l'annonce

      this.httpClient.put<CredentialsAnnonce>(`${this.apiURL}/annonce/update/${this.id}`, body, httpOptions).subscribe(
        (data)=> {

          this.router.navigate(['mesAnnonces']);
        });
    }
  }


}
