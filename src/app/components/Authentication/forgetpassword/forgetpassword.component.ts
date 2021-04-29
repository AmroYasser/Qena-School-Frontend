import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/models/interfaces/iuser';
import { LoginserviceService } from 'src/services/loginservice.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  code:any|string
  message:string |any=''
  constructor(private _logserv:LoginserviceService,private router:Router,private http :HttpClient) { }

  ngOnInit(): void {
    

  }
  send(){
    const formData=new FormData()
    formData.append('code',this.code)
    this.http.post('http://127.0.0.1:8000/auth/check-code',formData).subscribe(
      (res)=>{
        this.router.navigate(['/reset-password'])
        
      },
      (err)=>{
        this.message=err.error.detail
      }
    )
  }

}
