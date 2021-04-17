import { ICourse } from './../models/interfaces/icourse';
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

  updateTeacher(teacher: Iteacher, id: number): Observable<Iteacher> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        'Accept': '*/*',
        'DataServiceVersion': '2.0',
        'Access-Control-Allow-Headers': 'Content-Type',
        'responseType': 'text'
      })
    };
    return this._http.put<Iteacher>(`http://127.0.0.1:8000/teacher/${id}/`, teacher, httpOptions);
  }

  get_groups_for_teacher(teacher_id: number): Observable<ICourse[]> {
    return this._http.get<ICourse[]>(`http://127.0.0.1:8000/teacher-groups/${teacher_id}/`)
  }
}
