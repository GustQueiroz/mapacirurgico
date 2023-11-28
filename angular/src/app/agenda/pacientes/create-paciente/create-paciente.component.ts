import { Component, OnInit, Injector, ViewChild, ElementRef,  AfterContentInit } from '@angular/core';
import { AppComponentBase } from 'shared/app-component-base';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteServiceProxy, PacienteDto } from 'shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-create-paciente',
  templateUrl: './create-paciente.component.html',
  styleUrls: ['./create-paciente.component.css']
})
export class CreatePacienteComponent extends AppComponentBase implements OnInit,
  AfterContentInit {

  @ViewChild('foco') inputFoco: ElementRef;
  objeto: PacienteDto = null;
  saving = false;
  id = 0;
  particular: boolean;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    private _service: PacienteServiceProxy) {
    super(injector);
  }

  ngAfterContentInit(): void {   
    this.inputFoco.nativeElement.focus();
  }

  ngOnInit() {    
    this.objeto = new PacienteDto();        
    // tslint:disable-next-line:prefer-const
    let sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      if (this.id > 0) {
        this.operacao = 'Editar';
        this.getById(this.id);
      } else {
        this.objeto = new PacienteDto();
        this.objeto.id = 0;
      }
    });
  }

  save(): void {
    this.saving = true;

    if (this.id > 0) {
      this._service.update(this.objeto)
        .pipe(finalize(() => { this.saving = false; }))
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.router.navigate(['app/pacientes']);
        });
    } else {
      this._service.create(this.objeto)
        .pipe(finalize(() => { this.saving = false; }))
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.router.navigate(['app/pacientes']);
        });
    }
  }

  getById(id): void {

    this._service.get(id)
      .pipe(finalize(() => {  }))
      .subscribe((result: PacienteDto) => {
        this.objeto = result;
      });
  }

  cancel(): void {
    this.router.navigate(['app/pacientes']);
  }

  setParticular(e){
    this.objeto.particular = e.checked; 
    this.objeto.codigoCliente = null;     
  }
}
