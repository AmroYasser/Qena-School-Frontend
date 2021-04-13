import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICourse } from 'src/models/interfaces/icourse';
import { CoursesService } from 'src/services/courses.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  group: ICourse;
  myForm: FormGroup | undefined;
  constructor(private _apiCourseService: CoursesService, private _router: Router, private fb: FormBuilder) {
    this.group = {
      name: "", level: "", session_num: 0, start_date: new Date(), schedule: "", teacher: null
    };
    this.myForm = this.fb.group({
      formName: ['', [Validators.required, Validators.minLength(3)]],
      formLvl: ['', [Validators.required, Validators.minLength(5)]],
      formSessionNum: ['', [Validators.required, Validators.min(0), Validators.max(8)]],
      formPrice: ['', [Validators.required, Validators.min(1)]],
      formStartDate: ['', Validators.required],
      formSchedule: ['', [Validators.required, Validators.maxLength(50)]],
      formTeacher: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

}
