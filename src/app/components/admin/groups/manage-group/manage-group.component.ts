import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from 'src/models/interfaces/icourse';
import { CoursesService } from 'src/services/courses.service';
import { GroupService } from 'src/services/group.service';

@Component({
  selector: 'app-manage-group',
  templateUrl: './manage-group.component.html',
  styleUrls: ['./manage-group.component.css']
})
export class ManageGroupComponent implements OnInit {

  myForm: FormGroup
  group_id: number
  group: ICourse


  constructor(private _apiGroup: GroupService, route: ActivatedRoute, private fb: FormBuilder, private _apiCoursesService: CoursesService, private _router: Router) {
    this.group = {
      name: "", level: "", session_num: 0, start_date: new Date(), schedule: "", teacher: null, teacher_pk: NaN
    };
    this.group_id = route.snapshot.params.id
    this.myForm = this.fb.group({
      formSessionNum: ['', [Validators.required, Validators.min(1), Validators.max(8)]],
      formSchedule: ['', [Validators.required, Validators.maxLength(50)]],
    })

  }

  ngOnInit(): void {
    this._apiGroup.getGroup(this.group_id).subscribe((data) => {
      this.group = data
      this.myForm.setValue({ formSessionNum: this.group.session_num, formSchedule: this.group.schedule })
    },
      (err) => console.log(err))
  }

  updateGroup() {
    this.group.session_num = this.myForm.value.formSessionNum;
    this.group.schedule = this.myForm.value.formSchedule;
    this.group.teacher_pk = this.group.teacher.id

    this._apiCoursesService.updateCourse(this.group_id, this.group).subscribe((res) => {
      this._router.navigateByUrl(`/tgroup/${this.group_id}`);
    },
      (err) => console.log(err))
  }



}
