import { CoursesService } from './../../../../services/courses.service';
import { ICourse } from './../../../../models/interfaces/icourse';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-groups-data',
  templateUrl: './manage-groups-data.component.html',
  styleUrls: ['./manage-groups-data.component.css']
})
export class ManageGroupsDataComponent implements OnInit {
  groups: ICourse[] = [];

  constructor(private _apiGroupService: CoursesService,private _http:HttpClient,private _router:Router,private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this._apiGroupService.getAllCourses().subscribe((res) => {
      this.groups = res
    },
      (err) => {
        console.log(err)
      }
    )
  }

  reload() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['./'], { relativeTo: this._activatedRoute });
  }

  delete_group(id: any){
    this._http.delete(`http://127.0.0.1:8000/course-group/${id}/`).subscribe(res=>this.reload(),
    err=>console.log(err))

  }
 

}
