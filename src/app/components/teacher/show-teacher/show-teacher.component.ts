import { Iteacher } from './../../../../models/interfaces/iteacher';
import { Component, OnInit } from '@angular/core';
import { TeachersService } from 'src/services/teachers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-teacher',
  templateUrl: './show-teacher.component.html',
  styleUrls: ['./show-teacher.component.css']
})
export class ShowTeacherComponent implements OnInit {
  teacher: Iteacher | undefined;
  constructor(private _apiTeacherService: TeachersService, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.activedRoute.snapshot.params["id"];
    this._apiTeacherService.getSpecificTeacher(id).subscribe((res) => {
      this.teacher = res;
    }, (err) => {
      console.log(err);
    });
  }

}
