import { Component, OnInit } from '@angular/core';
import { IStudent } from 'src/models/interfaces/istudent';
import { StudentsService } from 'src/services/students.service';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsDataComponent implements OnInit {
  students: IStudent[]
  constructor(private _studentserv: StudentsService) {
    this.students = [
      { name: "", level: "", phone: "" },
    ]
  }

  ngOnInit(): void {
    this._studentserv.getAllStudents().subscribe(res => this.students = res,
      err => console.log(err))
  }

}
