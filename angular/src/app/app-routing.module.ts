import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { AgendaComponent } from './agenda/agenda.component';
import { RecursosComponent } from './agenda/recursos/recursos.component';
import { CreateRecursoComponent } from './agenda/recursos/create-recurso/create-recurso.component';
import { MedicosComponent } from './agenda/medicos/medicos.component';
import { CreateMedicoComponent } from './agenda/medicos/create-medico/create-medico.component';
import { EquipesFullComponent } from './agenda/equipes/equipes-full.component';
import { CreateEquipeComponent } from './agenda/equipes/create-equipe/create-equipe.component';
import { EspecialidadesComponent } from './cadastros-basicos/especialidades/especialidades.component';
import { CreateEspecialidadeComponent } from './cadastros-basicos/especialidades/create-especialidade/create-especialidade.component';
import { ConveniosComponent } from './cadastros-basicos/convenios/convenios.component';
import { CreateConvenioComponent } from './cadastros-basicos/convenios/create-convenio/create-convenio.component';
import { PacientesComponent } from './agenda/pacientes/pacientes.component';
import { CreatePacienteComponent } from './agenda/pacientes/create-paciente/create-paciente.component';
import { FornecedoresComponent } from './cadastros-basicos/fornecedores/fornecedores.component';
import { CreateFornecedorComponent } from './cadastros-basicos/fornecedores/create-fornecedor/create-fornecedor.component';
import { ProdutosComponent } from './cadastros-basicos/produtos/produtos.component';
import { CreateProdutoComponent } from './cadastros-basicos/produtos/create-produto/create-produto.component';
import { EquipamentosImagemComponent } from './cadastros-basicos/equipamentos-imagem/equipamentos-imagem.component';
import { CreateEquipamentoImagemComponent } from './cadastros-basicos/equipamentos-imagem/create-equipamentos-imagem/create-equipamento-imagem.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent },                                                            
                    { path: 'agenda', component: AgendaComponent },
                    { path: 'recursos', component: RecursosComponent },
                    { path: 'recursos/create', component: CreateRecursoComponent },
                    { path: 'recursos/edit/:id', component: CreateRecursoComponent },
                    { path: 'medicos', component: MedicosComponent },
                    { path: 'medicos/create', component: CreateMedicoComponent },
                    { path: 'medicos/edit/:id', component: CreateMedicoComponent },
                    { path: 'equipes', component: EquipesFullComponent },
                    { path: 'equipes/create', component: CreateEquipeComponent },
                    { path: 'equipes/edit/:id', component: CreateEquipeComponent },
                    { path: 'pacientes', component: PacientesComponent },
                    { path: 'pacientes/create', component: CreatePacienteComponent },
                    { path: 'pacientes/edit/:id', component: CreatePacienteComponent },

                    { path: 'cadastrosBasicos/especialidades', component: EspecialidadesComponent },
                    { path: 'cadastrosBasicos/especialidade/create', component: CreateEspecialidadeComponent },
                    { path: 'cadastrosBasicos/especialidade/edit/:id', component: CreateEspecialidadeComponent },
                    { path: 'cadastrosBasicos/convenios', component: ConveniosComponent },
                    { path: 'cadastrosBasicos/convenio/create', component: CreateConvenioComponent },
                    { path: 'cadastrosBasicos/convenio/edit/:id', component: CreateConvenioComponent },
                    { path: 'cadastrosBasicos/fornecedores', component: FornecedoresComponent },
                    { path: 'cadastrosBasicos/fornecedor/create', component: CreateFornecedorComponent },
                    { path: 'cadastrosBasicos/fornecedor/edit/:id', component: CreateFornecedorComponent },
                    { path: 'cadastrosBasicos/produtos', component: ProdutosComponent },
                    { path: 'cadastrosBasicos/produto/create', component: CreateProdutoComponent },
                    { path: 'cadastrosBasicos/produto/edit/:id', component: CreateProdutoComponent },
                    { path: 'cadastrosBasicos/equipamentos-imagem', component: EquipamentosImagemComponent },
                    { path: 'cadastrosBasicos/equipamento-imagem/create', component: CreateEquipamentoImagemComponent },
                    { path: 'cadastrosBasicos/equipamento-imagem/edit/:id', component: CreateEquipamentoImagemComponent },
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
