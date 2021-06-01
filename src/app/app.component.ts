import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  Event as NavigationEvent,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'BC';
  event$;
  public classAccueil: string = 'active';
  public classContact: string = '';
  public classApropos: string = '';

  constructor(private router: Router) {
    this.event$ = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/accueil' || event.url === '/') {
          this.classAccueil = 'active';
          this.classContact = '';
          this.classApropos = '';
        } else if (event.url === '/contact') {
          this.classAccueil = '';
          this.classContact = 'active';
          this.classApropos = '';
        } else if (event.url === '/apropos') {
          this.classAccueil = '';
          this.classContact = '';
          this.classApropos = 'active';
        } else {
          this.classAccueil = '';
          this.classContact = '';
          this.classApropos = '';
        }
      }
    });
  }
}
