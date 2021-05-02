import { CoursesService } from './../../../../services/courses.service';
import { ICourse } from './../../../../models/interfaces/icourse';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/models/interfaces/iuser';

@Component({
  selector: 'app-manage-groups-data',
  templateUrl: './manage-groups-data.component.html',
  styleUrls: ['./manage-groups-data.component.css']
})
export class ManageGroupsDataComponent implements OnInit {
  groups: ICourse[] = [];

  constructor(private _apiGroupService: CoursesService, private _http: HttpClient, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (JSON.parse(<string>localStorage.getItem("isLoggedIn"))) {
      const formDate2 = new FormData();
      formDate2.append('jwt_token', <string>localStorage.getItem('jwt_token'))
      this._http.post('http://127.0.0.1:8000/auth/user', formDate2, { withCredentials: true }).subscribe((res) => {
        let data = <IUser>res
        if (data.role == "admin") {
          this._apiGroupService.getAllCourses().subscribe((res) => {
            this.groups = res
          },
            (err) => {
              console.log(err)
            }
          )
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

  delete_group(id: any) {
    this._http.delete(`http://127.0.0.1:8000/course-group/${id}/`).subscribe(res => this.reload(),
      err => console.log(err))

  }


}
