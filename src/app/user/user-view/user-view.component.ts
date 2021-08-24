import { Component, OnInit } from '@angular/core';

import {environment} from "../../../environments/environment";
import {User} from "../../models/user";
import {AuthService} from "../../service/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {FormBuilder} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Annonces} from "../../models/annonces";
import {Photos} from "../../models/photos";
import {Annonce} from "../../models/annonce";
import {Modele} from "../../models/modele";
import {Marque} from "../../models/marque";
import {Garage} from "../../models/garage";
import {Carburant} from "../../models/carburant";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  public token: string |null | undefined;
  public id: string |null | undefined;
  public tabUser: Array<User> = [];
  public apiURL = environment.apiURL;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
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

      this.httpClient.get<User>(`${this.apiURL}/api/users/${this.id}`, httpOptions).subscribe(
        (data) => {

          this.tabUser.push(
            new User(
              data.id,
              data.username,
              data.email,
              data.telephone,
              data.siret,
              data.nom,
              data.prenom,
              data.roles
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
