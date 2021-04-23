import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/models/interfaces/iuser';
import { LoginserviceService } from 'src/services/loginservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = ''
  password: string = ''
  message: string = ''
  user: IUser
  //  logged_in:boolean|any=false
  constructor(private http: HttpClient, private router: Router, private loginserv: LoginserviceService) {
    this.user = { id: 1 }
  }

  ngOnInit(): void {
  }

  login(): void {
    const formData = new FormData()
    formData.append('email', this.email)
    formData.append('password', this.password)

    this.http.post('http://127.0.0.1:8000/auth/login', formData, { withCredentials: true }).subscribe((res) => {
      console.log(res);
      // document.cookie = res.toString();

      this.http.get('http://127.0.0.1:8000/auth/user', { withCredentials: true }).subscribe((res) => {
        console.log(res, "check")
      },
        err => console.log(err));
      ;

      this.router.navigate(['/home'])
    },
      (err) => {
        this.message = err.error.detail;
        console.log(this.message)
      }
    )

  }

}


