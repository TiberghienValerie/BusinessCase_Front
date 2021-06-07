import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css'],
})
export class FicheComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public slides = [
    {
      image: 'assets/img/1/audi-rs3-25-tfsi-121974821.jpg',
      text: 'First',
    },
    {
      image: 'assets/img/1/audi-rs3-25-tfsi-121974822.jpg',
      text: 'First',
    },
    {
      image: 'assets/img/1/audi-rs3-25-tfsi-121974823.jpg',
      text: 'First',
    },
    {
      image: 'assets/img/1/audi-rs3-25-tfsi-121974824.jpg',
      text: 'First',
    },
    {
      image: 'assets/img/1/audi-rs3-25-tfsi-121974825.jpg',
      text: 'First',
    },
  ];
}
