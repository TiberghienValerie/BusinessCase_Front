import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly key = 'access_token';
  constructor() {}

  saveToken(token: string): void {
    localStorage.setItem(this.key, token);
  }

  hasToken(): boolean {
    return null !== localStorage.getItem(this.key);
  }

  removeToken(): void {
    localStorage.removeItem(this.key);
  }

  token() {
    return localStorage.getItem(this.key);
  }


  public estConnecte() {
    return localStorage.getItem('access_token') !== null;
  }
  public deconnecter() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
    localStorage.removeItem('telephone');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('siret');
  }
}
