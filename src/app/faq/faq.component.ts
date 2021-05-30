import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FAQComponent implements OnInit {
  oneAtATime: boolean = true;
  isFirstOpen = true;

  constructor() {}

  ngOnInit(): void {}
}
