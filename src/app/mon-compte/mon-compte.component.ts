import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit {
  monCompteForm!: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.monCompteForm = this.formBuilder.group({
      nomUtilisateur: [localStorage.getItem('nom'), Validators.required],
      prenomUtilisateur: [localStorage.getItem('prenom'), Validators.required],
      telUtilisateur: [localStorage.getItem('telephone'), Validators.required],
      emailUtilisateur: [localStorage.getItem('email'), Validators.required]
    });
  }


  get formControls() {
    return this.monCompteForm.controls;
  }

  valider() {
    this.isSubmitted = true;
    if (this.monCompteForm.invalid) {
     return;
    }else{
      localStorage.setItem('nom', this.monCompteForm.value.nomUtilisateur);
      localStorage.setItem('prenom', this.monCompteForm.value.prenomUtilisateur);
      localStorage.setItem('telephone', this.monCompteForm.value.telUtilisateur);
      localStorage.setItem('email', this.monCompteForm.value.emailUtilisateur);

    }

  }

}
