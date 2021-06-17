import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  public seConnecter(userInfo: Utilisateur) {
    localStorage.setItem('ACCESS_TOKEN', userInfo.tokenUtilisateur);
    localStorage.setItem('nomUtilisateur', userInfo.nomUtilisateur);
    localStorage.setItem('prenomUtilisateur', userInfo.prenomUtilisateur);
    localStorage.setItem('adresse1Utilisateur', userInfo.adresse1Utilisateur);
    localStorage.setItem('adresse2Utilisateur', userInfo.adresse2Utilisateur);
    localStorage.setItem('adresse3Utilisateur', userInfo.adresse3Utilisateur);
    localStorage.setItem('cpUtilisateur', userInfo.cpUtilisateur);
    localStorage.setItem('villeUtilisateur', userInfo.villeUtilisateur);
    localStorage.setItem('telUtilisateur', userInfo.telUtilisateur);
    localStorage.setItem('emailUtilisateur', userInfo.emailUtilisateur);
  }
  public estConnecte() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  public deconnecter() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('nomUtilisateur');
    localStorage.removeItem('prenomUtilisateur');
  }
}
