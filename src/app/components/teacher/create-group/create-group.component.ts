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
  isTeacher: boolean = (localStorage.getItem('teacher_id') != null)
  constructor(private _apiCourseService: CoursesService, private _apiTeacherService: TeachersService, private _router: Router, private fb: FormBuilder) {
    this.levels = ['اول ابتدائي', 'ثاني ابتدائي', 'ثالث ابتدائي', 'رابع ابتدائي', 'خامس ابتدائي', 'سادس ابتدائي', 'اول اعدادي', 'ثاني اعدادي', 'ثالث اعدادي', 'اول ثانوي', 'ثاني ثانوي', 'ثالث ثانوي', 'اخري']
    this.group = {
      name: "", level: "", session_num: 0, price: 0, capacity: 0, start_date: new Date(), next_session_date: '2019-09-25 06:00', schedule: "", teacher: null, teacher_pk: NaN
    };
    this.myForm = this.fb.group({
      formName: ['', [Validators.required, Validators.minLength(3)]],
      formLvl: ['', [Validators.required, Validators.minLength(5)]],
      formSessionNum: ['', [Validators.required, Validators.min(1), Validators.max(8)]],
      formPrice: ['', [Validators.required, Validators.min(1)]],
      formCapacity: ['', [Validators.required, Validators.min(1)]],
      formStartDate: ['', Validators.required],
      formNextSessionDate: ['', Validators.required],
      formSchedule: ['', [Validators.required, Validators.maxLength(50)]],
      formTeacher: [''],
    })
  }

  ngOnInit(): void {
    console.log("is teacher : " + this.isTeacher);
    if (!this.isTeacher) {
      this._apiTeacherService.getAllTeachers().subscribe((res) => {
        this.teachers = res
        console.log(this.teachers)
      },
        (err) => {
          console.log(err)
        }
      )
    }
  }

  Add() {
    this.group.name = this.myForm.value.formName;
    this.group.level = this.myForm.value.formLvl;
    this.group.session_num = this.myForm.value.formSessionNum;
    this.group.price = this.myForm.value.formPrice;
    this.group.capacity = this.myForm.value.formCapacity;
    this.group.start_date = this.myForm.value.formStartDate;
    this.group.next_session_date = this.myForm.value.formNextSessionDate;
    this.group.schedule = this.myForm.value.formSchedule;
    if (!this.isTeacher) {
      this.group.teacher_pk = Number(this.myForm.value.formTeacher);
    } else {
      this.group.teacher_pk = Number(localStorage.getItem('teacher_id'))
    }
    console.log(this.group)
    this._apiCourseService.insertNewCourse(this.group).subscribe((data) => {
      this.group = data;
      this._router.navigateByUrl(`/tgroup/${this.group.id}`);
    }, (err) => {
      console.log(err);
    })
  }

}
