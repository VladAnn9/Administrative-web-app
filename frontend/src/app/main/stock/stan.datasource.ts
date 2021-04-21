import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, of} from 'rxjs';
import { MainTablesService } from '../../services/main-tables.service';
import {catchError, finalize} from 'rxjs/operators';
import { Stan } from '../../models/stanMag';


export class StanDataSource implements DataSource<object> {

    private StanDataSubject = new BehaviorSubject<Stan[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private mainTablesService: MainTablesService) {

    }

    loadStanData(sortDirection: string,
                 sortActive: string,
                 pageIndex: number,
                 pageSize: number) {

        this.loadingSubject.next(true);

        this.mainTablesService.findStanData(sortDirection, sortActive,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((data: Stan[]) => this.StanDataSubject.next(data));

    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        console.log('Connecting data source');
        return this.StanDataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.StanDataSubject.complete();
        this.loadingSubject.complete();
    }

}
