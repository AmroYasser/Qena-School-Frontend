import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/student/courses/courses.component';
import { CreateGroupComponent } from './components/teacher/create-group/create-group.component';
import { ReservationComponent } from './components/student/reservation/reservation.component';
import { StudentcourseComponent } from './components/student/studentcourse/studentcourse.component';
import { ShowGroupComponent } from './components/teacher/show-group/show-group.component';

const routes: Routes = [
  { path: 'home', component: CoursesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'create-group', component: CreateGroupComponent },
  {path:'reserve',component:ReservationComponent},
  {path:'student-course',component:StudentcourseComponent},
  { path: 'tgroup/:id', component:ShowGroupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
