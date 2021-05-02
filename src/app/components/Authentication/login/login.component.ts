import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAdmin } from 'src/models/interfaces/iadmin';
import { IUser } from 'src/models/interfaces/iuser';
import { LoginserviceService } from 'src/services/loginservice.service';
import { Emitter } from '../Emitters/emitter';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = ''
  password: string = ''
  message: string = ''
  user: IUser | any
  token: any
  //  logged_in:boolean|any=false
  constructor(private http: HttpClient, private router: Router, private loginserv: LoginserviceService) {

  }

  ngOnInit(): void {
  }


  login(): void {
    const formData = new FormData()
    formData.append('email', this.email)
    formData.append('password', this.password)

    this.http.post('http://127.0.0.1:8000/auth/login', formData, { withCredentials: true }).subscribe((res) => {
      const formDate2 = new FormData()
      this.token = res
      localStorage.setItem('jwt_token', this.token.jwt_token)
      formDate2.append('jwt_token', this.token.jwt_token)
      this.http.post('http://127.0.0.1:8000/auth/user', formDate2, { withCredentials: true }).subscribe((res) => {
        let data = <IUser>res //data contain user object
        localStorage.setItem("isLoggedIn", "true")

        if (data.role == 'student') {
          this.loginserv.get_student_user(data.id).subscribe(
            (res) => {
              this.loginserv.current_student = res
              localStorage.setItem('student_id', this.loginserv.current_student.id)
              localStorage.setItem('is_admin', 'false')
              this.router.navigate(['/student-profile', this.loginserv.current_student.id])
            },

          )
        }
        if (data.role == 'admin') {
          this.loginserv.get_admin_user(data.id).subscribe(
            (res) => {
              this.loginserv.current_admin = res
              console.log(res);
              localStorage.setItem('admin_id', this.loginserv.current_admin.id)
              localStorage.setItem('is_admin', 'true')
              console.log(localStorage.getItem('admin_id'))

              if (res.manager == null) {
                this.router.navigate(['/admin-home'])
              }
              else {

                this.router.navigate(['/admin-home'])
              }


            },
            err => {
              console.log(err);

            }
          )
        }
        if (data.role == 'teacher') {
          this.loginserv.get_teacher_user(data.id).subscribe((res) => {
            this.loginserv.current_teacher = res
            localStorage.setItem('teacher_id', this.loginserv.current_teacher.id)
            localStorage.setItem('is_admin', 'false')
            this.router.navigate(['/show-teacher', res.id])
          },
            err => console.log(err)
          )

        }

      },
        err => console.log(err));
    },
      (err) => {
        this.message = err.error.detail;
        console.log(this.message)
      }
    )
  }

  forget_password() {
    const formData = new FormData()
    formData.append('email', this.email)
    this.http.post('http://127.0.0.1:8000/auth/check-mail', formData, { withCredentials: true }).subscribe(
      (res) => {
        this.http.post('http://127.0.0.1:8000/auth/get-code', formData).subscribe(
          res => this.router.navigate(['/forget-password']),
          err => console.log(err)
        )
      },
      (err) => {
        console.log("error");

        this.message = err.error.detail



      }
    )
    console.log(this.email);

  }

}
