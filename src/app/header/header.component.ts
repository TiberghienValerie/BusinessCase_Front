import {
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faAngleDown,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Utilisateur } from '../models/utilisateur';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() public classAccueil!: string;
  @Input() public classContact!: string;
  @Input() public classApropos!: string;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('fileInput2') fileInput2!: ElementRef;
  faTimes = faTimes;
  faUser = faUser;
  faAngleDown = faAngleDown;
  loginForm!: FormGroup;
  isSubmitted = false;

  public tabUtilisateur: Utilisateur[] = [];

  public isConnected: boolean = false;

  public classActive: boolean = false;
  public classActive2: boolean = false;
  public tabUtilisateurFiltrer: Utilisateur[] = [];

  public nomUtilisateur!: string;
  public prenomUtilisateur!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.tabUtilisateur.push(
      new Utilisateur(
        1,
        'Tiberghien',
        'Valérie',
        '4 allée du printemps',
        '',
        '',
        '42000',
        'Saint Etienne',
        '0600000000',
        'tiberghien.valerie@wanadoo.fr',
        'toto',
        'toto',
        'access_token'
      )
    );

    if (localStorage.hasOwnProperty('ACCESS_TOKEN')) this.isConnected = true;
    else this.isConnected = false;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (localStorage.hasOwnProperty('ACCESS_TOKEN')) this.isConnected = true;
    else this.isConnected = false;
  }
  get formControls() {
    return this.loginForm.controls;
  }
  seConnecter() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    var login = this.loginForm.value.login;
    var pwd = this.loginForm.value.password;
    let val = this.tabUtilisateur.filter(function (u) {
      return u.loginUtilisateur == login && u.pwdUtilisateur == pwd;
    });

    if (val.length > 0) {
      this.tabUtilisateurFiltrer.push(...val);
      this.authService.seConnecter(this.tabUtilisateurFiltrer);
      this.fileInput.nativeElement.click();
      this.nomUtilisateur = this.tabUtilisateurFiltrer[0].nomUtilisateur;
      this.prenomUtilisateur = this.tabUtilisateurFiltrer[0].prenomUtilisateur;
      this.ngOnInit();
      this.router.navigateByUrl('/accueil');
    } else {
      this.ngOnInit();
    }
  }

  seDeconnecter() {
    this.tabUtilisateurFiltrer.length = 0;
    this.authService.deconnecter();
    this.fileInput2.nativeElement.click();
    this.ngOnInit();
    this.router.navigateByUrl('/accueil');
  }

  show() {
    this.classActive = true;
  }

  show2() {
    this.classActive2 = true;
  }

  close2() {
    this.classActive2 = false;
  }

  close() {
    this.classActive = false;
  }
}
