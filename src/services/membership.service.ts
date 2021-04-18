import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imembership } from 'src/models/interfaces/imembership';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private _http: HttpClient) { }

  getAllMemberships(): Observable<Imembership[]> {
    return this._http.get<Imembership[]>(`http://127.0.0.1:8000/membership/`);
  }

  getSpecificMembership(_id: number): Observable<Imembership> {
    return this._http.get<Imembership>(`http://127.0.0.1:8000/membership/${_id}`);
  }

  getStudentMembership(_id: number): Observable<Imembership> {
    return this._http.get<Imembership>(`http://127.0.0.1:8000/student-membership/${_id}`);
  }

  updateMembership(membership: Imembership, _id: number): Observable<Imembership> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*'
      })
    };
    return this._http.put<Imembership>(`http://127.0.0.1:8000/membership/${_id}/`, membership, httpOptions);
  }

  deleteMembership(_id: number) {
    return this._http.delete<Imembership>(`http://127.0.0.1:8000/membership/${_id}`);
  }
}
