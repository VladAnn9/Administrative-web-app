import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, of} from 'rxjs';
import { DocumentsService } from '../../services/documents.service';
import {catchError, finalize} from 'rxjs/operators';
import {DocumentP} from '../../models/document_P';


export class DatailsTableDataSource implements DataSource<DocumentP> {

    private detailsDataSubject = new BehaviorSubject<DocumentP[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private documentsService: DocumentsService) {

    }

    loadDocumentsData(sortDirection: string,
                      sortActive: string,
                      pageIndex: number,
                      pageSize: number, id: number | string) {

        this.loadingSubject.next(true);

        this.documentsService.findDetailsTableData(sortDirection, sortActive,
            pageIndex, pageSize, id).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(data => this.detailsDataSubject.next(data));

    }

    connect(collectionViewer: CollectionViewer): Observable<DocumentP[]> {
        console.log('Connecting data source');
        return this.detailsDataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.detailsDataSubject.complete();
        this.loadingSubject.complete();
    }

}
