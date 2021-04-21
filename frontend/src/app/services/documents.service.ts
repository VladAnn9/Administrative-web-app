import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DocumentN } from '../models/document_N';
import { DocumentP } from '../models/document_P';
import { Product } from '../models/product';
import {ShortManageTable} from '../models/shortManage';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private url = 'http://localhost:3000/api/documents';

  constructor(private http: HttpClient) {}

  getDocumentNLength(type: string, id: string): Observable<number> {
// tslint:disable-next-line: no-string-literal
    return this.http.get(`${this.url}/documentN/length/${id}`, {
      params: new HttpParams().set('type', type)
// tslint:disable-next-line: no-string-literal
    }).pipe(map(res => res['totalNumber']));
  }

  getDocumentPLength(idN: string): Observable<number> {
// tslint:disable-next-line: no-string-literal
    return this.http.get(`${this.url}/documentP/length`, {
      params: new HttpParams().set('idN', idN)
// tslint:disable-next-line: no-string-literal
    }).pipe(map(res => res['totalNumber']));
  }

  addDocument(documentP: DocumentP, documentN: DocumentN): Observable<any> {
      const document: object = {
        documentN,
        documentP
      };
      return this.http.post(this.url, document, httpOptions);
  }

  updateDocumentP(documentP: DocumentP, idN: number | string): Observable<any> {
    return this.http.put(`${this.url}/p/${idN}`, documentP, httpOptions);
  }

  updateDocumentPSingle(documentP: DocumentP): Observable<any> {
    return this.http.put(`${this.url}/single-p/${documentP.id}`, documentP, httpOptions);
  }

  updateDocumentN(documentN: DocumentN): Observable<any> {
    return this.http.put(`${this.url}/n/${documentN.id}`, documentN, httpOptions);
  }

  findProducts(filter = '', sortOrder = 'asc', sortActive = 'nazwa',
               pageNumber = 0, pageSize = 10, idN = 0): Observable<Product[]> {

    return this.http.get(`${this.url}/findNewTable`, {
        params: new HttpParams()
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('sortActive', sortActive)
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
            .set('IDN', idN.toString())
    }).pipe(
// tslint:disable-next-line: no-string-literal
        map(res => res['payload'])
    );
  }

  findLookTableData(sortOrder = 'desc', sortActive = 'id',
                    pageNumber = 0, pageSize = 10, type: string, id: string): Observable<ShortManageTable[]> {
      return this.http.get(`${this.url}/findManageData/${id}`, {
        params: new HttpParams()
            .set('sortOrder', sortOrder)
            .set('sortActive', sortActive)
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
            .set('type', type)
    }).pipe(
// tslint:disable-next-line: no-string-literal
        map(res => res['payload'])
    );
  }

  findDetailsTableData(sortOrder = 'asc', sortActive = 'nazwa',
                       pageNumber = 0, pageSize = 10, id: number | string): Observable<DocumentP[]> {
      return this.http.get(`${this.url}/findDocumentPData`, {
        params: new HttpParams()
            .set('sortOrder', sortOrder)
            .set('sortActive', sortActive)
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
            .set('id', id.toString())
    }).pipe(
// tslint:disable-next-line: no-string-literal
        map(res => res['payload'])
    );
  }

  deleteDocumentP(id: number): Observable<any> {
    if (id) {
      return this.http.delete(`${this.url}/p/${id}`, httpOptions);
    }
  }

  deleteDocumentN(id: number): Observable<any> {
    if (id) {
      return this.http.delete(`${this.url}/n/${id}`, httpOptions);
    }
  }

  copyToWZ(idN: string): Observable<any> {
    return this.http.post(`${this.url}/createWZ/${idN}`, httpOptions);
  }

  updateStatus(idN: string, status: string): Observable<any> {
    return this.http.put(`${this.url}/statusDocN/${idN}`, {status}, httpOptions);
  }

  getDocumentN(idN: string): Observable<DocumentN> {
    return this.http.get<DocumentN>(`${this.url}/docN/${idN}`);
  }

  checkAccessOnCreateNew(type: string, userID: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/checkAccessCreateNew/${userID}`, {
      params: new HttpParams().set('type', type)
// tslint:disable-next-line: no-string-literal
    }).pipe(map(data => data['Access']));
  }
}
