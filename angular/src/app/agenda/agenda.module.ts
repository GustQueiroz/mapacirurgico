import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from 'app/agenda/agenda.component';
import { ModalModule } from 'ngx-bootstrap';
import { AbpModule } from 'abp-ng2-module/src/abp.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ColorPickerModule } from 'primeng/primeng';
import {
  MatFormFieldModule, MatNativeDateModule, MatInputModule,
  MatDatepickerModule, MatButtonModule, MatSelectModule, MatDialogModule
} from '@angular/material';
import { SharedModule } from '@shared/shared.module';
import { CreateAgendaComponent } from './create-agenda/create-agenda.component';
import { RecursosComponent } from './recursos/recursos.component';
import { CreateRecursoComponent } from './recursos/create-recurso/create-recurso.component';
import { DexSchedulerModuleModule } from 'app/dex-scheduler-module/dex-scheduler-module.module';
import {
  RecursoServiceProxy, AgendamentoServiceProxy, MedicoServiceProxy,
  EspecialidadeServiceProxy,
  EquipeMedicaServiceProxy,
  PacienteServiceProxy,
  ProcedimentoServiceProxy,
  EquipamentoImagemServiceProxy
} from 'shared/service-proxies/service-proxies';
import { MedicosComponent } from './medicos/medicos.component';
import { CreateMedicoComponent } from 'app/agenda/medicos/create-medico/create-medico.component';
import { UfService } from 'shared/services/uf.service';
import { DropdownModule } from 'primeng/primeng';
import { EquipesComponent } from './equipes/equipes.component';
import { EquipesFullComponent } from 'app/agenda/equipes/equipes-full.component';
import { CreateEquipeComponent } from './equipes/create-equipe/create-equipe.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { CreatePacienteComponent } from './pacientes/create-paciente/create-paciente.component';
import { ProductListDialogComponent } from './create-agenda/product-list/product-list-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ModalModule.forRoot(),
    AbpModule,
    FormsModule,
    NgxPaginationModule,
    ColorPickerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    DropdownModule,
    DexSchedulerModuleModule,
    MatDialogModule    
  ],
  declarations: [
    AgendaComponent,
    CreateAgendaComponent,
    RecursosComponent,
    CreateRecursoComponent,
    MedicosComponent,
    CreateMedicoComponent,
    EquipesComponent,
    EquipesFullComponent,
    CreateEquipeComponent,
    PacientesComponent,
    CreatePacienteComponent,
    ProductListDialogComponent
  ],
  entryComponents: [ 
    ProductListDialogComponent   
  ],
  exports:[
    CreateAgendaComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    UfService,
    RecursoServiceProxy,
    AgendamentoServiceProxy,
    MedicoServiceProxy,
    EspecialidadeServiceProxy,
    EquipeMedicaServiceProxy,
    PacienteServiceProxy,
    ProcedimentoServiceProxy,
    EquipamentoImagemServiceProxy
  ]
})
export class AgendaModule { }
