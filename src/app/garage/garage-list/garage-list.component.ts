import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GarageApiService} from "../../service/garage-api.service";
import {Collection} from "../../models/collection";
import {User} from "../../models/user";
import {Garages} from "../../models/garages";
import {Annonce} from "../../models/annonce";
import {Ville} from "../../models/ville";

@Component({
  selector: 'app-garage-list',
  templateUrl: './garage-list.component.html',
  styleUrls: ['./garage-list.component.css']
})





export class GarageListComponent implements OnInit {


  public token: string |null | undefined;
  public url: string |null | undefined;
  public tabGarages: Array<Garages> = [];

  constructor(
    private authService: AuthService,
    private garageApiService: GarageApiService,
    private httpClient: HttpClient,
    private router: Router
  ) {

    if (this.authService.hasToken()) {
      this.token = this.authService.token();
      const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
      this.url = `/api/garages?user.id=${localStorage.getItem('id')}`;

        this.httpClient.get<Collection<Garages>>(`https://localhost:8000${this.url}`, {headers}).subscribe(
          (data) => {
            for (let o of data['hydra:member']) {
              this.tabGarages.push(
                new Garages(
                  o.id,
                  o.nom,
                  o.telephone,
                  new Ville(o.ville.id, o.ville.codePostal, o.ville.nomVille, o.ville.adresse1, o.ville.adresse2, o.ville.adresse3),
                  o.annonces
                )
              );
            }
            ;
          },
          (e: { error: { code: number, message: string } }) => {
            // When error.
            alert(e.error.message);
          },
        );

    }
  }

  ngOnInit(): void {
  }

}
