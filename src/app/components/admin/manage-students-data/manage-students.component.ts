import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from 'src/models/interfaces/istudent';
import { StudentsService } from 'src/services/students.service';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsDataComponent implements OnInit {
<<<<<<< HEAD
  students:IStudent[]
  constructor(private _studentserv:StudentsService) { 
    this.students=[
      {name:"",level:"",phone:""},
=======
  students: IStudent[]

  constructor(private _studentserv: StudentsService, private _router: Router, private _activatedRoute: ActivatedRoute) {
    this.students = [
      { name: "", level: "", phone: "" },
>>>>>>> 12d79a4d018c322f3036cfbec03e6a3ecda78114
    ]
  }

  ngOnInit(): void {
    this._studentserv.getAllStudents().subscribe(res => this.students = res,
      err => console.log(err))

  }

  reload() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['./'], { relativeTo: this._activatedRoute });
  }

  deleteStudnet(_id: any) {
    this._studentserv.deleteSpecificStudent(_id).subscribe(res => this.reload(),
      err => console.log(err))
  }

}
