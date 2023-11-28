import { Component, OnInit, AfterViewInit, Injector } from '@angular/core';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { MedicoDto, MedicoServiceProxy, PagedResultDtoOfMedicoDto } from 'shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
  animations: [appModuleAnimation()]
})

export class MedicosComponent extends PagedListingComponentBase<MedicoDto> {

  active = false;
  medicos: MedicoDto[] = [];

  constructor(
    injector: Injector,
    private router: Router,
    private _medicoService: MedicoServiceProxy
  ) {
    super(injector);
  }

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._medicoService.getAll('', request.skipCount, request.maxResultCount)
      .pipe(finalize(() => {
        finishedCallback();
      }))
      .subscribe((result: PagedResultDtoOfMedicoDto) => {
        this.medicos = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(entity: MedicoDto): void {
    abp.message.confirm(
      `Excluir ${entity.nome}?`,
      'Confirma Operação',
      (result: boolean) => {
        if (result) {
          this._medicoService.delete(entity.id)
            .pipe(finalize(() => {
              abp.notify.info(`Excluído: ${entity.nome}`);
              this.refresh();
            }))
            .subscribe(() => { });
        }
      }
    );
  }

  createMedico() {    
    this.router.navigate(['app/medicos/create']);
  }

  editMedico(id) {
    this.router.navigate(['app/medicos/edit', id]);
  }
}
