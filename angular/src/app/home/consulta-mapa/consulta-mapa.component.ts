import { Component, OnInit, ViewChild, TemplateRef, Input, Injector, ChangeDetectorRef, AfterViewInit, ElementRef } from "@angular/core";
import { AgendamentoServiceProxy, AgendamentoDto, AgendamentoDtoStatusAgendamento } from "@shared/service-proxies/service-proxies";
import { MatPaginator, MatSort } from "@angular/material";
import { CreateAgendaComponent } from "@app/agenda/create-agenda/create-agenda.component";
import { AppComponentBase } from "@shared/app-component-base";
import { finalize, debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { fromEvent, merge } from "rxjs";
import { ConsultaMapaDataSource } from "./consulta-mapa.datasource";

@Component({
    selector: 'mapa-consulta-mapa',
    templateUrl: './consulta-mapa.component.html',
    styleUrls: ['./consulta-mapa.component.css']
})
export class ConsultaMapaComponent extends AppComponentBase implements OnInit, AfterViewInit{
    
  
  totalAgendamentos: number;
  displayedColumns: string[] = ['title', 'pacienteNome', 'convenioNome', 'cirurgiaoNome', 'recursoTitle','startStr', 'endStr', 'statusAgendamentoStr', 'acoes'];
  @Input() templateRef: TemplateRef<any>;
  @ViewChild('input') input: ElementRef;
  dataSource: ConsultaMapaDataSource;  


  @ViewChild('createAgendaModal') createAgendaModal: CreateAgendaComponent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(injector:Injector, 
              private agendamentoService: AgendamentoServiceProxy,
              private changeDetectorRefs: ChangeDetectorRef) 
  {    
     super(injector);
  }

  ngOnInit() {
    
    this.agendamentoService.getTotalAgendamentos()
                           .subscribe((result) => {
                              this.totalAgendamentos = result;
                           })

    this.dataSource = new ConsultaMapaDataSource(this.agendamentoService);

    this.dataSource.loadAgendamentos('', 'desc', 0, 5);    
  }
  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(250),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;

                    this.loadAgendamentosPage();
                })
            )
            .subscribe();

        merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            tap(() => this.loadAgendamentosPage())
        )
        .subscribe();
  }

  
  loadAgendamentosPage() {      
    this.dataSource.loadAgendamentos(
        this.input.nativeElement.value,
        'desc',
        this.paginator.pageIndex * this.paginator.pageSize,
        this.paginator.pageSize);
  }  

  abrirAgendamento(row: AgendamentoDto){
    this.createAgendaModal.id = row.id;
    this.createAgendaModal.agendamento = new AgendamentoDto();
    this.createAgendaModal.show(); 
    
  }

  confirmar(agendamento: AgendamentoDto): void{    
    agendamento.statusAgendamento = AgendamentoDtoStatusAgendamento._1 //Status confirmado
    this.agendamentoService.update(agendamento)
        .pipe( finalize(() => {  
          this.changeDetectorRefs.detectChanges();     
          this.loadAgendamentosPage();
        }))        
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));                               
        }); 
  }  
}
