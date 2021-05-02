import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  seeCourses: boolean = true
  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('is_admin') == 'true' || localStorage.getItem("teacher_id") != null) {
      this.seeCourses = false
      console.log(this.seeCourses)
    } else {
      this.seeCourses = true
      console.log(this.seeCourses)
    }
  }

}
