import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
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

  @Output() public utilisateurConnecte!: EventEmitter<Utilisateur>;

  public tabUtilisateur: Utilisateur[] = [];

  public isConnected: boolean = false;

  public classActive: boolean = false;
  public classActive2: boolean = false;

  public nomUtilisateur: string | null | undefined ;
  public prenomUtilisateur: string | null | undefined;


 
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

    this.nomUtilisateur = localStorage.getItem('nomUtilisateur');
      this.prenomUtilisateur = localStorage.getItem('nomUtilisateur');
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
  
      this.authService.seConnecter(val[0]);
      this.nomUtilisateur = localStorage.getItem('nomUtilisateur');
      this.prenomUtilisateur = localStorage.getItem('nomUtilisateur');
      
      this.fileInput.nativeElement.click();
     
      this.ngOnInit();
      this.router.navigateByUrl('/accueil');
    } else {
      this.ngOnInit();
    }
  }

  seDeconnecter() {
    
    this.authService.deconnecter();
    
    this.fileInput2.nativeElement.click();
    this.nomUtilisateur = '';
    this.prenomUtilisateur = '';
   
    this.ngOnInit();
    this.loginForm = this.formBuilder.group({
      login: [''],
      password: [''],
    });
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
