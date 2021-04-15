import { Component, OnInit } from '@angular/core';
import { Iteacher } from 'src/models/interfaces/iteacher';
import { TeachersService } from 'src/services/teachers.service';

@Component({
  selector: 'app-manage-teachers',
  templateUrl: './manage-teachers.component.html',
  styleUrls: ['./manage-teachers.component.css']
})
export class ManageTeachersComponent implements OnInit {
  teachers: Iteacher[] = [];

  constructor(private _apiTeacherService: TeachersService) { }

  ngOnInit(): void {
    this._apiTeacherService.getAllTeachers().subscribe((res) => {
      this.teachers = res
      console.log(this.teachers)
    },
      (err) => {
        console.log(err)
      }
    )
  }

}
