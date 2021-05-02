import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iteacher } from 'src/models/interfaces/iteacher';
import { TeachersService } from 'src/services/teachers.service';

@Component({
  selector: 'app-modifyteacherinfo',
  templateUrl: './modifyteacherinfo.component.html',
  styleUrls: ['./modifyteacherinfo.component.css']
})
export class ModifyteacherinfoComponent implements OnInit {

  id: number | any
  teacher: Iteacher
  name: string | undefined
  description: string | undefined
  phone: string | undefined
  image: File | any | string
  is_admin: boolean = false;
  constructor(private _teacherserv: TeachersService, private _activatedRoute: ActivatedRoute, private _router: Router, private _http: HttpClient) {
    this.teacher = { name: "", description: "", phone: "", image: undefined }
    this.image = null;
  }

  ngOnInit(): void {
    if (JSON.parse(<string>localStorage.getItem("isLoggedIn"))) {

      this.id = this._activatedRoute.snapshot.params['id']
      if (this.id == localStorage.getItem('teacher_id') || localStorage.getItem('is_admin') == 'true') {
        this._teacherserv.getSpecificTeacher(this.id).subscribe(res => this.teacher = res, err => console.log("error"))
      }
      else {
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });
        this._router.navigate(['/update-teacher', localStorage.getItem('teacher_id')])

      }

    }
    else {
      this._router.navigate(['/login'])
    }

  }
  OnImageChange(event: any) {
    this.image = event.target.files[0];
    this.teacher = { name: this.teacher.name, description: this.teacher.description, phone: this.teacher.phone, image: this.image }
  }
  save() {
    const formData = new FormData();
    formData.append("name", this.teacher.name);
    formData.append("description", this.teacher.description);
    formData.append("phone", this.teacher.phone);
    if (this.image != null) {
      formData.append("image", this.image);
    }
    this._http.patch(`http://127.0.0.1:8000/teacher/${this.id}/`, formData).subscribe((res) => this._router.navigateByUrl(`/show-teacher/${this.teacher.id}`), err => console.log(err))
  }
}
