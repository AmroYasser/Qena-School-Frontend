import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addteacher',
  templateUrl: './addteacher.component.html',
  styleUrls: ['./addteacher.component.css']
})
export class AddteacherComponent implements OnInit {
  phone:string
  name:string
  description:string
  image:File |undefined |any

  constructor(private _http:HttpClient,private _router:Router) { 
    this.phone=""
    this.name=""
    this.description=""
  }

  ngOnInit(): void {
  }

  onFileselected(event:any){
    this.image=event.target.files[0]

  }

  add_teacher(){
    const formData=new FormData()
    formData.append('name',this.name)
    formData.append('phone',this.phone)
    formData.append('description',this.description)
    formData.append('image',this.image,this.image.name)
    this._http.post('http://127.0.0.1:8000/teacher/',formData).subscribe(res=>this._router.navigate(['home']),
    err=>this._router.navigate(['home']))
  }

}
