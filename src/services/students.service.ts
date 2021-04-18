import { IStudent } from './../models/interfaces/istudent';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imembership } from 'src/models/interfaces/imembership';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private _http: HttpClient) { }
  getAllStudents(): Observable<IStudent[]> {
    return this._http.get<IStudent[]>('http://127.0.0.1:8000/student/');
  }

  getSpecificStudent(_id: number): Observable<IStudent> {
    return this._http.get<IStudent>(`http://127.0.0.1:8000/student/${_id}`);
  }


  insertNewStudent(student: FormData): Observable<FormData> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Accept': '*/*'
    //   })
    // };
    return this._http.post<FormData>('http://127.0.0.1:8000/student/', student);
  }

  updateStudent(student: IStudent, id: number): Observable<IStudent> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*'
      })
    };
    return this._http.put<IStudent>(`http://127.0.0.1:8000/student/${id}/`, student, httpOptions);
  }
}
