import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageViewComponent } from './garage-view.component';

describe('GarageViewComponent', () => {
  let component: GarageViewComponent;
  let fixture: ComponentFixture<GarageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
