import { Component, OnInit, Injector, ViewChild, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppComponentBase } from 'shared/app-component-base';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecialidadeServiceProxy, EspecialidadeDto } from 'shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-create-especialidade',
  templateUrl: './create-especialidade.component.html',
  styleUrls: ['./create-especialidade.component.css']
})
export class CreateEspecialidadeComponent extends AppComponentBase implements OnInit,
  AfterContentInit {

  @ViewChild('foco') inputFoco: ElementRef;
  objeto: EspecialidadeDto = null;
  saving = false;
  id = 0;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    private _especialidadeService: EspecialidadeServiceProxy) {
    super(injector);
  }

  ngAfterContentInit(): void {   
    this.inputFoco.nativeElement.focus();
  }

  ngOnInit() {
    this.objeto = new EspecialidadeDto();

    // tslint:disable-next-line:prefer-const
    let sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      if (this.id > 0) {
        this.operacao = 'Editar';
        this.getById(this.id);
      } else {
        this.objeto = new EspecialidadeDto();
        this.objeto.id = 0;
      }
    });
  }

  save(): void {
    this.saving = true;

    if (this.id > 0) {
      this._especialidadeService.update(this.objeto)
        .pipe(finalize(() => { this.saving = false; }))
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.router.navigate(['app/cadastrosBasicos/especialidades']);
        });
    } else {
      this._especialidadeService.create(this.objeto)
        .pipe(finalize(() => { this.saving = false; }))
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.router.navigate(['app/cadastrosBasicos/especialidades']);
        });
    }
  }

  getById(id): void {

    this._especialidadeService.get(id)
      .pipe(finalize(() => {

      }))
      .subscribe((result: EspecialidadeDto) => {
        this.objeto = result;
      });
  }

  cancel(): void {
    this.router.navigate(['app/cadastrosBasicos/especialidades']);
  }
}
