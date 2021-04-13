import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/student/courses/courses.component';
import { CreateGroupComponent } from './components/teacher/create-group/create-group.component';

const routes: Routes = [
  { path: 'home', component: CoursesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'create-group', component: CreateGroupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
