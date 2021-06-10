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

  public isConnected: boolean = false;

  public classActive: boolean = false;
  public classActive2: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
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

    this.authService.seConnecter(this.loginForm.value);
    this.fileInput.nativeElement.click();
    this.ngOnInit();
    this.router.navigateByUrl('/accueil');
  }

  seDeconnecter() {
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
