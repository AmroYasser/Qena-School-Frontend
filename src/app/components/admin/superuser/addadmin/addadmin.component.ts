import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {

  myForm: FormGroup

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
  constructor(private _http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      formName: ['', [Validators.required, Validators.minLength(3)]],
      formEmail: ['', [Validators.required, Validators.email]],
      formPassword: ['', [Validators.required]],
      formConfirmPassword: ['', [Validators.required]],
      formSSN: ['', [Validators.maxLength(14), Validators.minLength(14)]]
    }, {
      validator: this.ConfirmedValidator('formPassword', 'formConfirmPassword')
    });
  }

  ngOnInit(): void {
  }

  save() {
    const formData = new FormData()
    formData.append('email', this.myForm.value.formEmail)
    formData.append('name', this.myForm.value.formName)
    formData.append('ssn', this.myForm.value.formSSN)
    formData.append('manager', <string>localStorage.getItem('admin_id'))
    formData.append('password', this.myForm.value.formPassword)
    formData.append('password1', this.myForm.value.formConfirmPassword)
    this._http.post('http://127.0.0.1:8000/auth/register_admin', formData).subscribe((res) => {
      console.log(res)
      this.router.navigate(['/admin-home'])
    }, err => console.log(err)
    )
  }

}
