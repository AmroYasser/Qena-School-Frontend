import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyteacherinfoComponent } from './modifyteacherinfo.component';

describe('ModifyteacherinfoComponent', () => {
  let component: ModifyteacherinfoComponent;
  let fixture: ComponentFixture<ModifyteacherinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyteacherinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyteacherinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
