import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
   password1:string|any
   password2:string|any
   message:string|any
  constructor(private  http:HttpClient) { }

  ngOnInit(): void {
  }

  reset_password(){
    const formData=new FormData()
    formData.append('password1',this.password1)
    formData.append('password2',this.password2)
    this.http.put('http://127.0.0.1:8000/auth/reset-password',formData).subscribe(
      (res)=>console.log(res),
      err=>this.message=err.error.detail
      
    )

  }

}
