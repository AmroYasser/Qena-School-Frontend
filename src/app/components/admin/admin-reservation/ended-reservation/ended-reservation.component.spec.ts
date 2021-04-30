import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndedReservationComponent } from './ended-reservation.component';

describe('EndedReservationComponent', () => {
  let component: EndedReservationComponent;
  let fixture: ComponentFixture<EndedReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndedReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndedReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
