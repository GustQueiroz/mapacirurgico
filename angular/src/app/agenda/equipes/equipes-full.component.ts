import {
  Component, OnInit, Injector, Input, ViewChild, ElementRef, AfterViewInit,
  AfterViewChecked, ViewEncapsulation, Injectable
} from '@angular/core';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AppComponentBase } from 'shared/app-component-base';
import { EquipesComponent } from 'app/agenda/equipes/equipes.component';

@Component({
  selector: 'app-equipes-full',
  templateUrl: './equipes-full.component.html',
  styleUrls: ['./equipes.component.css'],
  animations: [appModuleAnimation()],
  encapsulation: ViewEncapsulation.None
})


export class EquipesFullComponent  {
  isTableLoading = false;

}
