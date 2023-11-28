import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from 'shared/app-component-base';
import { EspecialidadeDto, EspecialidadeServiceProxy } from 'shared/service-proxies/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
  templateUrl: './edit-especialidade.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: []
})

export class EditEspecialidadeComponent extends AppComponentBase implements OnInit {

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
        .finally(() => { this.saving = false; })
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.router.navigate(['mapacirurgico/especialidades']);
        });
    } else {
      this._especialidadeService.create(this.objeto)
        .finally(() => { this.saving = false; })
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.router.navigate(['mapacirurgico/especialidades']);
        });
    }
  }

  getById(id): void {

    this._especialidadeService.get(id)
      .finally(() => {

      })
      .subscribe((result: EspecialidadeDto) => {
        this.objeto = result;
      });
  }

  cancel(): void {
    this.router.navigate(['mapacirurgico/especialidades']);
  }

  protected delete(entity: EspecialidadeDto): void {
    let nome = entity.nome;
    abp.message.confirm(
        `Excluir ${entity.nome}?`, 'Confirmação',
        (result: boolean) => {
            if (result) {
                this._especialidadeService.delete(entity.id)
                    .finally(() => {
                        abp.notify.info(`Excluído: ${nome}`);
                        this.router.navigate(['mapacirurgico/especialidades']);
                    })
                    .subscribe(() => { });
            }
        }
    );
}
}
