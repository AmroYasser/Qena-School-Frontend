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

  constructor(private _http: HttpClient, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      formName: ['', [Validators.required, Validators.minLength(3)]],
      formEmail: ['', [Validators.required, Validators.email]],
      formPassword: ['', [Validators.required]],
      formConfirmPassword: ['', [Validators.required]],
      formSSN: ['', Validators.maxLength(14), Validators.minLength(14)]
    })
  }

  ngOnInit(): void {
  }

  save() {
    const formData = new FormData()
    formData.append('email', this.myForm.value.formEmail)
    formData.append('name', this.myForm.value.formName)
    formData.append('ssn', this.myForm.value.formSSN)
    formData.append('password', this.myForm.value.password)
    formData.append('password1', this.myForm.value.password1)
    this._http.post('http://127.0.0.1:8000/auth/register_admin', formData).subscribe((res) => {
      console.log(res)
    }, err => console.log(err)
    )
  }

}
