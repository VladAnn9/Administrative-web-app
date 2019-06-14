import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Order } from '../models/order';

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

    private url = 'http://localhost:3000/documents';

    constructor(private http: HttpClient) {}

    getDocumentNLength(type: string): Observable<number> {
// tslint:disable-next-line: no-string-literal
      return this.http.get(`${this.url}/documentN/length`, {
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
      // if (documentN) {
        const document: object = {
          documentN,
          documentP
        };
        console.log(document);
        return this.http.post(this.url, document, httpOptions);
    }

    updateDocumentP(documentP: DocumentP, idN: number): Observable<any> {
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

    findLookTableData(sortOrder = 'desc', sortActive = 'data',
                      pageNumber = 0, pageSize = 10, type: string): Observable<ShortManageTable[]> {
        return this.http.get(`${this.url}/findManageData`, {
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
      console.log(id);
      if (id) {
        return this.http.delete(`${this.url}/p/${id}`, httpOptions);
      } else {
        console.log('Wrong ID when deleting document P');
        return;
      }
    }

    copyToWZ(idN: string): Observable<any> {
      return this.http.post(`${this.url}/createWZ/${idN}`, {id: idN}, httpOptions);
    }

    getDocNType(idN: string): Observable<string> {
      return this.http.get<DocumentN>(`${this.url}/nType/${idN}`).pipe(map(data => data.rodzaj_dok));
    }
}
