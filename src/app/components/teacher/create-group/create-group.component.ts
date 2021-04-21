import { TeachersService } from './../../../../services/teachers.service';
import { Iteacher } from './../../../../models/interfaces/iteacher';
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
  myForm: FormGroup;
  teachers: Iteacher[] = [];
  levels: string[] = [];
  constructor(private _apiCourseService: CoursesService, private _apiTeacherService: TeachersService, private _router: Router, private fb: FormBuilder) {
    this.levels = ['اول ابتدائي', 'ثاني ابتدائي', 'ثالث ابتدائي', 'رابع ابتدائي', 'خامس ابتدائي', 'سادس ابتدائي', 'اول اعدادي', 'ثاني اعدادي', 'ثالث اعدادي', 'اول ثانوي', 'ثاني ثانوي', 'ثالث ثانوي', 'اخري']
    this.group = {
      name: "", level: "", session_num: 0, start_date: new Date(), schedule: "", teacher: null, teacher_pk: NaN
    };
    this.myForm = this.fb.group({
      formName: ['', [Validators.required, Validators.minLength(3)]],
      formLvl: ['', [Validators.required, Validators.minLength(5)]],
      formSessionNum: ['', [Validators.required, Validators.min(1), Validators.max(8)]],
      formStartDate: ['', Validators.required],
      formSchedule: ['', [Validators.required, Validators.maxLength(50)]],
      formTeacher: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this._apiTeacherService.getAllTeachers().subscribe((res) => {
      this.teachers = res
      console.log(this.teachers)
    },
      (err) => {
        console.log(err)
      }
    )
  }

  Add() {
    this.group.name = this.myForm.value.formName;
    this.group.level = this.myForm.value.formLvl;
    this.group.session_num = this.myForm.value.formSessionNum;
    this.group.start_date = this.myForm.value.formStartDate;
    this.group.schedule = this.myForm.value.formSchedule;
    this.group.teacher_pk = Number(this.myForm.value.formTeacher);
    console.log(this.group)
    this._apiCourseService.insertNewCourse(this.group).subscribe((data) => {
      this._router.navigateByUrl('/courses');
    }, (err) => {
      console.log(err);
    })
  }

}
