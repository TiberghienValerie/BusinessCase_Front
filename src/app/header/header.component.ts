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
//import { Utilisateur } from '../models/user';
import { AuthService } from '../service/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Token} from 'src/app/header/token';
import {Credentials} from 'src/app/header/credentials';
import {UserApiService} from '../service/user-api.service';
//import {User} from "../models/users";
import {Collection} from "../models/collection";
import {User} from "../models/user";
import {environment} from "../../environments/environment";


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
  isSubmitted = false;
  @Output() public utilisateurConnecte!: EventEmitter<User>;
  public tabUtilisateur: Array<User> = [];

  public roleUtilisateur: string | null | undefined;

  public isConnected: boolean = false;

  public classActive: boolean = false;
  public classActive2: boolean = false;

  public nomUtilisateur: string | null | undefined ;
  public prenomUtilisateur: string | null | undefined;

  public token: string |null | undefined;

  public loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public role !: string;

  public apiURL = environment.apiURL;
  public apiConnexion = environment.apiConnexion;

  constructor(
    private authService: AuthService,
    private userApiService: UserApiService,
    private httpClient: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

    if (this.authService.hasToken()) {
      this.seDeconnecter();
    }

  }
  ngOnInit() {

    if (this.authService.hasToken()) {
      this.isConnected = true;
      this.nomUtilisateur = localStorage.getItem('nom');
      this.prenomUtilisateur = localStorage.getItem('prenom');
      this.roleUtilisateur = localStorage.getItem('role');
    }else{
      this.isConnected = false;
      this.nomUtilisateur = '';
      this.prenomUtilisateur = '';
    }
    this.router.navigate(['']);
  }

  seConnecter() {
    // Set all inputs as touched (display errors of login and password when direct click on submit button).
    this.loginForm.markAllAsTouched();
    // If the form is valid (all inputs valids).
    if (this.loginForm.valid) {

      this.role = '';
      // Forge HTTP request to send to the API to retrieve JWT.
      this.httpClient.post<Token>(`${this.apiConnexion}/authentication_token`, this.loginForm.value as Credentials).subscribe(
        (data) => {
          // When success. Save the JWT in local storage.
          this.authService.saveToken(data.token);
          //const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': `Bearer ${this.token}`
            })
          };
          this.httpClient.get<Collection<User>>(`${this.apiURL}/users?username=${this.loginForm.value.username}`, httpOptions).subscribe(
            (data) => {
              for (let o of data['hydra:member']) {
               o.roles.forEach((role) =>
                {
                    if((role == "ROLE_ADMIN")) {
                        this.role = role;
                    }else if(role == "ROLE_PROFESSIONNEL") {
                      if(this.role == '') {
                        this.role = role;
                      }
                    }
                  });
                localStorage.setItem('nom', o.nom);
                localStorage.setItem('prenom', o.prenom);
                localStorage.setItem('username', o.username);
                localStorage.setItem('id', o.id);
                localStorage.setItem('email', o.email);
                localStorage.setItem('telephone', o.telephone);
                localStorage.setItem('siret', o.siret);
                localStorage.setItem('role', this.role);

                this.ngOnInit();
              }
            });
          // Then redirect Angular page to home.
          this.fileInput.nativeElement.click();
        },
        (e: {error: {code: number, message: string}}) => {
          // When error.
          alert(e.error.message);
        },
      );
    }
  }
  seDeconnecter() {
    this.authService.deconnecter();
    this.fileInput2.nativeElement.click();
    this.ngOnInit();
    this.loginForm = this.formBuilder.group({
      username: [''],
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
