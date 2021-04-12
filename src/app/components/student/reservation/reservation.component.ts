import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  got_to_student_course(){
    this._router.navigate(['student-course'])
  }

}
