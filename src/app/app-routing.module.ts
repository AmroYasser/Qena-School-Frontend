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
import { StudentProfileComponent } from './components/student/student-profile/student-profile.component';
import { ManageStudentsComponent } from './components/admin/manage-students/manage-students.component';
import { ManageStudentsDataComponent } from './components/admin/manage-students-data/manage-students.component';
import { ModifyinfoComponent } from './components/student/modifyinfo/modifyinfo.component';
import { HomePageComponent } from './components/main-layout/home-page/home-page.component';
import { LoginComponent } from './components/Authentication/login/login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { ManageadminComponent } from './components/admin/superuser/manageadmin/manageadmin.component';
import { AddadminComponent } from './components/admin/superuser/addadmin/addadmin.component';
import { ForgetpasswordComponent } from './components/Authentication/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/Authentication/resetpassword/resetpassword.component';
import { TodayGroupsComponent } from './components/admin/admin-reservation/today-groups/today-groups.component';
import { EndedReservationComponent } from './components/admin/admin-reservation/ended-reservation/ended-reservation.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'create-group', component: CreateGroupComponent },
  { path: 'reserve/:id', component: ReservationComponent },
  { path: 'student-course', component: StudentcourseComponent },
  { path: 'show-teacher/:id', component: ShowTeacherComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'tgroup/:id', component: ShowGroupComponent },
  { path: 'manage-teachers', component: ManageTeachersComponent },
  { path: 'manage-group/:id', component: ManageGroupComponent },
  { path: 'manage-groups-data', component: ManageGroupsDataComponent },
  { path: 'manage-student', component: ManageStudentsComponent },
  { path: 'post-group/:id', component: ShowgrouppostsComponent },
  { path: 'update-teacher/:id', component: ModifyteacherinfoComponent },
  { path: 'add-teacher', component: AddteacherComponent },
  { path: 'add-student', component: CreateStudentComponent },
  { path: 'student-profile/:id', component: StudentProfileComponent },
  { path: 'manage-students', component: ManageStudentsDataComponent },
  { path: 'update-student/:id', component: ModifyinfoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'manage-admin', component: ManageadminComponent },
  { path: 'add-admin', component: AddadminComponent },
  { path: 'forget-password', component: ForgetpasswordComponent },
  { path: 'reset-password', component: ResetpasswordComponent },
  { path: 'today-groups', component: TodayGroupsComponent },
  { path: 'ended-groups', component: EndedReservationComponent },



  { path: '**', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
