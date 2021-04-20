import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourse } from 'src/models/interfaces/icourse';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private _http: HttpClient) { }

  getAllCourses(): Observable<ICourse[]> {
    return this._http.get<ICourse[]>('http://127.0.0.1:8000/course-group/');
  }
  insertNewCourse(course: ICourse): Observable<ICourse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*'
      })
    };
    return this._http.post<ICourse>('http://127.0.0.1:8000/course-group/', course, httpOptions);
  }

  updateCourse(group_id: number, course: ICourse): Observable<ICourse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*'
      })
    };
    return this._http.patch<ICourse>(`http://127.0.0.1:8000/course-group/${group_id}/`, course, httpOptions);
  }
}


