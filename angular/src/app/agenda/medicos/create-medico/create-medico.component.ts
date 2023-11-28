import { Component, OnInit, ElementRef, AfterViewInit, Injector, ViewChild, AfterViewChecked, ViewEncapsulation, AfterContentInit } from '@angular/core';
import { AppComponentBase } from 'shared/app-component-base';
import {
  MedicoDto, MedicoServiceProxy, EspecialidadeServiceProxy, EspecialidadeDto,
  PagedResultDtoOfEspecialidadeDto
} from 'shared/service-proxies/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';
import { UfService } from 'shared/services/uf.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Uf } from '@shared/model/uf';


@Component({
  selector: 'app-create-medico',
  templateUrl: './create-medico.component.html',
  styleUrls: ['./create-medico.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateMedicoComponent extends AppComponentBase implements OnInit,
  AfterContentInit {
  
  @ViewChild('foco') inputFoco: ElementRef;
  objeto: MedicoDto = null;
  especialidades: EspecialidadeDto[];
  especialidade: EspecialidadeDto;
  
  ufs: Uf[];

  saving = false;
  id = 0;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    private _ufService: UfService,
    private _especialidadeService: EspecialidadeServiceProxy,
    private _appService: MedicoServiceProxy) {
    super(injector);
  }

  ngAfterContentInit(): void {
    this.inputFoco.nativeElement.focus();    
  }
 

  ngOnInit() {

    this._especialidadeService.getAll('', 0, 1000)
      .pipe(finalize(() => {  }))
      .subscribe((result: PagedResultDtoOfEspecialidadeDto) => {
        this.especialidades = result.items;
      });
    this.ufs = this._ufService.getUfs();
    this.objeto = new MedicoDto();
    // tslint:disable-next-line:prefer-const
    let sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      if (this.id > 0) {
        this.operacao = 'Editar';
        this.getById(this.id);
      } else {
        this.objeto = new MedicoDto();
        this.objeto.id = 0;
        this.objeto.nome = '';
      }
    });
  }

  save(): void {
    console.log(this.objeto);
    this.saving = true;
    this.objeto.especialidadeId = this.especialidade.id;
    if (this.id > 0) {
      this._appService.update(this.objeto)
        .pipe(finalize(() => { this.saving = false; }))
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.router.navigate(['app/medicos']);
        });
    } else {
      this._appService.create(this.objeto)
        .pipe(finalize(() => { this.saving = false; }))
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.router.navigate(['app/medicos']);
        });
    }
  }

  getById(id): void {

    this._appService.get(id)
      .pipe(finalize(() => {  }))
      .subscribe((result: MedicoDto) => {
        this.objeto = result;
        this.especialidade = new EspecialidadeDto();
        this.especialidade = this.especialidades.find(e => e.id == this.objeto.especialidadeId);
        //jQuery('#ufConselho').selectpicker('val', result.ufConselho);
        //jQuery('#especialidade').selectpicker('val', result.especialidadeId.toString());
      });
  }

  cancel(): void {
    this.router.navigate(['app/medicos']);
  }

  setAnestesista(e){
    this.objeto.anestesista = e.checked;     
  }
}


