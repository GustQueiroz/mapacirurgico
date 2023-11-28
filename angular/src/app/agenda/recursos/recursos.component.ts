import { Component, Injector, AfterViewInit } from '@angular/core';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { RecursoDto, RecursoServiceProxy, PagedResultDtoOfRecursoDto } from 'shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css'],
  animations: [appModuleAnimation()]
})
export class RecursosComponent extends PagedListingComponentBase<RecursoDto> implements AfterViewInit {

  active = false;
  recursos: RecursoDto[] = [];

  constructor(
    injector: Injector,
    private router: Router,
    private _recursoService: RecursoServiceProxy
  ) {
    super(injector);
  }

  ngAfterViewInit(): void {
    // $('.colorpicker').colorpicker();
  }

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._recursoService.getAll('', request.skipCount, request.maxResultCount)
      .pipe(finalize(() => {
        finishedCallback();
      }))
      .subscribe((result: PagedResultDtoOfRecursoDto) => {
        this.recursos = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(entity: RecursoDto): void {
    abp.message.confirm(
      `Excluir ${entity.title}?`,
      (result: boolean) => {
        if (result) {
          this._recursoService.delete(entity.id)
            .pipe(finalize(() => {
              abp.notify.info(`Excluído: ${entity.title}`);
              this.refresh();
            }))
            .subscribe(() => { });
        }
      }
    );
  }

  createRecurso() {
    this.router.navigate(['app/recursos/create']);
  }

  editRecurso(id) {
    this.router.navigate(['app/recursos/edit', id]);
  }
}
