import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRechercheComponent } from './form-recherche.component';

describe('FormRechercheComponent', () => {
  let component: FormRechercheComponent;
  let fixture: ComponentFixture<FormRechercheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRechercheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
