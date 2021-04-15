import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iteacher } from 'src/models/interfaces/iteacher';
import { TeachersService } from 'src/services/teachers.service';

@Component({
  selector: 'app-modifyteacherinfo',
  templateUrl: './modifyteacherinfo.component.html',
  styleUrls: ['./modifyteacherinfo.component.css']
})
export class ModifyteacherinfoComponent implements OnInit {

  id:number 
   teacher:Iteacher 
   name:string | undefined
   description:string | undefined
   phone:string | undefined
   image:File | any | string
  constructor(private _teacherserv :TeachersService,private _activatedRoute:ActivatedRoute) {
    this.id=0;
    this.teacher={name:"",description:"",phone:"",image:undefined}
 } 
   ngOnInit(): void {
    this.id= this._activatedRoute.snapshot.params['id']
    this._teacherserv.getSpecificTeacher(this.id).subscribe(res=>this.teacher=res,err=>console.log("error"))


  }

 OnImageChange(event:any){
  this.image=event.target.files[0];
  this.teacher={name:this.teacher.name,description:this.teacher.description,phone:this.teacher.phone,image:this.image}
}

  save(){
    // const formData = new FormData();
    // formData.append("name", this.teacher.name);
    // formData.append("description", this.teacher.description);
    // formData.append("phone", this.teacher.phone);
    // formData.append("image", this.image);
    // console.log("hellllllllo")
    // console.log(this.teacher,"mmmmmmmmmm")
    console.log(this.teacher)
        this._teacherserv.updateTeacher(this.teacher,this.id).subscribe(res=>console.log(res),err=>console.log(err))
      } 

}
