import {
  Component, OnInit, Injector, Input, ViewChild, ElementRef, AfterViewInit,
  AfterViewChecked, ViewEncapsulation, AfterContentInit
} from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import {
  EquipeMedicaDto, EquipeMedicaServiceProxy, TipoBusca,
  PagedResultDtoOfEquipeMedicaDto,
  MedicoDto,
  MedicoServiceProxy,
  PagedResultDtoOfMedicoDto
} from 'shared/service-proxies/service-proxies';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { finalize } from 'rxjs/internal/operators/finalize';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.css'],
  animations: [appModuleAnimation()],
  encapsulation: ViewEncapsulation.None
})

export class EquipesComponent extends PagedListingComponentBase<EquipeMedicaDto>
  implements AfterContentInit, AfterViewChecked {

  @ViewChild('foco') inputFoco: ElementRef;
  active = false;
  lista: EquipeMedicaDto[] = [];
  @Input() medico: MedicoDto = new MedicoDto();
  @Input() habilitarFiltros = true;

  tipoBusca: any = { id: 2 };
  nomeEquipe = '';

  medicos: MedicoDto[] = [];

  tiposDeBusca = [{
    id: 0,
    nome: 'Somente onde é líder'
  },
  {
    id: 1,
    nome: 'Somente onde não lidera'
  },
  {
    id: 2,
    nome: 'Todas as Ocorrências'
  }];

  ngAfterContentInit(): void {
    this.inputFoco.nativeElement.focus();
  }

  ngAfterViewChecked(): void {

  }

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._service.getAll(this.medico.id, this.nomeEquipe, this.tipoBusca.id, '', request.skipCount, request.maxResultCount)
      .pipe(finalize(() => {
        finishedCallback();
      }))      
      .subscribe((result: PagedResultDtoOfEquipeMedicaDto) => {
        this.lista = result.items;        
        this.showPaging(result, pageNumber);
      });
  }
  protected delete(entity: EquipeMedicaDto): void {
    abp.message.confirm(
      `Excluir ${entity.nome}?`, 'Confirmação',
      (result: boolean) => {
        if (result) {
          this._service.delete(entity.id)
            .pipe(finalize(() => {
              abp.notify.info(`Excluído: ${entity.nome}`);
              this.refresh();
            }))
            .subscribe(() => { });
        }
      }
    );
  }

  changeTipoBusca(): void {
    this.refresh();
  }

  constructor(
    injector: Injector,
    private router: Router,
    private _service: EquipeMedicaServiceProxy,
    private _medicoService: MedicoServiceProxy
  ) {
    super(injector);

    this.medico.id = 0;
    this.tipoBusca.id = 2;

    this._medicoService.getAll('', 0, 1000)
      .pipe(finalize(() => { }))
      .subscribe((result: PagedResultDtoOfMedicoDto) => {

        const registroTodos = new MedicoDto();
        registroTodos.id = 0;
        registroTodos.nome = 'TODOS OS MÉDICOS';

        result.items.splice(0, 0, registroTodos);
        this.medicos = result.items;
      });
  }

  create() {
    this.router.navigate(['app/equipes//create']);
  }

  edit(id) {
    this.router.navigate(['app/equipes/edit', id]);
  }
}
