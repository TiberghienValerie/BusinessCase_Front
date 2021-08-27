import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../service/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserApiService} from "../../service/user-api.service";
import {User} from "../../models/user";
import {Collection} from "../../models/collection";
import {Garages} from "../../models/garages";
import {Ville} from "../../models/ville";
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import {Annonces} from "../../models/annonces";
import {Photos} from "../../models/photos";
import {Annonce} from "../../models/annonce";
import {Modele} from "../../models/modele";
import {Marque} from "../../models/marque";
import {Garage} from "../../models/garage";
import {Carburant} from "../../models/carburant";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public token: string |null | undefined;
  public url: string |null | undefined;
  public tabUser: Array<User> = [];
  public apiURL = environment.apiURL;
  public nbTotalEnregistrement!: number;
  public nbPages!: number;
  public resultatParPage!: number;
  public url2!: string;

  constructor(
    private authService: AuthService,
    private userApiService: UserApiService,
    private httpClient: HttpClient,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService

  ) {
    this.resultatParPage = 30;
  }

  listeUsers() {
    if (this.authService.hasToken()) {
      this.token = this.authService.token();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };
      this.url = `/api/users`;
      this.spinner.show("user-list");
      this.httpClient.get<Collection<User>>(`${this.apiURL}${this.url}`, httpOptions).subscribe(
        (data) => {
          for (let o of data['hydra:member']) {
            if(o.id != localStorage.getItem('id')) {
              this.tabUser.push(
                new User(
                  o.id,
                  o.username,
                  o.email,
                  o.telephone,
                  o.siret,
                  o.nom,
                  o.prenom,
                  o.roles
                )
              );
            }
          }

          this.nbTotalEnregistrement = data['hydra:totalItems'];
          if(this.nbTotalEnregistrement>30) {
            this.nbPages = parseInt(data['hydra:view']['hydra:last'].split(/\s*page=\s*/)[1]);
            this.url2 = (data['hydra:view']['hydra:last'].split(/\s*page=\s*/))[0]+'page=';
          }else{
            this.nbPages = 1;
            this.url2 = '';
          }
          this.spinner.hide("user-list");
        },
        (e: { error: { code: number, message: string } }) => {
          // When error.
          alert(e.error.message);
        },
      );

    }
  }

  ngOnInit(): void {
    this.tabUser = [];
    this.listeUsers();
  }

  pageChanged(event: PageChangedEvent, url2: string): void {

    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    url2 = url2 + event.page;
    this.tabUser = [];
    if (this.authService.hasToken()) {
      this.token = this.authService.token();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };
      this.spinner.show("user-list");
      this.httpClient.get<Collection<User>>(`${this.apiURL}${this.url2}`, httpOptions).subscribe(
        (data) => {
          for (let o of data['hydra:member']) {
            if(o.id != localStorage.getItem('id')) {
              this.tabUser.push(
                new User(
                  o.id,
                  o.username,
                  o.email,
                  o.telephone,
                  o.siret,
                  o.nom,
                  o.prenom,
                  o.roles
                )
              );
            }

          }

          this.nbTotalEnregistrement = data['hydra:totalItems'];
          if(this.nbTotalEnregistrement>30) {
            this.nbPages = parseInt(data['hydra:view']['hydra:last'].split(/\s*page=\s*/)[1]);
            this.url2 = (data['hydra:view']['hydra:last'].split(/\s*page=\s*/))[0]+'page=';
          }else{
            this.nbPages = 1;
            this.url2 = '';
          }
          this.spinner.hide("user-list");
        },
        (e: { error: { code: number, message: string } }) => {
          // When error.
          alert(e.error.message);
        },
      );
    }
  }

}
