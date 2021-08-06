import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GarageApiService} from "../../service/garage-api.service";
import {CredentialsVille} from "../credentialsVille";


@Component({
  selector: 'app-garage-add',
  templateUrl: './garage-add.component.html',
  styleUrls: ['./garage-add.component.css']
})
export class GarageAddComponent implements OnInit {
  public token: string |null | undefined;
  public garageForm: FormGroup = this.formBuilder.group({
    nom: ['', [Validators.required]],
    telephone: ['', [Validators.required]],
    ville: ['', [Validators.required]],
  });

  constructor(
    private authService: AuthService,
    private garageApiService: GarageApiService,
    private httpClient: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  valider() {
    this.garageForm.markAllAsTouched();
    // If the form is valid (all inputs valids).
    if (this.garageForm.valid) {
      this.token = this.authService.token();
      const body = JSON.stringify(this.garageForm.value as CredentialsVille);
      console.log(body);
      const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);
       //Insertion du garage et de la ville



    }
  }

}
