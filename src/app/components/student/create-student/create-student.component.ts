import { StudentsService } from './../../../../services/students.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {


  myForm: FormGroup;
  levels: string[] = [];
  image: File | undefined | any;

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  constructor(private _apiStudentService: StudentsService, private _router: Router, private fb: FormBuilder) {
    this.levels = ['اول ابتدائي', 'ثاني ابتدائي', 'ثالث ابتدائي', 'رابع ابتدائي', 'خامس ابتدائي', 'سادس ابتدائي', 'اول اعدادي', 'ثاني اعدادي', 'ثالث اعدادي', 'اول ثانوي', 'ثاني ثانوي', 'ثالث ثانوي', 'اخري']
    this.image = null;
    this.myForm = this.fb.group({
      formName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      formEmail: ['', [Validators.required, Validators.email]],
      formPassword: ['', [Validators.required]],
      formConfirmPassword: ['', [Validators.required]],
      formLvl: ['', [Validators.required, Validators.minLength(5)]],
      formPhone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^(010|011|012|015)[0-9]{8}$')]],
    }, {
      validator: this.ConfirmedValidator('formPassword', 'formConfirmPassword')
    });
  }


  ngOnInit(): void {
  }

  onFileselected(event: any) {
    this.image = event.target.files[0]
  }

  Add() {
    const formData = new FormData();
    const formData2 = new FormData();
    formData.append('name', this.myForm.value.formName)
    formData.append('level', this.myForm.value.formLvl)
    formData.append('phone', this.myForm.value.formPhone)
    formData2.append('email', this.myForm.value.formEmail)
    formData2.append('password', this.myForm.value.formPassword)
    if (this.image != null) {
      formData.append('image', this.image, this.image.name);
    }
    this._apiStudentService.insertNewStudent(formData).subscribe((data) => {
      this._router.navigateByUrl('/home');
    }, (err) => {
      console.log(err);
    })
  }
}
