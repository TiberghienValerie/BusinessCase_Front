import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../service/auth.service";
import {UserApiService} from "../../service/user-api.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {userPro} from "../userpro";
import {User} from "../../models/user";


@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  public token: string | null | undefined;
  public id: string | null | undefined;
  public userForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    nom: ['', [Validators.required]],
    telephone: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    siret: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  public apiURL = environment.apiURL;

  constructor(
    private authService: AuthService,
    private userApiService: UserApiService,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {

    if (this.authService.hasToken()) {
      this.route.paramMap.subscribe((params) => {
        this.id = params.get('id')!;
      });
      this.token = this.authService.token();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };

      this.httpClient.get<userPro>(`${this.apiURL}/api/users/${this.id}`, httpOptions).subscribe(
        (data) => {

          this.userForm.setValue(
            {
              'username': data.username,
              'nom': data.nom,
              'prenom': data.prenom,
              'email': data.email,
              'telephone': data.telephone,
              'siret': data.siret,
              'password': ''
            });
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

  valider() {

    this.userForm.markAllAsTouched();

    // If the form is valid (all inputs valids).
    if (this.userForm.valid) {
      this.token = this.authService.token();
      const body = JSON.stringify(this.userForm.value as userPro);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };
      this.httpClient.put<userPro>(`${this.apiURL}/api/users/${this.id}`, body, httpOptions).subscribe(
        (data) => {
          this.router.navigate(['lesUsers']);
        },
        (e: { error: { code: number, message: string } }) => {
          // When error.
          alert(e.error.message);
        },
      );
    }


  }
}
