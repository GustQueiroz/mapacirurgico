import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { AgendamentoDto, AgendamentoServiceProxy } from "@shared/service-proxies/service-proxies";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

export class ConsultaMapaDataSource implements DataSource<AgendamentoDto> {

    private agendamentosSubject = new BehaviorSubject<AgendamentoDto[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private agendamentoService: AgendamentoServiceProxy) {

    }

    loadAgendamentos(filter:string,
                    sortDirection:string,
                    pageIndex:number,
                    pageSize:number) {

        this.loadingSubject.next(true);

        this.agendamentoService.getAllWithInclude(filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(agendamentos => this.agendamentosSubject.next(agendamentos));

    }

    connect(collectionViewer: CollectionViewer): Observable<AgendamentoDto[]> {
        console.log("Connecting data source");
        return this.agendamentosSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.agendamentosSubject.complete();
        this.loadingSubject.complete();
    }

}
