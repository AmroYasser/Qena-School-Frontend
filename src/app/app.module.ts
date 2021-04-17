import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/main-layout/navbar/navbar.component';
import { FooterComponent } from './components/main-layout/footer/footer.component';
import { CoursesComponent } from './components/student/courses/courses.component';
import { CreateGroupComponent } from './components/teacher/create-group/create-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
     
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CoursesComponent,
    CreateGroupComponent,
    ReservationComponent,
    StudentcourseComponent,
    ShowTeacherComponent,
    ShowGroupComponent,
    ShowgrouppostsComponent,
    ManageTeachersComponent,
    ManageGroupComponent,
    ManageGroupsDataComponent,
    ModifyteacherinfoComponent,
    AddteacherComponent,
    CreateStudentComponent,
    StudentProfileComponent,
    ManageStudentsDataComponent,
    ManageStudentsComponent,
    ModifyinfoComponent,
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
