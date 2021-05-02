import { IUser } from './../../../../models/interfaces/iuser';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/services/loginservice.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  id: number | any
  is_super: boolean = false
  constructor(private loginserv: LoginserviceService, private router: Router, private _http: HttpClient) {

  }

  ngOnInit(): void {

    if (JSON.parse(<string>localStorage.getItem("isLoggedIn"))) {
      const formDate2 = new FormData()
      formDate2.append('jwt_token', <string>localStorage.getItem('jwt_token'))
      this._http.post('http://127.0.0.1:8000/auth/user', formDate2, { withCredentials: true }).subscribe((res) => {
        let user = <IUser>res
        this.id = user.id
        this.loginserv.get_admin_user(this.id).subscribe(
          (res) => {
            if (res.manager == null) {
              this.is_super = true
            }

            else {
              this.is_super = false
            }

          },
          (err) => {
            this.router.navigate(['./'])

          }
        )
      }, (err) => {
        console.log(err)
      })

    }

    else {
      this.router.navigate(['/login'])
    }

  }


}
