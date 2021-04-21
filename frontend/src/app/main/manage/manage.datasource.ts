import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, of} from 'rxjs';
import { MainTablesService } from '../../services/main-tables.service';
import {catchError, finalize} from 'rxjs/operators';

export class ManageDataSource implements DataSource<object> {

    private ManageDataSubject = new BehaviorSubject<any[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private mainTableService: MainTablesService) {

    }

    loadManageData(sortDirection: string,
                   sortActive: string,
                   pageIndex: number,
                   pageSize: number, table: string,  userID: string) {

        this.loadingSubject.next(true);

        this.mainTableService.findManageData(sortDirection, sortActive,
            pageIndex, pageSize, table, userID).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(data => this.ManageDataSubject.next(data));

    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        console.log('Connecting data source');
        return this.ManageDataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.ManageDataSubject.complete();
        this.loadingSubject.complete();
    }

}
