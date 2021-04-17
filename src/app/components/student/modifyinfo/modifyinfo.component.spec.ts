import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyinfoComponent } from './modifyinfo.component';

describe('ModifyinfoComponent', () => {
  let component: ModifyinfoComponent;
  let fixture: ComponentFixture<ModifyinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
