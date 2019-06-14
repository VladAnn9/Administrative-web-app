import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, of} from 'rxjs';
import { Product } from '../models/product';
import { DocumentsService } from './documents.service';
import {catchError, finalize} from 'rxjs/operators';
import {DocumentP} from '../models/document_P';

export class ProductsDataSource implements DataSource<Product> {

    private productsSubject = new BehaviorSubject<Product[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    // public documentsP: DocumentP[] = [];

    constructor(private documentsService: DocumentsService) {

    }

    loadProducts(filter: string,
                 sortDirection: string,
                 sortActive: string,
                 pageIndex: number,
                 pageSize: number, idN: number) {

        this.loadingSubject.next(true);

        this.documentsService.findProducts(filter, sortDirection, sortActive,
            pageIndex, pageSize, idN).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(products => this.productsSubject.next(products));

    }

    connect(collectionViewer: CollectionViewer): Observable<Product[]> {
        console.log('Connecting data source');
        return this.productsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.productsSubject.complete();
        this.loadingSubject.complete();
    }

}
