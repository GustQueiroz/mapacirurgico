import { Component, OnInit, AfterViewInit, Injector } from '@angular/core';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { EspecialidadeDto, EspecialidadeServiceProxy, PagedResultDtoOfEspecialidadeDto } from 'shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';


@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css'],
  animations: [appModuleAnimation()]
})

export class EspecialidadesComponent extends PagedListingComponentBase<EspecialidadeDto> {

  active = false;
  especialidades: EspecialidadeDto[] = [];

  constructor(
    injector: Injector,
    private router: Router,
    private _especialdiadeService: EspecialidadeServiceProxy
  ) {
    super(injector);
  }

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._especialdiadeService.getAll('', request.skipCount, request.maxResultCount)
      .pipe(finalize(() => {
        finishedCallback();
      }))
      .subscribe((result: PagedResultDtoOfEspecialidadeDto) => {
        this.especialidades = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(entity: EspecialidadeDto): void {
    abp.message.confirm(
      `Excluir ${entity.nome}?`, 'Confirmação',
      (result: boolean) => {
        if (result) {
          this._especialdiadeService.delete(entity.id)
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
    this.router.navigate(['app/cadastrosBasicos/especialidade/create']);
  }

  edit(id) {
    this.router.navigate(['app/cadastrosBasicos/especialidade/edit', id]);
  }
}

