import { ICourse } from 'src/models/interfaces/icourse';
import { Imembership } from './../../../../models/interfaces/imembership';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MembershipService } from 'src/services/membership.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  membership: Imembership | undefined | any;
  image: File | undefined | any;
  constructor(private _router: Router, private route: ActivatedRoute, private _membershipService: MembershipService) {
    this.membership = {}
    this.image = null;
  }

  ngOnInit(): void {
  }

  onFileselected(event: any) {
    this.image = event.target.files[0]
  }

  Add() {
    const formData = new FormData();
    formData.append('group_pk', this.route.snapshot.params['id'])
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
