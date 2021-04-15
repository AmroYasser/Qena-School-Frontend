import { CoursesService } from './../../../../services/courses.service';
import { ICourse } from './../../../../models/interfaces/icourse';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-groups-data',
  templateUrl: './manage-groups-data.component.html',
  styleUrls: ['./manage-groups-data.component.css']
})
export class ManageGroupsDataComponent implements OnInit {
  groups: ICourse[] = [];

  constructor(private _apiGroupService: CoursesService) { }

  ngOnInit(): void {
    this._apiGroupService.getAllCourses().subscribe((res) => {
      this.groups = res
    },
      (err) => {
        console.log(err)
      }
    )
  }

}
