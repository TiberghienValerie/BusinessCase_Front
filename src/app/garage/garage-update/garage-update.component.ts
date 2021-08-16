import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {GarageApiService} from "../../service/garage-api.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {CredentialsVille} from "../credentialsVille";
import {Garages} from "../../models/garages";
import {Ville} from "../../models/ville";
import {environment} from "../../../environments/environment";
import {NgxSpinnerService} from "ngx-spinner";



@Component({
  selector: 'app-garage-update',
  templateUrl: './garage-update.component.html',
  styleUrls: ['./garage-update.component.css']
})
export class GarageUpdateComponent implements OnInit {

  public id: string |null | undefined;
  public token: string |null | undefined;
  public garageForm: FormGroup = this.formBuilder.group({
    nom: ['', [Validators.required]],
    telephone: ['', [Validators.required]],
    adresse1: ['', [Validators.required]],
    adresse2: [''],
    adresse3: [''],
    codePostal:['', [Validators.required]],
    nomVille: ['', [Validators.required]],
    user: [localStorage.getItem('id')]

  });
  public apiURL = environment.apiURL;

  constructor(
    private authService: AuthService,
    private garageApiService: GarageApiService,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
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
      this.spinner.show("garage-update");
      this.httpClient.get<Garages>(`${this.apiURL}/api/garages/${this.id}`, httpOptions).subscribe(
        (data) => {
          this.garageForm.setValue({'nom':  data.nom, 'telephone' : data.telephone, 'adresse1': data.ville.adresse1, 'adresse2': data.ville.adresse2, 'adresse3': data.ville.adresse3, 'codePostal': data.ville.codePostal, 'nomVille': data.ville.nomVille, 'user': localStorage.getItem('id')})
          this.spinner.hide("garage-update");
        },
        (e: {error: {code: number, message: string}}) => {
          // When error.
          alert(e.error.message);
        },
      );
    }


  }

  valider() {

    this.garageForm.markAllAsTouched();
    // If the form is valid (all inputs valids).
    if (this.garageForm.valid) {
      this.token = this.authService.token();
      const body = JSON.stringify(this.garageForm.value as CredentialsVille);

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };

      //Insertion du garage et de la ville

      this.httpClient.put<CredentialsVille>(`${this.apiURL}/garage/update/${this.id}`, body, httpOptions).subscribe(
        (data)=> {
          this.router.navigate(['mesGarages']);
        });

    }
  }

  ngOnInit(): void {

  }

}
