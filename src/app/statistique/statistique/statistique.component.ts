import { Component, OnInit } from '@angular/core';
import {Garages} from "../../models/garages";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../service/auth.service";
import {GarageApiService} from "../../service/garage-api.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Collection} from "../../models/collection";
import {Annonces} from "../../models/annonces";
import {User} from "../../models/user";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {

  public token: string |null | undefined;
  public url: string |null | undefined;
  public countGarages!: number;
  public countUsers!: number;
  public countAnnonces!: number;
  public apiURL = environment.apiURL;

  constructor(
    private authService: AuthService,
    private garageApiService: GarageApiService,
    private httpClient: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {

    if (this.authService.hasToken()) {
      this.token = this.authService.token();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };
      this.spinner.show("statistique");
      this.httpClient.get<Collection<Annonces>>(`${this.apiURL}/api/annonces`, httpOptions).subscribe(
        (data) => {
          this.countAnnonces = data['hydra:totalItems'];
        });

      this.httpClient.get<Collection<Garages>>(`${this.apiURL}/api/garages`, httpOptions).subscribe(
        (data) => {
          this.countGarages = data['hydra:totalItems'];
        });

      this.httpClient.get<Collection<User>>(`${this.apiURL}/api/users`, httpOptions).subscribe(
        (data) => {
          this.countUsers = data['hydra:totalItems']-1;
        });
      this.spinner.hide("statistique");

    }
  }

  ngOnInit(): void {
  }

}
