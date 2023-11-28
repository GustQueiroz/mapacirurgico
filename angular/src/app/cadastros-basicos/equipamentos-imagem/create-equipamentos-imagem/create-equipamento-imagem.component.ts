import { Component, OnInit, ElementRef, Injector, ViewChild, ViewEncapsulation, AfterContentInit } from '@angular/core';
import { AppComponentBase } from 'shared/app-component-base';
import {   
  EquipamentoImagemDto,
  EquipamentoImagemServiceProxy
} from 'shared/service-proxies/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';
import * as moment from 'moment';


@Component({
  selector: 'app-create-equipamento-imagem',
  templateUrl: './create-equipamento-imagem.component.html',
  styleUrls: ['./create-equipamento-imagem.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateEquipamentoImagemComponent extends AppComponentBase implements OnInit,
  AfterContentInit {
  
  @ViewChild('foco') inputFoco: ElementRef;
  objeto: EquipamentoImagemDto = null;
  
  saving = false;
  id = 0;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private router: Router,        
    private _equipamentoImagemService: EquipamentoImagemServiceProxy) {
    super(injector);
  }

  ngAfterContentInit(): void {
    this.inputFoco.nativeElement.focus();    
  }
 

  ngOnInit() {
    moment.locale('pt-BR');
     
    this.objeto = new EquipamentoImagemDto();
    
    let sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      if (this.id > 0) {
        this.operacao = 'Editar';
        this.getById(this.id);
      } else {
        this.objeto = new EquipamentoImagemDto();
        this.objeto.id = 0;
        this.objeto.nome = '';
      }
    });
  }

  save(): void {    
    this.saving = true;    
    if (this.id > 0) {
      this._equipamentoImagemService.update(this.objeto)
        .pipe(finalize(() => { this.saving = false; }))
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.router.navigate(['app/cadastrosBasicos/equipamentos-imagem']);
        });
    } else {
      this._equipamentoImagemService.create(this.objeto)
        .pipe(finalize(() => { this.saving = false; }))
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.router.navigate(['app/cadastrosBasicos/equipamentos-imagem']);
        });
    }
  }

  getById(id): void {

    this._equipamentoImagemService.get(id)
      .pipe(finalize(() => {  }))
      .subscribe((result: EquipamentoImagemDto) => {
        this.objeto = result;        
      });
  }

  cancel(): void {
    this.router.navigate(['app/cadastrosBasicos/equipamentos-imagem']);
  }
}


