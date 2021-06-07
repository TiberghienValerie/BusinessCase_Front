import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { faTimes, faUser } from '@fortawesome/free-solid-svg-icons';

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

  public classActive: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  show() {
    this.classActive = true;
  }

  close() {
    this.classActive = false;
  }
}
