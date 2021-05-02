import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginserviceService } from 'src/services/loginservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  is_loggedIn: boolean = false
  loggedName: string | any
  // valid_to: boolean | any

  constructor(public _loginserv: LoginserviceService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    // this.is_loggedIn = JSON.parse(<string>localStorage.getItem("isLoggedIn"))

    // else if (localStorage.getItem('teacher_id') != null) {
    //   this.valid_to = false
    // }
    // else {
    //   this.valid_to = true
    // }
  }
  logout(): void {
    this.http.post('http://127.0.0.1:8000/auth/logout', { withCredentials: true }).subscribe(
      () => {
        localStorage.setItem("isLoggedIn", "false")
        this.is_loggedIn = JSON.parse(<string>localStorage.getItem("isLoggedIn"))
        localStorage.removeItem('student_id')
        localStorage.removeItem('admin_id')
        localStorage.removeItem('teacher_id')
        localStorage.removeItem('jwt_token')
        localStorage.removeItem("is_admin")
        this.router.navigate(['/login'])
      },
      err => console.log(true)
    )
  }

  login_status(): boolean {
    return JSON.parse(<string>localStorage.getItem("isLoggedIn"))
  }

  routeTo() {
    if (localStorage.getItem('teacher_id') != null) {
      this.router.navigate([`/show-teacher/${localStorage.getItem('teacher_id')}`])
    }
    else if (localStorage.getItem('student_id') != null) {
      this.router.navigate([`/student-profile/${localStorage.getItem('student_id')}`])
    }
    else if (localStorage.getItem('admin_id') != null) {
      this.router.navigate([`/admin-home`])
    }
    else {
      this.router.navigate([`/home`])
    }

  }


}
