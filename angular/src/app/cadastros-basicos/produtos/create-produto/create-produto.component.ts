import { Component, OnInit, ElementRef, AfterViewInit, Injector, ViewChild, AfterViewChecked, ViewEncapsulation, AfterContentInit } from '@angular/core';
import { AppComponentBase } from 'shared/app-component-base';
import {  
  ProdutoDto,
  FornecedorDto,
  FornecedorServiceProxy,
  ProdutoServiceProxy,
  PagedResultDtoOfFornecedorDto
} from 'shared/service-proxies/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '@shared/date/date.adapter';


@Component({
  selector: 'app-create-produto',
  templateUrl: './create-produto.component.html',
  styleUrls: ['./create-produto.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ],
  encapsulation: ViewEncapsulation.None
})
export class CreateProdutoComponent extends AppComponentBase implements OnInit,
  AfterContentInit {
  
  @ViewChild('foco') inputFoco: ElementRef;
  objeto: ProdutoDto = null;
  fornecedores: FornecedorDto[];
  fornecedor: FornecedorDto;
  dataVencimentoAnvisa: any;

  saving = false;
  id = 0;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private router: Router,    
    private _fornecedorService: FornecedorServiceProxy,
    private _produtoService: ProdutoServiceProxy) {
    super(injector);
  }

  ngAfterContentInit(): void {
    this.inputFoco.nativeElement.focus();    
  }
 

  ngOnInit() {
    moment.locale('pt-BR');
    this._fornecedorService.getAll('', 0, 1000)
      .pipe(finalize(() => {  }))
      .subscribe((result: PagedResultDtoOfFornecedorDto) => {
        this.fornecedores = result.items;
      });    
    this.objeto = new ProdutoDto();
    // tslint:disable-next-line:prefer-const
    let sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      if (this.id > 0) {
        this.operacao = 'Editar';
        this.getById(this.id);
      } else {
        this.objeto = new ProdutoDto();
        this.objeto.id = 0;
        this.objeto.nome = '';
      }
    });
  }

  save(): void {    
    this.saving = true;
    this.objeto.fornecedorId = this.fornecedor.id;
    const dtVencimento = moment(this.dataVencimentoAnvisa);
    this.objeto.dataVencimentoAnvisa = moment.utc(dtVencimento.format('DD/MM/YYYY'), 'DD/MM/YYYY', 'pt');    
    if (this.id > 0) {
      this._produtoService.update(this.objeto)
        .pipe(finalize(() => { this.saving = false; }))
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.router.navigate(['app/cadastrosBasicos/produtos']);
        });
    } else {
      this._produtoService.create(this.objeto)
        .pipe(finalize(() => { this.saving = false; }))
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.router.navigate(['app/cadastrosBasicos/produtos']);
        });
    }
  }

  getById(id): void {

    this._produtoService.get(id)
      .pipe(finalize(() => {  }))
      .subscribe((result: ProdutoDto) => {
        this.objeto = result;
        this.dataVencimentoAnvisa = result.dataVencimentoAnvisa.toDate();
        debugger;
        this.fornecedor = new FornecedorDto();
        this._fornecedorService.get(this.objeto.fornecedorId)
                               .pipe(finalize(() => {}))
                               .subscribe((fornecedor: FornecedorDto) => {
                                  this.fornecedor = fornecedor;
                               })
                                            ;
      });
  }

  cancel(): void {
    this.router.navigate(['app/cadastrosBasicos/produtos']);
  }
}


