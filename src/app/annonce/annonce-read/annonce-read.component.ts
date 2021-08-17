import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Garages} from "../../models/garages";
import {Annonces} from "../../models/annonces";
import {AuthService} from "../../service/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Ville} from "../../models/ville";
import {Photos} from "../../models/photos";
import {Annonce} from "../../models/annonce";
import {Modele} from "../../models/modele";
import {Marque} from "../../models/marque";
import {Garage} from "../../models/garage";
import {Carburant} from "../../models/carburant";
import {NgxSpinnerService} from "ngx-spinner";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Credentials} from "../image";

@Component({
  selector: 'app-annonce-read',
  templateUrl: './annonce-read.component.html',
  styleUrls: ['./annonce-read.component.css']
})
export class AnnonceReadComponent implements OnInit {

  public token: string |null | undefined;
  public id: string |null | undefined;
  public tabAnnonce: Array<Annonces> = [];
  public apiURL = environment.apiURL;
  public photos: Photos[] = [];
  faTimes = faTimes;

  public imageForm: FormGroup = this.formBuilder.group({
    image: ['', [Validators.required]],
  });

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) {


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
      this.spinner.show("annonce-read");
      this.httpClient.get<Annonces>(`${this.apiURL}/api/annonces/${this.id}`, httpOptions).subscribe(
        (data) => {
          this.photos = [];
          if(data.photos.length>0) {
            for(let p of data.photos) {
              this.photos[p.ordre-1] = new Photos(p.id, p.nomPhotos, p.pathPhotos, p.ordre);
            }
          }else{
            this.photos.push(new Photos(1, 'Générique', 'assets/img/photogenerique.jpg', 1))
          }
          this.tabAnnonce.push(
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
            )
          );
          this.spinner.hide("annonce-read");
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

  valider() {

  }

}
