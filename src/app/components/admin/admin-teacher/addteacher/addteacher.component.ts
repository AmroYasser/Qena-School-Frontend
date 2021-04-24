import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iteacher } from 'src/models/interfaces/iteacher';

@Component({
  selector: 'app-addteacher',
  templateUrl: './addteacher.component.html',
  styleUrls: ['./addteacher.component.css']
})
export class AddteacherComponent implements OnInit {

  myForm: FormGroup
  image?: File | undefined | any

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
  constructor(private _http: HttpClient, private _router: Router, private fb: FormBuilder) {
    this.image = null
    this.myForm = this.fb.group({
      formName: ['', [Validators.required, Validators.minLength(3)]],
      formEmail: ['', [Validators.required, Validators.email]],
      formPassword: ['', [Validators.required]],
      formConfirmPassword: ['', [Validators.required]],
      formDescription: ['', [Validators.required]],
      formPhone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    }, {
      validator: this.ConfirmedValidator('formPassword', 'formConfirmPassword')
    });
  }

  ngOnInit(): void {
  }


  onFileselected(event: any) {
    this.image = event.target.files[0]
  }

  add_teacher() {

    const formData = new FormData();
    formData.append('name', this.myForm.value.formName)
    formData.append('description', this.myForm.value.formDescription)
    formData.append('phone', this.myForm.value.formPhone)
    formData.append('email', this.myForm.value.formEmail)
    formData.append('password', this.myForm.value.formPassword)
    formData.append('password1', this.myForm.value.formConfirmPassword)
    if (this.image != null) {
      formData.append('image', this.image)
    }
    this._http.post('http://127.0.0.1:8000/auth/teacher-signup', formData).subscribe(res => this._router.navigateByUrl('/manage-teachers'),
      err => console.log(err))
  }

}
