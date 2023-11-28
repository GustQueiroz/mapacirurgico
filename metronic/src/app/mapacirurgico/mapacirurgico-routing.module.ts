import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../theme/pages/default/default.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { RootComponent } from 'app/mapacirurgico/root.component';
import { EditEspecialidadeComponent } from 'app/mapacirurgico/especialidades/edit-especialidade.component';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                path: "",
                component: RootComponent
            },
            {
                path: "especialidades",
                component: EspecialidadesComponent
            },
            {
                path: "especialidade/create",
                component: EditEspecialidadeComponent
            },
            {
                path: "especialidade/edit/:id",
                component: EditEspecialidadeComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapaCirurgicoRoutingModule { }
