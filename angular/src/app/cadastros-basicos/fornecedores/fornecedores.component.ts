import { Component, OnInit, AfterViewInit, Injector } from '@angular/core';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { FornecedorDto, FornecedorServiceProxy, PagedResultDtoOfFornecedorDto } from 'shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';


@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css'],
  animations: [appModuleAnimation()]
})

export class FornecedoresComponent extends PagedListingComponentBase<FornecedorDto> {

  active = false;
  fornecedores: FornecedorDto[] = [];

  constructor(
    injector: Injector,
    private router: Router,
    private _fornecedorService: FornecedorServiceProxy
  ) {
    super(injector);
  }

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._fornecedorService.getAll('', request.skipCount, request.maxResultCount)
      .pipe(finalize(() => {
        finishedCallback();
      }))
      .subscribe((result: PagedResultDtoOfFornecedorDto) => {
        this.fornecedores = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(entity: FornecedorDto): void {
    abp.message.confirm(
      `Excluir ${entity.razaoSocial}?`, 'Confirmação',
      (result: boolean) => {
        if (result) {
          this._fornecedorService.delete(entity.id)
            .pipe(finalize(() => {
              abp.notify.info(`Excluído: ${entity.razaoSocial}`);
              this.refresh();
            }))
            .subscribe(() => { });
        }
      }
    );
  }

  create() {
    this.router.navigate(['app/cadastrosBasicos/fornecedor/create']);
  }

  edit(id) {
    this.router.navigate(['app/cadastrosBasicos/fornecedor/edit', id]);
  }
}

