import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GarageApiService} from "../../service/garage-api.service";
import {Collection} from "../../models/collection";
import {User} from "../../models/user";
import {Garages} from "../../models/garages";
import {Annonce} from "../../models/annonce";
import {Ville} from "../../models/ville";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from "ngx-spinner";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'ngbd-modal-content',
  template: `

      <div class="modal-header">
        <h4 id="deconnexion-name" class="modal-title pull-left">
          Suppression
        </h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="modal-container">
          <p>Voulez-vous supprimer le garage {{name}} ?</p>
          <p>
            <input type="submit" (click)="suppression(id);activeModal.close('Close click')" value="Ok"/>
          </p>
        </div>
      </div>

  `
})
export class NgbdModalContent {
  @Input() name!:string;
  @Input() id!:number;

  public token: string |null | undefined;
  public apiURL = environment.apiURL;

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  suppression(idgarage: number){

    if (this.authService.hasToken()) {
      this.token = this.authService.token();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };

      this.httpClient.delete(`${this.apiURL}/garages/${idgarage}`, httpOptions).subscribe(
        (data) => {
          this.router.navigate(['']);
        },
        (e: {error: {code: number, message: string}}) => {
          // When error.
          alert(e.error.message);
        },
      );
    }

  }
}

@Component({
  selector: 'app-garage-list',
  templateUrl: './garage-list.component.html',
  styleUrls: ['./garage-list.component.css']
})

export class GarageListComponent implements OnInit {


  public token: string |null | undefined;
  public url: string |null | undefined;
  public tabGarages: Array<Garages> = [];
  public apiURL = environment.apiURL;


  listeGarages() {
    if (this.authService.hasToken()) {
      this.token = this.authService.token();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };
      this.url = `/garages?user.id=${localStorage.getItem('id')}`;
      this.spinner.show("garage-list");
      this.httpClient.get<Collection<Garages>>(`${this.apiURL}${this.url}`, httpOptions).subscribe(
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
          this.spinner.hide("garage-list");
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
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.tabGarages = [];
    this.listeGarages();
  }

  open(id: number, name: string) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = name;
    modalRef.componentInstance.id = id;
  }












}
