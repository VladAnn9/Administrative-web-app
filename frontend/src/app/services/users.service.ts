import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    private url = 'http://localhost:3000/users';

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url);
    }

    getUserName(id: number): Observable<string> {
      return this.http.get<User>(`${this.url}/name/${id}`).pipe(map(data => data.nazwa));
    }

    getUserRole(id: string): Observable<string> {
      return this.http.get<User>(`${this.url}/role/${id}`).pipe(map(data => data.uprawnienie));
    }

}
