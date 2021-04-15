import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGroupsDataComponent } from './manage-groups-data.component';

describe('ManageGroupsDataComponent', () => {
  let component: ManageGroupsDataComponent;
  let fixture: ComponentFixture<ManageGroupsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGroupsDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGroupsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
