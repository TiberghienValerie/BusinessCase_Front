import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageUpdateComponent } from './garage-update.component';

describe('GarageUpdateComponent', () => {
  let component: GarageUpdateComponent;
  let fixture: ComponentFixture<GarageUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarageUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarageUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
