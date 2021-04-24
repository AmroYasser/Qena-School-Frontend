import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginserviceService } from 'src/services/loginservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  is_loggedIn:boolean=false
  constructor(public _loginserv:LoginserviceService,private http:HttpClient,private router:Router) { 
  }

  ngOnInit(): void {
   this.is_loggedIn=JSON.parse(<string>localStorage.getItem("isLoggedIn"))
   
  }
  logout():void{
    this.http.post('http://127.0.0.1:8000/auth/logout',{withCredentials:true}).subscribe(
      ()=>{
        localStorage.setItem("isLoggedIn","false")
        this.is_loggedIn=JSON.parse(<string>localStorage.getItem("isLoggedIn"))
      this.router.navigate(['/login'])
      },
    err=>console.log(true)
    )
  }

  login_status():boolean{
    return JSON.parse(<string>localStorage.getItem("isLoggedIn"))
  }

}
