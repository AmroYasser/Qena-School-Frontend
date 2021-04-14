import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourse } from 'src/models/interfaces/icourse';
import { Ipost } from 'src/models/interfaces/ipost';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private _http: HttpClient) { }

  getGroup(group_id: number): Observable<ICourse> {
    return this._http.get<ICourse>(`http://127.0.0.1:8000/course-group/${group_id}`);
  }


  addPost(post: Ipost): Observable<Ipost> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*'
      })
    };
    return this._http.post<Ipost>('http://127.0.0.1:8000/post/', post, httpOptions)
  }


}
