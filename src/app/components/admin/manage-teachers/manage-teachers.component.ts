import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iteacher } from 'src/models/interfaces/iteacher';
import { LoginserviceService } from 'src/services/loginservice.service';
import { TeachersService } from 'src/services/teachers.service';

@Component({
  selector: 'app-manage-teachers',
  templateUrl: './manage-teachers.component.html',
  styleUrls: ['./manage-teachers.component.css']
})
export class ManageTeachersComponent implements OnInit {
  teachers: Iteacher[] = [];

  constructor(private _apiTeacherService: TeachersService, private _http: HttpClient, private _router: Router, private route: ActivatedRoute,
    private _logserv:LoginserviceService) {
  }

  ngOnInit(): void {
    if(JSON.parse(<string>localStorage.getItem('isLoggedIn'))){
    this._apiTeacherService.getAllTeachers().subscribe((res) => {
      this.teachers = res
    },
      (err) => {
        console.log(err)
      }
    )
    }
    else{
      this._router.navigate(['./'])

    }
  }

  reload() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['./'], { relativeTo: this.route });
  }

  deleteTeacher(_id: any) {
    if(localStorage.getItem('isLoggedIn')){
    this._http.delete(`http://127.0.0.1:8000/teacher/${_id}/`).subscribe(res => this.reload(),
      err => console.log(err))
    }

  }

}
