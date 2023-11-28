import {
  Component, OnInit, Input, ViewEncapsulation, Injector, ViewChild, TemplateRef, ElementRef,
  ChangeDetectorRef,
  AfterContentInit
} from '@angular/core';
import { AppComponentBase } from 'shared/app-component-base';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { ModalDirective } from 'ngx-bootstrap';
import { CreateAgendaComponent } from 'app/agenda/create-agenda/create-agenda.component';
import {
  AgendamentoServiceProxy, PagedResultDtoOfAgendamentoDto, AgendamentoDto,
  RecursoServiceProxy, RecursoDto, PagedResultDtoOfRecursoDto, ChangeTimeDto
} from 'shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/internal/operators/finalize';
import * as moment from 'moment';



@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class AgendaComponent extends AppComponentBase implements OnInit, AfterContentInit {

  @ViewChild('createAgendaModal') createAgendaModal: CreateAgendaComponent;

  agendamentos: AgendamentoDto[] = [];
  events: any;
  header: any;
  buttonText: any;
  data: any;

  constructor(private injector: Injector,
    private agendamentoService: AgendamentoServiceProxy
  ) {
    super(injector);
  }

  ngAfterContentInit(): void {

  }

  ngOnInit() {

    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'timelineDay,timelineThreeDays,agendaDay,agendaTwoDay,agendaWeek,listWeek'      
    };

    this.buttonText = {
      timelineDay: 'Dia (vertical)',
      timelineThreeDays: '3 dias',
      agendaDay: 'Dia (horizontal)',
      agendaTwoDay: '2 dias',
    };

    this.getAgendas();
    this.data = moment().toDate();
  }

  onDayClick(event) {    
    this.createAgendaModal.id = 0;
    this.createAgendaModal.title = '';
    this.createAgendaModal.resourceId = event.resource.id;
    this.createAgendaModal.resourceTitle = event.resource.title;
    this.createAgendaModal.horaInicio = event.date.format('HH:mm');
    this.createAgendaModal.dataInicio = event.date.toDate();

    const datafim = event.date.add(1, 'hour');
    this.createAgendaModal.dataTermino = datafim.toDate();
    this.createAgendaModal.horaTermino = datafim.format('HH:mm');

    this.createRole();
  }

  onEventClick(event) {    
    this.createAgendaModal.id = event.calEvent.id;    
    this.createRole();
  }

  onEventDrop(event) {
    this.changeTime(event, false);
  }

  onEventResize(event) {
    this.changeTime(event, true);
  }

  createRole(): void {
    this.createAgendaModal.agendamento = new AgendamentoDto();
    this.createAgendaModal.show();
  }

  private changeTime(event: any, resize: boolean) {    
    // tslint:disable-next-line:prefer-const
    let changeTime = new ChangeTimeDto();
    changeTime.id = event.event.id;
    changeTime.resourceId = event.event.resourceId;
    changeTime.resize = resize;
    changeTime.deltaDays = event.delta._data.days;
    changeTime.deltaHours = event.delta._data.hours;
    changeTime.deltaMinutes = event.delta._data.minutes;    
    this.agendamentoService.changeTime(changeTime)
      .pipe( finalize(() => {this.recarregarEventos();}))  
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        
      });    
  }

  recarregarEventos() {
    this.getAgendas();
  }

  private getAgendas() {
    this.agendamentoService.getAll('', 0, 1000)
      .pipe(finalize(() => {}))    
      .subscribe((result: PagedResultDtoOfAgendamentoDto) => {
        this.agendamentos = result.items;
      });
  }
  
}
