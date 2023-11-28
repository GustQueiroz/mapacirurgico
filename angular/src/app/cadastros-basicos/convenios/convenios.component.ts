import { Component, OnInit, AfterViewInit, Injector } from '@angular/core';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { ConvenioDto, ConvenioServiceProxy, PagedResultDtoOfConvenioDto } from 'shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.css'],
  animations: [appModuleAnimation()]
})

export class ConveniosComponent extends PagedListingComponentBase<ConvenioDto> {

  active = false;
  convenios: ConvenioDto[] = [];

  constructor(
    injector: Injector,
    private router: Router,
    private _service: ConvenioServiceProxy
  ) {
    super(injector);
  }

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._service.getAll('', request.skipCount, request.maxResultCount)
      .pipe(finalize(() => {
        finishedCallback();
      }))
      .subscribe((result: PagedResultDtoOfConvenioDto) => {
        this.convenios = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(entity: ConvenioDto): void {
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
    this.router.navigate(['app/cadastrosBasicos/convenio/create']);
  }

  edit(id) {
    this.router.navigate(['app/cadastrosBasicos/convenio/edit', id]);
  }
}

