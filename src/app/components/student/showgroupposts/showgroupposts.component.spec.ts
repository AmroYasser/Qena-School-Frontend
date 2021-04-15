import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowgrouppostsComponent } from './showgroupposts.component';

describe('ShowgrouppostsComponent', () => {
  let component: ShowgrouppostsComponent;
  let fixture: ComponentFixture<ShowgrouppostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowgrouppostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowgrouppostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
