import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from "../../environments/environment";
import {AuthService} from "../service/auth.service";
import {UserApiService} from "../service/user-api.service";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {user2} from "./user2";
import {Credentials} from "./monCompte";

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit {

  public token: string |null | undefined;

  public monCompteForm: FormGroup = this.formBuilder.group({
    email: [localStorage.getItem('email'), [Validators.required, Validators.email]],
    nom: [localStorage.getItem('nom'), [Validators.required]],
    telephone: [localStorage.getItem('telephone'), [Validators.required]],
    prenom: [localStorage.getItem('prenom'), [Validators.required]],
    siret: [localStorage.getItem('siret'), [Validators.required]],
  });

  public apiURL = environment.apiURL;

  constructor(
    private authService: AuthService,
    private userApiService: UserApiService,
    private httpClient: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }




  valider() {

    this.monCompteForm.markAllAsTouched();

    // If the form is valid (all inputs valids).
    if (this.monCompteForm.valid) {
      this.token = this.authService.token();
      const body = JSON.stringify(this.monCompteForm.value as Credentials);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };
      this.httpClient.put<user2>(`${this.apiURL}/api/users/${localStorage.getItem('id')}`, body, httpOptions).subscribe(
        (data)=> {
          localStorage.setItem('nom', this.monCompteForm.value.nom);
          localStorage.setItem('prenom', this.monCompteForm.value.prenom);
          localStorage.setItem('telephone', this.monCompteForm.value.telephone);
          localStorage.setItem('email', this.monCompteForm.value.email);
          localStorage.setItem('siret', this.monCompteForm.value.siret);
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
