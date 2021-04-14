import { Iteacher } from './../models/interfaces/iteacher';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  constructor(private _http: HttpClient) { }
  getAllTeachers(): Observable<Iteacher[]> {
    return this._http.get<Iteacher[]>('http://127.0.0.1:8000/teacher/');
  }
  getSpecificTeacher(_id: number): Observable<Iteacher> {
    return this._http.get<Iteacher>(`http://127.0.0.1:8000/teacher/${_id}`);
  }
  insertNewTeacher(teacher: Iteacher): Observable<Iteacher> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*'
      })
    };
    return this._http.post<Iteacher>('http://127.0.0.1:8000/teacher/', teacher, httpOptions);
  }
}
