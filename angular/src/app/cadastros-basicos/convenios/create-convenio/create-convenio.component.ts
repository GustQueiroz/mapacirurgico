import { Component, OnInit, Injector, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { AppComponentBase } from 'shared/app-component-base';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvenioServiceProxy, ConvenioDto } from 'shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-create-convenio',
  templateUrl: './create-convenio.component.html',
  styleUrls: ['./create-convenio.component.css']
})
export class CreateConvenioComponent extends AppComponentBase implements OnInit,
  AfterContentInit {

  @ViewChild('foco') inputFoco: ElementRef;
  objeto: ConvenioDto = null;
  saving = false;
  id = 0;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    private _service: ConvenioServiceProxy) {
    super(injector);
  }

  ngAfterContentInit(): void {
    // ($ as any).AdminBSB.activateAll();
    // ($ as any).AdminBSB.activateDemo();
    this.inputFoco.nativeElement.focus();
  }

  ngOnInit() {
    this.objeto = new ConvenioDto();

    // tslint:disable-next-line:prefer-const
    let sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      if (this.id > 0) {
        this.operacao = 'Editar';
        this.getById(this.id);
      } else {
        this.objeto = new ConvenioDto();
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
          this.router.navigate(['app/cadastrosBasicos/convenios']);
        });
    } else {
      this._service.create(this.objeto)
        .pipe(finalize(() => { this.saving = false; }))
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.router.navigate(['app/cadastrosBasicos/convenios']);
        });
    }
  }

  getById(id): void {

    this._service.get(id)
      .pipe(finalize(() => {  }))
      .subscribe((result: ConvenioDto) => {
        this.objeto = result;
      });
  }

  cancel(): void {
    this.router.navigate(['app/cadastrosBasicos/convenios']);
  }
}
