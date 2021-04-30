import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  group: any
  newCapacity: number | any
  showStatus: string = "binding"
  btnText = "اظهار الاشتراكات الجديدة"


  constructor(private _apiMembershipService: MembershipService, private _router: Router, private route: ActivatedRoute, private _http: HttpClient) {
  }

  ngOnInit(): void {
    // get-stated-memberships/binding
    this._http.get(`http://127.0.0.1:8000/membership`).subscribe((data) => {

      this.memberships = data
      console.log(data);

    }, (err) => console.log(err))

  }

  ngAfterViewInit() {
  }

  reload() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['./'], { relativeTo: this.route });
  }


  deleteMembership(_id: number) {
    this._apiMembershipService.getSpecificMembership(_id).subscribe((res) => {
      this.membership = res
      const formData2 = new FormData()
      this.newCapacity = <number>this.membership.group.capacity + 1
      formData2.append('capacity', this.newCapacity)
      this._http.patch(`http://127.0.0.1:8000/course-group/${this.membership.group.id}/`, formData2).subscribe(res => this.reload(),
        err => console.log(err))
      this._apiMembershipService.deleteMembership(_id).subscribe((res) => {
        this.reload()
      }, (err) => { console.log(err) })

    }, (err) => console.log(err))
  }

  changeStatus() {
    if (this.showStatus == "binding") {
      this.showStatus = "active";
      this.btnText = "اظهار الاشتراكات الجديدة"
    }
    else {
      this.showStatus = "binding";
      this.btnText = "اظهار الاشتراكات المفعلة"
    }
  }

  activate(_id: number) {
    this._apiMembershipService.getSpecificMembership(_id).subscribe((res) => {
      this.membership = res
      const formData = new FormData()
      formData.append('status', "active")
      this._http.patch(`http://127.0.0.1:8000/membership/${this.membership.id}/`, formData).subscribe(res => this.reload(),
        err => console.log(err))
      const formData2 = new FormData()
      this.newCapacity = <number>this.membership.group.capacity - 1
      formData2.append('capacity', this.newCapacity)
      this._http.patch(`http://127.0.0.1:8000/course-group/${this.membership.group.id}/`, formData2).subscribe(res => this.reload(),
        err => console.log(err))

      this._apiMembershipService.updateMembership(this.membership, _id).subscribe((res) => {

        //send mail after activation done
        const formData = new FormData()
        formData.append('email', this.membership.student.user.email)
        formData.append('name', this.membership.student.name)
        formData.append('course', this.membership.group.name)
        formData.append('teacher', this.membership.group.teacher.name)
        this._http.post('http://127.0.0.1:8000/auth/confirm-booking', formData).subscribe(res => console.log(res), err => console.log(err)
        )

        this.reload()
      })
    }, (err) => { console.log(err) })
  }

}
