import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayGroupsComponent } from './today-groups.component';

describe('TodayGroupsComponent', () => {
  let component: TodayGroupsComponent;
  let fixture: ComponentFixture<TodayGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
