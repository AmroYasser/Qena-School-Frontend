import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/models/interfaces/icourse';
import { CoursesService } from 'src/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: ICourse[] = []

  constructor(private _courses: CoursesService) { }

  ngOnInit(): void {
    this._courses.getAllCourses().subscribe((res) => {
      this.courses = res
    },
      (err) => {
        console.log(err)
      })
  }



}