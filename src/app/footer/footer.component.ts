import { Component, OnInit } from '@angular/core';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  faLinkedin = faLinkedin;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faCopyright = faCopyright;
  constructor() {}

  ngOnInit(): void {}
}
