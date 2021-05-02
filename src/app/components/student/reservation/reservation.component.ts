import { ICourse } from 'src/models/interfaces/icourse';
import { Imembership } from './../../../../models/interfaces/imembership';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MembershipService } from 'src/services/membership.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  membership: Imembership | undefined | any;
  image: File | undefined | any;
  memberships: Imembership[] | any
  isNew: boolean = true
  constructor(private _router: Router, private route: ActivatedRoute, private _membershipService: MembershipService, private _http: HttpClient) {
    this.membership = {}
    this.image = null;
    this.memberships = []
  }

  ngOnInit(): void {
    if (!JSON.parse(<string>localStorage.getItem("isLoggedIn"))) {
      this._router.navigate(['/login'])
    }
  }

  onFileselected(event: any) {
    this.image = event.target.files[0]
  }

  Add() {
    const formData = new FormData();
    let gid = this.route.snapshot.params['id']
    this._http.get(`http://127.0.0.1:8000/group-memberships/${gid}`).subscribe((res) => {
      this.memberships = res
      this.isNew = false
      this.memberships.forEach((mem: any) => {
        if (mem.student.id == localStorage.getItem("student_id")) {
          formData.append('image', this.image, this.image.name);
          this._http.patch(`http://127.0.0.1:8000/membership/${mem.id}/`, formData).subscribe((res) => {
            this._router.navigateByUrl(`/student-profile/${localStorage.getItem('student_id')}`)
          }, (err) => console.log(err))
        }
      });
    }, (err) => console.log(err))

    if (this.isNew == true) {
      formData.append('group_pk', gid)
      formData.append('student_pk', <string>localStorage.getItem('student_id'))
      formData.append('status', 'binding')
      if (this.image != null) {
        formData.append('image', this.image, this.image.name);
      }
      this._membershipService.addNewMembership(formData).subscribe((res) => {
        this._router.navigateByUrl(`/student-profile/${localStorage.getItem('student_id')}`)
      }, (err) => {
        console.log(err);
      });
    }

  }
}
