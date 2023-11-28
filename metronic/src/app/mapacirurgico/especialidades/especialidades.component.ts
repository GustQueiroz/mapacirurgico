import { Component, OnInit, ViewEncapsulation, Injector, AfterViewInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { EspecialidadeDto, EspecialidadeServiceProxy, PagedResultDtoOfEspecialidadeDto } from '@shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { ScriptLoaderService } from 'app/_services/script-loader.service';

@Component({
    selector: 'especialidades',
    templateUrl: './especialidades.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./aff.css']
})
export class EspecialidadesComponent extends PagedListingComponentBase<EspecialidadeDto> {

    active = false;
    especialidades: EspecialidadeDto[] = [];

    constructor(
        injector: Injector,
        private router: Router,
        private _script: ScriptLoaderService,
        private _especialdiadeService: EspecialidadeServiceProxy,
    ) {
        super(injector);
    }

    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._especialdiadeService.getAll('', request.skipCount, request.maxResultCount)
            .finally(() => {
                finishedCallback();
            })
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
                        .finally(() => {
                            abp.notify.info(`Excluído: ${entity.nome}`);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }

    create() {
        this.router.navigate(['mapacirurgico/especialidade/create']);
    }

    edit(id) {
        this.router.navigate(['mapacirurgico/especialidade/edit', id]);
    }

}
