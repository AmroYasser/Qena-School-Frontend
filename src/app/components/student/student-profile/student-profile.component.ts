import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from 'src/models/interfaces/istudent';
import { StudentsService } from 'src/services/students.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  memberships: any
  student: any
  student_id: number

  constructor(private _apiStudentService: StudentsService, route: ActivatedRoute) {
    this.student_id = route.snapshot.params.id
  }

  ngOnInit(): void {
    console.log(this.student_id)
    this._apiStudentService.getStudentMembership(this.student_id).subscribe((data) => {
      this.memberships = data
    }, (err) => console.log(err))
    this._apiStudentService.getSpecificStudent(this.student_id).subscribe((data) => {
      this.student = data
    }, err => console.log(err))

    console.log(this.student)
  }

}
