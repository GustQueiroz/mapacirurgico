import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { NgModule, LOCALE_ID } from "@angular/core";
import { ModalModule } from "ngx-bootstrap";
import { AbpModule } from "abp-ng2-module/dist/src/abp.module";
import { FormsModule } from "@angular/forms";
import { AgendamentoServiceProxy } from "@shared/service-proxies/service-proxies";
import { AgendaModule } from "@app/agenda/agenda.module";
import { ProductListDialogComponent } from "@app/agenda/create-agenda/product-list/product-list-dialog.component";

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      ModalModule.forRoot(),
      AbpModule,
      FormsModule,
      AgendaModule      
    ],        
    providers: [
      { provide: LOCALE_ID, useValue: 'pt-BR' },
      AgendamentoServiceProxy,      
    ],    
  })
  export class ConsultaMapaModule { }