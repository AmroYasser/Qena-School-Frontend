import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Imembership } from 'src/models/interfaces/imembership';
import { GroupService } from 'src/services/group.service';
import { MembershipService } from 'src/services/membership.service';
import { StudentsService } from 'src/services/students.service';
import { TeachersService } from 'src/services/teachers.service';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent implements OnInit {
  memberships: any
  membership: any

  constructor(private _apiMembershipService: MembershipService, private _router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._apiMembershipService.getAllMemberships().subscribe((data) => {
      this.memberships = data
    }, (err) => console.log(err))

  }

  reload() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['./'], { relativeTo: this.route });
  }


  deleteMembership(_id: number) {
    this._apiMembershipService.deleteMembership(_id).subscribe((res) => {
      this.reload()
    }, (err) => { console.log(err) })
  }

  activate(_id: number) {
    this._apiMembershipService.getSpecificMembership(_id).subscribe((res) => {
      this.membership = res
      this.membership.status = 'active'
      this.membership.student_pk = this.membership.student.id
      this.membership.group_pk = this.membership.group.id
      this._apiMembershipService.updateMembership(this.membership, _id).subscribe((res) => {
        this.reload()
      })
    }, (err) => { console.log(err) })
  }

}
