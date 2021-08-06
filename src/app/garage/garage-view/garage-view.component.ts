import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Collection} from "../../models/collection";
import {Garages} from "../../models/garages";
import {Ville} from "../../models/ville";
import {AuthService} from "../../service/auth.service";
import {GarageApiService} from "../../service/garage-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {user2} from "../../mon-compte/user2";

@Component({
  selector: 'app-garage-view',
  templateUrl: './garage-view.component.html',
  styleUrls: ['./garage-view.component.css']
})



export class GarageViewComponent implements OnInit {

  public token: string |null | undefined;
  public id: string |null | undefined;
  public tabGarage: Array<Garages> = [];

  constructor(
    private authService: AuthService,
    private garageAiService: GarageApiService,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute) {

    if (this.authService.hasToken()) {
      this.route.paramMap.subscribe((params) => {
        this.id = params.get('id')!;
      });
      this.token = this.authService.token();
      const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)

      this.httpClient.get<Garages>(`https://localhost:8000/api/garages/${this.id}`,{headers}).subscribe(
        (data) => {
            this.tabGarage.push(
              new Garages(
                data.id,
                data.nom,
                data.telephone,
                new Ville(data.ville.id, data.ville.codePostal, data.ville.nomVille, data.ville.adresse1, data.ville.adresse2, data.ville.adresse3 ),
                data.annonces
              )
            );
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

}
