import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  addurl = 'http://localhost:3000/addUser';
  listUrl = 'http://localhost:3000/getUser';
  deleteUrl = 'http://localhost:3000/deleteUser/';
  constructor(private http: HttpClient) {}

  addUser(userJson: any): Observable<any> {
    return this.http.post<any>(this.addurl, userJson);
  }

  getUser(): Observable<any> {
    return this.http.get(this.listUrl);
  }

  deleteUser(userId: any): Observable<any> {
    const url = this.deleteUrl + `${userId}`;
    return this.http.delete(url, {});
  }
}
