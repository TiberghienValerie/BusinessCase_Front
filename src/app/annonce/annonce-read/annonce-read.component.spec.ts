import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceReadComponent } from './annonce-read.component';

describe('AnnonceReadComponent', () => {
  let component: AnnonceReadComponent;
  let fixture: ComponentFixture<AnnonceReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnonceReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
