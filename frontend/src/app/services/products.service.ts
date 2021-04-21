import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    private url = 'http://localhost:3000/api/documents/products';

    constructor(private http: HttpClient) {}

    getDistinctProducts(idN: string): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.url}/${idN}`);
    }

    getProductsLength(): Observable<number> {
// tslint:disable-next-line: no-string-literal
      return this.http.get(`${this.url}/length`).pipe(map(res => res['totalNumber']));
    }

}
