import { Component, OnInit, Injector, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { AppComponentBase } from 'shared/app-component-base';
import { RecursoServiceProxy, RecursoDto } from 'shared/service-proxies/service-proxies';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-create-recurso',
  templateUrl: './create-recurso.component.html',
  styleUrls: ['./create-recurso.component.css']
})
export class CreateRecursoComponent extends AppComponentBase implements OnInit, AfterContentInit {
  @ViewChild('foco') inputFoco: ElementRef;
  recurso: RecursoDto = null;
  saving = false;
  id = 0;


  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    private _recursoService: RecursoServiceProxy) {
    super(injector);
  }

  ngAfterContentInit(): void {    
    this.inputFoco.nativeElement.focus();
  }


  ngOnInit() {
    this.recurso = new RecursoDto();

    // tslint:disable-next-line:prefer-const
    let sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      if (this.id > 0) {
        this.operacao = 'Editar';
        this.getById(this.id);
      } else {
        this.recurso = new RecursoDto();
        this.recurso.id = 0;
        this.recurso.eventColor = '#666666';
      }
    });
  }

  save(): void {
    this.saving = true;

    if (this.id > 0) {
      this._recursoService.update(this.recurso)
        .pipe(finalize(() => { this.saving = false; }))
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.router.navigate(['app/recursos']);
        });
    } else {
      this._recursoService.create(this.recurso)
        .pipe(finalize(() => { this.saving = false; }))
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.router.navigate(['app/recursos']);
        });
    }
  }

  getById(id): void {

    this._recursoService.get(id)
      .pipe(finalize(() => {  }))
      .subscribe((result: RecursoDto) => {
        this.recurso = result;
      });
  }

  cancel(): void {
    this.router.navigate(['app/recursos']);
  }
}
