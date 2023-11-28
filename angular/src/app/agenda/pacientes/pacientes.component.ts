import { Component, OnInit, AfterViewInit, Injector } from '@angular/core';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { PacienteDto, PacienteServiceProxy, PagedResultDtoOfPacienteDto } from 'shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
  animations: [appModuleAnimation()]
})

export class PacientesComponent extends PagedListingComponentBase<PacienteDto> {

  active = false;
  pacientes: PacienteDto[] = [];

  constructor(
    injector: Injector,
    private router: Router,
    private _service: PacienteServiceProxy
  ) {
    super(injector);
  }

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._service.getAll('', request.skipCount, request.maxResultCount)
      .pipe(finalize(() => {
        finishedCallback();
      }))
      .subscribe((result: PagedResultDtoOfPacienteDto) => {
        this.pacientes = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(entity: PacienteDto): void {
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

  create() {
    this.router.navigate(['app/pacientes/create']);
  }

  edit(id) {
    this.router.navigate(['app/pacientes/edit', id]);
  }
}

