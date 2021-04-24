import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICourse } from 'src/models/interfaces/icourse';
import { CoursesService } from 'src/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: ICourse[] = []
  levels: string[] = []
  myForm: FormGroup;
  constructor(private _courses: CoursesService, private fb: FormBuilder, private _http: HttpClient) {
    this.levels = ['اول ابتدائي', 'ثاني ابتدائي', 'ثالث ابتدائي', 'رابع ابتدائي', 'خامس ابتدائي', 'سادس ابتدائي', 'اول اعدادي', 'ثاني اعدادي', 'ثالث اعدادي', 'اول ثانوي', 'ثاني ثانوي', 'ثالث ثانوي', 'اخري']
    this.myForm = this.fb.group({
      formName: [''],
      formLvl: ['']
    });
  }

  ngOnInit(): void {
    this._courses.getAllCourses().subscribe((res) => {
      this.courses = res
    },
      (err) => {
        console.log(err)
      }
    )
  }

  search() {
    const formData = new FormData();
    console.log(this.myForm.value.formName);
    console.log(this.myForm.value.formLvl);
    formData.append('name', this.myForm.value.formName)
    formData.append('level', this.myForm.value.formLvl)
    this._http.post("http://127.0.0.1:8000/search-groups", formData).subscribe((data) => {
      this.courses = <ICourse[]>data
    }, (err) => {
      console.log(err);
    })
  }


}
