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

  id: number
  teacher: Iteacher
  name: string | undefined
  description: string | undefined
  phone: string | undefined
  image: File | any | string
  constructor(private _teacherserv: TeachersService, private _activatedRoute: ActivatedRoute, private _router: Router, private _http: HttpClient) {
    this.id = 0;
    this.teacher = { name: "", description: "", phone: "", image: undefined }
    this.image = null;
  }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params['id']
    this._teacherserv.getSpecificTeacher(this.id).subscribe(res => this.teacher = res, err => console.log("error"))


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
    if (this.image == null) {
      formData.append("image", this.image);
    }
    this._http.patch(`http://127.0.0.1:8000/teacher/${this.id}/`, formData).subscribe((res) => this._router.navigateByUrl(`/show-teacher/${this.teacher.id}`), err => console.log(err))
  }
}
