import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { EquipamentoImagemDto, EquipamentoImagemServiceProxy, PagedResultDtoOfEquipamentoImagemDto } from 'shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-equipamentos-imagem',
  templateUrl: './equipamentos-imagem.component.html',
  styleUrls: ['./equipamentos-imagem.component.css'],
  animations: [appModuleAnimation()]
})

export class EquipamentosImagemComponent extends PagedListingComponentBase<EquipamentoImagemDto> implements OnInit{

  active = false;
  equipamentosImagem: EquipamentoImagemDto[] = [];

  constructor(
    injector: Injector,
    private router: Router,
    private _equipamentoImagemService: EquipamentoImagemServiceProxy
  ) {
    super(injector);
  }
 

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._equipamentoImagemService.getAll('', request.skipCount, request.maxResultCount)
      .pipe(finalize(() => {
        finishedCallback();
      }))
      .subscribe((result: PagedResultDtoOfEquipamentoImagemDto) => {
        this.equipamentosImagem = result.items;        
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(entity: EquipamentoImagemDto): void {
    abp.message.confirm(
      `Excluir ${entity.nome}?`,
      'Confirma Operação',
      (result: boolean) => {
        if (result) {
          this._equipamentoImagemService.delete(entity.id)
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
    this.router.navigate(['app/cadastrosBasicos/equipamento-imagem/create']);
  }

  edit(id) {
    this.router.navigate(['app/cadastrosBasicos/equipamento-imagem/edit', id]);
  }
}
