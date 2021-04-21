import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Settings } from '../models/settings';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

    private url = 'http://localhost:3000/api/settings';

    constructor(private http: HttpClient) {}

    getConfigDates(): Observable<Settings> {
        return this.http.get<Settings>(this.url).pipe(map(data => data));
    }

    updateConfigDates(dates): Observable<any> {
        return this.http.put(`${this.url}`, dates, httpOptions);
    }

}
