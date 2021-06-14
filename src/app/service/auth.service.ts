import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  public seConnecter(userInfo: Utilisateur[]) {
    localStorage.setItem('ACCESS_TOKEN', userInfo[0].tokenUtilisateur);
  }
  public estConnecte() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  public deconnecter() {
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
