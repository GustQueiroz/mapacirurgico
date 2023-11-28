import { Component, OnInit, Injector, ViewChild, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppComponentBase } from 'shared/app-component-base';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorDto, FornecedorServiceProxy } from 'shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-create-fornecedor',
  templateUrl: './create-fornecedor.component.html',
  styleUrls: ['./create-fornecedor.component.css']
})
export class CreateFornecedorComponent extends AppComponentBase implements OnInit,
  AfterContentInit {

  @ViewChild('foco') inputFoco: ElementRef;
  objeto: FornecedorDto = null;
  saving = false;
  id = 0;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    private _fornecedorService: FornecedorServiceProxy) {
    super(injector);
  }

  ngAfterContentInit(): void {   
    this.inputFoco.nativeElement.focus();
  }

  ngOnInit() {
    this.objeto = new FornecedorDto();

    // tslint:disable-next-line:prefer-const
    let sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      if (this.id > 0) {
        this.operacao = 'Editar';
        this.getById(this.id);
      } else {
        this.objeto = new FornecedorDto();
        this.objeto.id = 0;
      }
    });
  }

  save(): void {
    this.saving = true;

    if (this.id > 0) {
      this._fornecedorService.update(this.objeto)
        .pipe(finalize(() => { this.saving = false; }))
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.router.navigate(['app/cadastrosBasicos/fornecedores']);
        });
    } else {
      this._fornecedorService.create(this.objeto)
        .pipe(finalize(() => { this.saving = false; }))
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.router.navigate(['app/cadastrosBasicos/fornecedores']);
        });
    }
  }

  getById(id): void {

    this._fornecedorService.get(id)
      .pipe(finalize(() => {

      }))
      .subscribe((result: FornecedorDto) => {
        this.objeto = result;
      });
  }

  cancel(): void {
    this.router.navigate(['app/cadastrosBasicos/fornecedores']);
  }
}
