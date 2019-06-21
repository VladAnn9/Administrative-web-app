import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../models/user';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    private token: string;
    private role: string;

    private url = 'http://localhost:3000/';

    constructor(private http: HttpClient, private router: Router) {}

    getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('userToken');
        }
        return this.token;
    }

    getRole(): string {
        if (!this.role) {
            this.role = localStorage.getItem('role');
        }
        return this.role;
    }

    login(user: User): Observable<any> {
        return this.http.post<any>(`${this.url}login`, user, httpOptions).pipe(
            map(data => {
                console.log(data);
                if (data && data.token) {
                    localStorage.setItem('userToken', data.token);
                    localStorage.setItem('role', data.uprawnienie);
                    this.token = data.token;
                    this.role = data.uprawnienie;
                    console.log(this.role);
                }
                return data;
            })
        );
    }

    getUser(): Observable<User> {
        return this.http.get<User>(`${this.url}users/user/authenticate`, {
            headers: { Authorization: `${this.getToken()}` }
        }).pipe(data => {
            console.log(data);
            return data;
        });
    }

    logout(): void {
        this.token = null;
        this.role = '';
        localStorage.removeItem('userToken');
        localStorage.removeItem('role');
        this.router.navigate(['/login']);
    }
}
