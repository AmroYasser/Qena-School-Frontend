import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/models/interfaces/icourse';
import { CoursesService } from 'src/services/courses.service';

@Component({
  selector: 'app-ended-reservation',
  templateUrl: './ended-reservation.component.html',
  styleUrls: ['./ended-reservation.component.css']
})
export class EndedReservationComponent implements OnInit {
  groups: ICourse[]

  constructor(private _courseServ: CoursesService, private _http: HttpClient) {
    this.groups = []
  }

  ngOnInit(): void {
    this._courseServ.getAllCourses().subscribe((res) => {
      this.groups = res
    }, (err) => { console.log(err) })
  }

  deleteGroup(_id: any) {
    this._http.delete(`http://127.0.0.1:8000/course-group/${_id}/`).subscribe((res) => {
      location.reload()
    })
  }

  renew(_id: any) {
    const formData = new FormData()
    formData.append('session_num', "8")
    this._http.patch(`http://127.0.0.1:8000/course-group/${_id}/`, formData).subscribe((res) => {
      location.reload()
    }, (err) => console.log(err))
  }

}
