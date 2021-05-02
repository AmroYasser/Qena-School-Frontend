import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from 'src/models/interfaces/istudent';
import { IUser } from 'src/models/interfaces/iuser';
import { StudentsService } from 'src/services/students.service';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsDataComponent implements OnInit {
  students: IStudent[]

  constructor(private _studentserv: StudentsService, private _http: HttpClient, private _router: Router, private _activatedRoute: ActivatedRoute) {
    this.students = [
      { name: "", level: "", phone: "" },
    ]
  }

  ngOnInit(): void {
    if (JSON.parse(<string>localStorage.getItem("isLoggedIn"))) {
      const formDate2 = new FormData();
      formDate2.append('jwt_token', <string>localStorage.getItem('jwt_token'))
      this._http.post('http://127.0.0.1:8000/auth/user', formDate2, { withCredentials: true }).subscribe((res) => {
        let data = <IUser>res
        if (data.role == "admin") {
          this._studentserv.getAllStudents().subscribe(res => this.students = res,
            err => console.log(err))
        }
        else {
          this._router.navigate(['/login'])
        }
      }, (err) => { this._router.navigate(['/login']) })
    }
    else {
      this._router.navigate(['/login'])
    }




  }

  reload() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['./'], { relativeTo: this._activatedRoute });
  }

  deleteStudnet(_id: any) {
    this._studentserv.deleteSpecificStudent(_id).subscribe(res => this.reload(),
      err => console.log(err))
  }

}
