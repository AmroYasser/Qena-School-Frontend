import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/models/interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
public is_logged:any|boolean=false
  constructor(private http:HttpClient) {
   }
  get_user():Observable<IUser>{
     return this.http.get<IUser>('http://127.0.0.1:8000/auth/user')

   }
}
