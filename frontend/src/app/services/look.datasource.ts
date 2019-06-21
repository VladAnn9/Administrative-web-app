import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, of} from 'rxjs';
import { DocumentsService } from './documents.service';
import {catchError, finalize} from 'rxjs/operators';
import {ShortManageTable} from '../models/shortManage';


export class LookTableDataSource implements DataSource<ShortManageTable> {

    private manageSubject = new BehaviorSubject<ShortManageTable[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private documentsService: DocumentsService) {

    }

    loadManageData(sortDirection: string,
                   sortActive: string,
                   pageIndex: number,
                   pageSize: number, type: string, id: string) {

        this.loadingSubject.next(true);

        this.documentsService.findLookTableData(sortDirection, sortActive,
            pageIndex, pageSize, type, id).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(data => this.manageSubject.next(data));

    }

    connect(collectionViewer: CollectionViewer): Observable<ShortManageTable[]> {
        console.log('Connecting data source');
        return this.manageSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.manageSubject.complete();
        this.loadingSubject.complete();
    }

}
