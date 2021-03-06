import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class MainTablesService {

    private url = 'http://localhost:3000/mainTables';

    constructor(private http: HttpClient) {}

    getLength(table: string): Observable<number> {
        return this.http.get<number>(`${this.url}/length`, {
            params: new HttpParams().set('table', table)
        })
        // tslint:disable-next-line: no-string-literal
        .pipe(map(res => res['totalNumber']));
    }

    getColumnsList(table: string): Observable<string[]> {
        return this.http.get(`${this.url}/columnsNames/${table}`, {
            params: new HttpParams().set('table', table)
        }).pipe(
// tslint:disable-next-line: no-string-literal
            map(res => res['columns'])
        );
    }

    findManageData(sortOrder = 'asc', sortActive = 'nazwa',
                   pageNumber = 0, pageSize = 10, table: string): Observable <any[]> {
        return this.http.get(`${this.url}/findMainTables`, {
            params: new HttpParams()
                .set('sortOrder', sortOrder)
                .set('sortActive', sortActive)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
                .set('table', table)
            }).pipe(
                // tslint:disable-next-line: no-string-literal
                map(res => res['payload'])
            );
    }

    getSubTableForDialogEdit(tableName: string): Observable<any[]> {
        return this.http.get<[]>(`${this.url}/tableNames/${tableName}`);
    }

    updateMainTable(table: any, name: string): Observable<any> {
        return this.http.put(`${this.url}/${table.id}`, table, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            params: new HttpParams().set('name', name)
        });
    }

    addToMainTable(table: any, name: string): Observable<any> {
        return this.http.post(`${this.url}/${name}`, table, httpOptions);
    }

    deleteMainTable(id: number, name: string): Observable<any> {
        return this.http.delete(`${this.url}/${id}`, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            params: new HttpParams().set('name', name)
        });
    }
}




