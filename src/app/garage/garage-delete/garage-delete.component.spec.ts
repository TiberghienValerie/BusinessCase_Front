import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageDeleteComponent } from './garage-delete.component';

describe('GarageDeleteComponent', () => {
  let component: GarageDeleteComponent;
  let fixture: ComponentFixture<GarageDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarageDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarageDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
