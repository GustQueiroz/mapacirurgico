import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { ProdutoDto, ProdutoServiceProxy, PagedResultDtoOfProdutoDto } from 'shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
  animations: [appModuleAnimation()]
})

export class ProdutosComponent extends PagedListingComponentBase<ProdutoDto> implements OnInit{

  active = false;
  produtos: ProdutoDto[] = [];

  constructor(
    injector: Injector,
    private router: Router,
    private _produtoService: ProdutoServiceProxy
  ) {
    super(injector);
  }
 

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._produtoService.getAll('', request.skipCount, request.maxResultCount)
      .pipe(finalize(() => {
        finishedCallback();
      }))
      .subscribe((result: PagedResultDtoOfProdutoDto) => {
        this.produtos = result.items;        
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(entity: ProdutoDto): void {
    abp.message.confirm(
      `Excluir ${entity.nome}?`,
      'Confirma Operação',
      (result: boolean) => {
        if (result) {
          this._produtoService.delete(entity.id)
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
    this.router.navigate(['app/cadastrosBasicos/produto/create']);
  }

  edit(id) {
    this.router.navigate(['app/cadastrosBasicos/produto/edit', id]);
  }
}
