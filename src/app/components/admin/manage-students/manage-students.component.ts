import { Component, OnInit } from '@angular/core';
import { Imembership } from 'src/models/interfaces/imembership';
import { GroupService } from 'src/services/group.service';
import { StudentsService } from 'src/services/students.service';
import { TeachersService } from 'src/services/teachers.service';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent implements OnInit {
  memberships: any

  constructor(private _apiStudentService: StudentsService, private _apiTeacherService: TeachersService) {
  }

  ngOnInit(): void {
    this._apiStudentService.getAllMemberships().subscribe((data) => {
      this.memberships = data
      this.memberships.forEach((mem: any) => {
        this._apiTeacherService.getSpecificTeacher(mem.group.teacher).subscribe((res) => {
          mem.group.teacher = res.name
        })
      });
    }, (err) => console.log(err))

  }

  deleteStudent() {

  }

}
