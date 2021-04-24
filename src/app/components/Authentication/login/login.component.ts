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

 email:string=''
 password:string=''
 message:string=''
 user :IUser|any
//  logged_in:boolean|any=false
  constructor(private http:HttpClient, private router:Router,private loginserv:LoginserviceService) {
    
   }

  ngOnInit(): void {
  }


  login():void{
   const formData=new FormData()
   formData.append('email',this.email)
   formData.append('password',this.password)

   this.http.post('http://127.0.0.1:8000/auth/login',formData,{withCredentials:true}).subscribe((res)=>{
    this.http.get('http://127.0.0.1:8000/auth/user',{withCredentials:true}).subscribe((res)=>{
    let data=<IUser>res
    localStorage.setItem("isLoggedIn","true")
    
    if(data.role=='student'){
      this.loginserv.get_student_user(data.id).subscribe(
      (res)=>{
        this.loginserv.current_student=res
        localStorage.setItem('student_id',this.loginserv.current_student.id)
        this.router.navigate(['/student-profile',this.loginserv.current_student.id])

      },
        err=>console.log(err)
        
      )
    }
    if(data.role=='admin'){
      this.router.navigate(['/manage-teachers'])
    }
    if(data.role=='teacher'){
      this.router.navigate(['/show-teacher',1])
    }
  
  },
    err=>console.log(err));   
},
   (err)=>{
     this.message=err.error.detail;
     ;
    console.log(this.message)
    }
         )

  }
}