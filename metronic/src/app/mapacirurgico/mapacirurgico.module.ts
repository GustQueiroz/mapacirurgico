import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaCirurgicoRoutingModule } from './mapacirurgico-routing.module';
import { LayoutModule } from '../theme/layouts/layout.module';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { SharedModule } from 'shared/shared.module';
import { EspecialidadeServiceProxy } from 'shared/service-proxies/service-proxies';
import { AbpModule } from 'abp-ng2-module/src/abp.module';
import { ServiceProxyModule } from 'shared/service-proxies/service-proxy.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { RootComponent } from './root.component';
import { EditEspecialidadeComponent } from './especialidades/edit-especialidade.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        SharedModule.forRoot(),
        AbpModule,
        ServiceProxyModule,
        MapaCirurgicoRoutingModule,
        NgxPaginationModule,
        NgbModule,
        FormsModule
    ],
    declarations: [EspecialidadesComponent, RootComponent, EditEspecialidadeComponent],
    providers: [
        EspecialidadeServiceProxy,
        NgbPaginationConfig
    ]
})
export class MapaCirurgicoModule { }
