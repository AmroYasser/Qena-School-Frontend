import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from 'src/models/interfaces/istudent';
import { LoginserviceService } from 'src/services/loginservice.service';
import { MembershipService } from 'src/services/membership.service';
import { StudentsService } from 'src/services/students.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  memberships: any
  student: any = {}
  student_id: number|any

  constructor(private _apiStudentService: StudentsService, private _apiMembershipService: MembershipService, route: ActivatedRoute,
    private router:Router) {
    
    if(JSON.parse(<string>localStorage.getItem("isLoggedIn"))){
        this.student_id = route.snapshot.params.id
    }
    else{
      router.navigate(['/home'])
    }
    
  }

  ngOnInit(): void {
    if(this.student_id==localStorage.getItem('student_id')){
    this._apiMembershipService.getStudentMembership(this.student_id).subscribe((data) => {
      this.memberships = data
    }, (err) => console.log(err))
    this._apiStudentService.getSpecificStudent(this.student_id).subscribe((data) => {
      this.student = data
    }, err => console.log(err))
  }
  else{
    this.router.navigate(['./'])
  }

  }
  
}
