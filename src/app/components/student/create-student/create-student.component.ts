import { StudentsService } from './../../../../services/students.service';
import { IStudent } from './../../../../models/interfaces/istudent';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  student: IStudent;
  myForm: FormGroup;
  levels: string[] = [];
  image: File | undefined | any;

  constructor(private _apiStudentService: StudentsService, private _router: Router, private fb: FormBuilder) {
    this.levels = ['اول ابتدائي', 'ثاني ابتدائي', 'ثالث ابتدائي', 'رابع ابتدائي', 'خامس ابتدائي', 'سادس ابتدائي', 'اول اعدادي', 'ثاني اعدادي', 'ثالث اعدادي', 'اول ثانوي', 'ثاني ثانوي', 'ثالث ثانوي', 'اخري']
   
    this.student = {
      name: "", level: "", phone: "", image: undefined
    };
    this.myForm = this.fb.group({
      formName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      formLvl: ['', [Validators.required, Validators.minLength(5)]],
      formPhone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^(010|011|012|015)[0-9]{8}$')]],
      formImage: ['']
    });
  }

  ngOnInit(): void {
  }

  onFileselected(event: any) {
    this.image = event.target.files[0]
    console.log(this.student.image)
  }

  Add() {
    const formData = new FormData();
    // this.student.name = this.myForm.value.formName;
    // this.student.level = this.myForm.value.formLvl;
    // this.student.phone = this.myForm.value.formPhone;
    // this.student.image = this.image;
    formData.append('name', this.myForm.value.formName)
    formData.append('level', this.myForm.value.formLvl)
    formData.append('phone', this.myForm.value.formPhone)
    formData.append('image', this.image, this.image.name);
    this._apiStudentService.insertNewStudent(formData).subscribe((data) => {
      this._router.navigateByUrl('/home');
    }, (err) => {
      console.log(err);
    })
  }
}
