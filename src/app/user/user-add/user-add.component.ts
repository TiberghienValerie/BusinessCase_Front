import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../service/auth.service";
import {UserApiService} from "../../service/user-api.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Credentials} from "../../mon-compte/monCompte";
import {user2} from "../../mon-compte/user2";
import {userPro} from "../userpro";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  public token: string |null | undefined;

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
    private formBuilder: FormBuilder) { }


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
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };
      this.httpClient.post<userPro>(`${this.apiURL}/api/users`, body, httpOptions).subscribe(
        (data)=> {
          this.router.navigate(['lesUsers']);
        },
        (e: {error: {code: number, message: string}}) => {
          // When error.
          alert(e.error.message);
        },
      );
    }




  }

}
