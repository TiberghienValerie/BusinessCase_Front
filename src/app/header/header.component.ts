import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
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
  faTimes = faTimes;
  faUser = faUser;
  loginForm!: FormGroup;
  isSubmitted = false;

  public classActive: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get formControls() {
    return this.loginForm.controls;
  }
  seConnecter() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.seConnecter(this.loginForm.value);
    //this.router.navigateByUrl('/admin');
  }

  show() {
    this.classActive = true;
  }

  close() {
    this.classActive = false;
  }
}
