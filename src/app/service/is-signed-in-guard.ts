import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IsSignedInGuard implements CanActivate {
  public estConnecte: boolean = false;
  public localStorage!: Storage;

  constructor(private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.hasOwnProperty('ACCESS_TOKEN')) this.estConnecte = true;
    else this.estConnecte = false;
    if (this.estConnecte === true) return true;
    else {
      this._router.navigate(['accueil']);
      return false;
    }
  }
}
