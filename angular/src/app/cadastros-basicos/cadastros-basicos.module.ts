import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';
import { AbpModule } from 'abp-ng2-module/src/abp.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ColorPickerModule } from 'primeng/primeng';
import {
  MatFormFieldModule, MatNativeDateModule, MatInputModule,
  MatDatepickerModule, MatButtonModule
} from '@angular/material';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { EspecialidadeServiceProxy, ConvenioServiceProxy, FornecedorServiceProxy, ProdutoServiceProxy, EquipamentoImagemServiceProxy } from 'shared/service-proxies/service-proxies';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { CreateEspecialidadeComponent } from './especialidades/create-especialidade/create-especialidade.component';
import { ConveniosComponent } from './convenios/convenios.component';
import { CreateConvenioComponent } from 'app/cadastros-basicos/convenios/create-convenio/create-convenio.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { CreateFornecedorComponent } from './fornecedores/create-fornecedor/create-fornecedor.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { CreateProdutoComponent } from './produtos/create-produto/create-produto.component';
import { EquipamentosImagemComponent } from './equipamentos-imagem/equipamentos-imagem.component';
import { CreateEquipamentoImagemComponent } from './equipamentos-imagem/create-equipamentos-imagem/create-equipamento-imagem.component';

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
  ],
  declarations: [
    EspecialidadesComponent,
    CreateEspecialidadeComponent,
    ConveniosComponent,
    CreateConvenioComponent,
    FornecedoresComponent,
    CreateFornecedorComponent,
    ProdutosComponent,
    CreateProdutoComponent,
    EquipamentosImagemComponent,
    CreateEquipamentoImagemComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    EspecialidadeServiceProxy,
    ConvenioServiceProxy,
    FornecedorServiceProxy,
    ProdutoServiceProxy,
    EquipamentoImagemServiceProxy
  ]
})
export class CadastrosBasicosModule { }
