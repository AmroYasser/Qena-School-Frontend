import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudent } from 'src/models/interfaces/istudent';
import { Iteacher } from 'src/models/interfaces/iteacher';
import { IUser } from 'src/models/interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
public is_logged:any|boolean
public current_user:IUser|any
public current_student:IStudent|any
public current_teacher:Iteacher|any

  constructor(private http:HttpClient) {
   }
  get_user():Observable<IUser>{
     return this.http.get<IUser>('http://127.0.0.1:8000/auth/user')

   }

   get_student_user(id:number):Observable<IStudent>{
     return this.http.get<IStudent>(`http://127.0.0.1:8000/get-user-student/${id}`)
   }
   change_login_status():void{
     this.is_logged=!this.is_logged
   }
   get_login_status():Observable<boolean>{
     return this.is_logged
   }
}
