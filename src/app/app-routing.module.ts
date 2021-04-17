import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/student/courses/courses.component';
import { CreateGroupComponent } from './components/teacher/create-group/create-group.component';
import { ReservationComponent } from './components/student/reservation/reservation.component';
import { StudentcourseComponent } from './components/student/studentcourse/studentcourse.component';
import { ShowTeacherComponent } from './components/teacher/show-teacher/show-teacher.component';
import { ShowGroupComponent } from './components/teacher/show-group/show-group.component';
import { ManageTeachersComponent } from './components/admin/manage-teachers/manage-teachers.component';

import { ManageGroupComponent } from './components/admin/groups/manage-group/manage-group.component';
import { ManageGroupsDataComponent } from './components/admin/manage-groups-data/manage-groups-data.component';
import { ShowgrouppostsComponent } from './components/student/showgroupposts/showgroupposts.component';
import { ModifyteacherinfoComponent } from './components/admin/admin-teacher/modifyteacherinfo/modifyteacherinfo.component';
import { AddteacherComponent } from './components/admin/admin-teacher/addteacher/addteacher.component';
import { CreateStudentComponent } from './components/student/create-student/create-student.component';

const routes: Routes = [
  { path: 'home', component: CoursesComponent },
  { path: 'create-group', component: CreateGroupComponent },
  { path: 'reserve', component: ReservationComponent },
  { path: 'student-course', component: StudentcourseComponent },
  { path: 'show-teacher/:id', component: ShowTeacherComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'tgroup/:id', component: ShowGroupComponent },
  { path: 'manage-teachers', component: ManageTeachersComponent },
  { path: 'manage-group/:id', component: ManageGroupComponent },
  { path: 'manage-groups-data', component: ManageGroupsDataComponent },
  { path: 'post-group/:id', component: ShowgrouppostsComponent },
  { path: 'update-teacher/:id', component: ModifyteacherinfoComponent },
  { path: 'add-teacher', component: AddteacherComponent },
  { path: 'add-student', component: CreateStudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
