import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from 'src/models/interfaces/istudent';
import { StudentsService } from 'src/services/students.service';

@Component({
  selector: 'app-modifyinfo',
  templateUrl: './modifyinfo.component.html',
  styleUrls: ['./modifyinfo.component.css']
})
export class ModifyinfoComponent implements OnInit {
  student: IStudent
  id: number
  levels: string[]
  image: File | undefined | any
  constructor(private _studentserv: StudentsService, private _route: ActivatedRoute, private _http: HttpClient, private _router: Router) {
    this.student = { name: "", level: "", phone: "" };
    this.id = 0;
    this.image = null;
    this.levels = ['اول ابتدائي', 'ثاني ابتدائي', 'ثالث ابتدائي', 'رابع ابتدائي', 'خامس ابتدائي', 'سادس ابتدائي', 'اول اعدادي', 'ثاني اعدادي', 'ثالث اعدادي', 'اول ثانوي', 'ثاني ثانوي', 'ثالث ثانوي', 'اخري']
  }

  ngOnInit(): void {
    this.id = this._route.snapshot.params.id
    this._studentserv.getSpecificStudent(this.id).subscribe(res => this.student = res, err => console.log(err))

  }
  onFileselected(event: any) {
    this.image = event.target.files[0];

  }

  reload() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['./'], { relativeTo: this._route });
  }

  save() {
    console.log(this.student);

    let formData = new FormData()
    formData.append('name', this.student.name)
    formData.append('level', this.student.level)
    formData.append('phone', this.student.phone)
    if (this.image != null) {
      formData.append("image", this.image);
    }
    this._http.patch(`http://127.0.0.1:8000/student/${this.id}/`, formData).subscribe(res => this.reload(),
      err => console.log(err))
  }

}
