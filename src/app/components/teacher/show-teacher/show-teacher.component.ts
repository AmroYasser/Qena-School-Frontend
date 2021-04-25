import { ICourse } from './../../../../models/interfaces/icourse';
import { Iteacher } from './../../../../models/interfaces/iteacher';
import { Component, OnInit } from '@angular/core';
import { TeachersService } from 'src/services/teachers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-teacher',
  templateUrl: './show-teacher.component.html',
  styleUrls: ['./show-teacher.component.css']
})
export class ShowTeacherComponent implements OnInit {
  teacher: Iteacher | undefined;
  id: number|any
  teacher_groups: ICourse[] = [];
  constructor(private _apiTeacherService: TeachersService, private activedRoute: ActivatedRoute,private router:Router) {
  }

  ngOnInit(): void {

    if(JSON.parse(<string>localStorage.getItem("isLoggedIn"))){
      console.log(localStorage.getItem('teacher_id'));
      
    this.id = this.activedRoute.snapshot.params["id"];
  if(this.id==localStorage.getItem('teacher_id')){
    console.log("yes");
    
    this._apiTeacherService.getSpecificTeacher(this.id).subscribe((res) => {
      this.teacher = res;
    }, (err) => {
      console.log(err);
    });
    this._apiTeacherService.get_groups_for_teacher(this.id).subscribe((res) => {
      this.teacher_groups = res;
    }, (err) => {
      console.log(err);
    });
  }
  else{
    console.log("else");
    
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      if(localStorage.getItem('teacher_id')!=null){
      this.router.navigate(['./'], { relativeTo: this.activedRoute });
      this.router.navigate(['/show-teacher',localStorage.getItem('teacher_id')])
    }
    else{
      this.router.navigate(['/home'])
    }
    
  }
}

else{
  this.router.navigate(['/login'])
}

}

}
