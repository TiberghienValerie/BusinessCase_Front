import { Component, Input, OnInit } from '@angular/core';
import { Annonce } from '../models/annonce';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css'],
})
export class AnnonceComponent implements OnInit {
  @Input() public uneAnnonce!: Annonce;

  constructor() {}

  ngOnInit(): void {}
}
