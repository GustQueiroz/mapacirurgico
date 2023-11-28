import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Injector } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import {
  AgendamentoDto,
  AgendamentoServiceProxy,
  ConvenioDto,
  ConvenioServiceProxy,
  PagedResultDtoOfConvenioDto,
  PacienteDto,
  PacienteServiceProxy,
  PagedResultDtoOfPacienteDto,
  MedicoDto,
  MedicoServiceProxy,
  ProcedimentoDto,
  ProcedimentoServiceProxy,
  EquipeMedicaDto,
  EquipeMedicaServiceProxy,
  PagedResultDtoOfMedicoDto,
  AgendamentoProcedimentoDto,
  FornecedorDto,
  ProdutoServiceProxy,
  ProdutoDto,
  FornecedorServiceProxy,
  PagedResultDtoOfFornecedorDto,
  AgendamentoProdutoDto,
  EquipamentoImagemServiceProxy,
  PagedResultDtoOfEquipamentoImagemDto,
  EquipamentoImagemDto,
  AgendamentoEquipamentoImagemDto,
  RecursoServiceProxy,
  RecursoDto,
  PagedResultDtoOfRecursoDto,
  AgendamentoDtoStatusAgendamento
} from 'shared/service-proxies/service-proxies';
import { AppComponentBase } from 'shared/app-component-base';
import * as moment from 'moment';
import { finalize, debounceTime, distinctUntilChanged, tap, switchMap, catchError, flatMap } from 'rxjs/operators';
import { Observable, concat, of, Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ProductListDialogComponent } from './product-list/product-list-dialog.component';
import { InvokeMethodExpr } from '@angular/compiler';
import { ProductList } from './product-list/product-list';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'create-agenda-component',
  templateUrl: './create-agenda.component.html',
  styleUrls: ['./create-agenda.component.css']
})
export class CreateAgendaComponent extends AppComponentBase implements OnInit {
  @ViewChild('createRoleModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;
  @ViewChild('titulo') titulo: ElementRef;

  active: boolean = false;
  saving: boolean = false;
  id: number = 0;
  title: string;
  resourceId: number;
  resourceTitle: string;
  horaInicio: string;
  horaTermino: string;
  dataInicio: any;
  dataTermino: any;
  tituloModal: string;  

  recursos: RecursoDto[];
  recurso: RecursoDto;

  convenios: ConvenioDto[];
  convenio: ConvenioDto;

  pacientes: PacienteDto[];
  paciente: PacienteDto;

  //Atributos para equipes
  equipes: EquipeMedicaDto[];
  equipe: EquipeMedicaDto;

  anestesista: MedicoDto;
  anestesistaLoading = false;
  anestesistainput$ = new Subject<string>();
  auxiliar1: MedicoDto;
  auxiliar2: MedicoDto;

  //Atributos para médicos
  medicos: MedicoDto[];
  anestesistas: MedicoDto[];
  medico: MedicoDto;  

  //Atributos para procedimentos
  procedimentos$: Observable<ProcedimentoDto[]>;
  procedimentosSelecionados: ProcedimentoDto[];
  procedimentosLoading = false;
  procedimentoinput$ = new Subject<string>();

  //Atributos para médicos
  fornecedores: FornecedorDto[];
  fornecedor: FornecedorDto;  

  //Atributos para produtos
  produtos$: Observable<ProdutoDto[]>;
  produto: ProdutoDto;
  produtosLoading = false;
  produtoinput$ = new Subject<string>();

  agendamento: AgendamentoDto;  
  //Atributos para Itens de apoio
  equipImagem:boolean = false;
  equipamentosImagem: EquipamentoImagemDto[];
  equipamentosSelecionados: EquipamentoImagemDto[];

  bancoSangue: boolean;
  vagaUti: boolean;
  opmeEstoque: boolean;
  opmeConsignado: boolean;
  itensSelecionados: number = 0; 

  lista: AgendamentoProdutoDto[];
  

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    injector: Injector,
    private recursoService: RecursoServiceProxy,
    private convenioService: ConvenioServiceProxy,
    private pacienteService: PacienteServiceProxy,
    private medicoService: MedicoServiceProxy,
    private equipeMedicaService: EquipeMedicaServiceProxy,
    private procedimentoService: ProcedimentoServiceProxy,
    private produtoService: ProdutoServiceProxy,
    private fornecedorService: FornecedorServiceProxy,
    private equipamentoImagemService: EquipamentoImagemServiceProxy,
    private agendamentoService: AgendamentoServiceProxy,
    public dialog: MatDialog
  ) {
    super(injector);
  }
  
  ngOnInit() {
    moment.locale('pt-BR');    
    this.convenioService.getAll('', 0, 1000)
                        .pipe( finalize(() => {}))        
                        .subscribe((result: PagedResultDtoOfConvenioDto) => {
                          this.convenios = result.items;
                        });

    this.pacienteService.getAll('', 0, 1000)
                        .pipe( finalize(() => {}))        
                        .subscribe((result: PagedResultDtoOfPacienteDto) => {
                          this.pacientes = result.items;
                        });
    
    

    this.medicoService.getAll('', 0, 1000)
                      .pipe( finalize(() => {}))        
                      .subscribe((result: PagedResultDtoOfMedicoDto) => {
                          this.medicos = result.items;
                          this.anestesistas = this.medicos.filter(m => m.anestesista);
                        });

    this.fornecedorService.getAll('', 0, 1000)
                      .pipe( finalize(() => {}))        
                      .subscribe((result: PagedResultDtoOfFornecedorDto) => {
                          this.fornecedores = result.items;
                      });

    this.equipamentoImagemService.getAll('',0,1000)
                                 .pipe( finalize(() => {}))        
                                 .subscribe((result: PagedResultDtoOfEquipamentoImagemDto) => {
                                      this.equipamentosImagem = result.items;                                      
                                 });

    this.recursoService.getAll('', 0, 1000)
                      .pipe(finalize(() => {}))
                      .subscribe((result: PagedResultDtoOfRecursoDto) => {
                        this.recursos = result.items;
                      });

    this.loadProcedimentos();
    
    this.loadProdutos();
        

  }
  


  onShown(): void {    
    this.limparCampos();
    $(this.titulo.nativeElement).focus();    

    if (this.id > 0) {
      this.tituloModal = 'Editar Agendamento';
      

      this.agendamentoService.get(this.id)
        .subscribe((result: AgendamentoDto) => {
          this.agendamento = result;                    
          this.title = result.title;
          this.resourceId = result.resourceId;
          this.dataInicio = result.start.toDate();
          this.horaInicio = result.start.format('HH:mm');
          this.dataTermino = result.end.toDate();
          this.horaTermino = result.end.format('HH:mm');                    

          this.recurso = this.recursos.find(recurso => recurso.id == result.resourceId);
          if(this.recurso){
            this.resourceId = this.recurso.id;
            this.resourceTitle = this.recurso.title;
          }

          this.convenio =  this.convenios.find(convenio => convenio.id == result.convenioId);
          
          this.paciente =  this.pacientes.find(paciente => paciente.id == result.pacienteId);

          this.medico = this.medicos.find(med => med.id == result.cirurgiaoId);
          if(result.anestesistaId)
            this.anestesista = this.medicos.find(anest => anest.id == result.anestesistaId);
          if(result.auxiliar1Id)
            this.auxiliar1 = this.medicos.find(aux1 => aux1.id == result.auxiliar1Id);
          if(result.auxiliar2Id)
            this.auxiliar2 = this.medicos.find(aux2 => aux2.id == result.auxiliar2Id);
          if(!this.procedimentosSelecionados)
            this.procedimentosSelecionados = [];
          if(!this.lista)
            this.lista = [];
          if(!this.equipamentosSelecionados)
            this.equipamentosSelecionados = [];

          result.agendamentoProcedimentos.forEach(element => {
            const procedimento = new ProcedimentoDto();
            procedimento.id = procedimento.codigo = element.procedimentoId;
            procedimento.descricao = element.procedimentoDescricao;
            procedimento.codigoDescricaoFormatado = element.procedimentoId + ' - '+ element.procedimentoDescricao;         
            this.procedimentosSelecionados.push(procedimento);
          });
          this.lista = result.agendamentoProdutos;         
          
          this.vagaUti = result.vagaUti;
          this.bancoSangue = result.bancoSangue;
          this.opmeEstoque = result.opmeEstoque;
          this.opmeConsignado = result.opmeConsignado;          
          if(result.agendamentoEquipamentoImagem && result.agendamentoEquipamentoImagem.length){            
            result.agendamentoEquipamentoImagem.forEach(element => {
              const equipamentoImagem = this.equipamentosImagem.find(eq => eq.id == element.equipamentoImagemId);              
              this.equipamentosSelecionados.push(equipamentoImagem);
            });
            this.equipImagem = true;
          }
        });
      
    }
    else {
      this.tituloModal = 'Novo Agendamento';      
    }

    
  }

  show(): void {
    
    this.active = true;

    this.modal.show();

  }

  close(): void {    
    this.active = false;
    this.modal.hide();
  }

  save(): void {    
    this.saving = true;    
    const dtinicio = moment(this.dataInicio);    
    const dttermino = moment(this.dataTermino);
    this.agendamento.title = this.title;    
    this.agendamento.start = moment.utc(dtinicio.format('DD/MM/YYYY') + ' ' + this.horaInicio, 'DD/MM/YYYY HH:mm', 'pt');    
    this.agendamento.end = moment.utc(dttermino.format('DD/MM/YYYY') + ' ' + this.horaTermino, 'DD/MM/YYYY HH:mm','pt');    
    this.agendamento.resourceId = this.resourceId;
    this.agendamento.convenioId = this.convenio.id;
    this.agendamento.convenioNome = this.convenio.nome;    
    this.agendamento.pacienteId = this.paciente.id;
    this.agendamento.pacienteNome = this.paciente.nome;
    this.agendamento.pacienteCodigoCliente = this.paciente.codigoCliente;
    this.agendamento.cirurgiaoId = this.medico.id;
    this.agendamento.anestesistaId = this.anestesista ? this.anestesista.id : null;
    this.agendamento.auxiliar1Id = this.auxiliar1 ? this.auxiliar1.id : null;
    this.agendamento.auxiliar2Id = null;      
    if(this.auxiliar2)
      this.agendamento.auxiliar2Id = this.auxiliar2.id;
    this.agendamento.agendamentoProcedimentos = [];
    if(this.procedimentosSelecionados)
      this.procedimentosSelecionados.forEach(element => {
        const agendamentoProcedimentoDto = new AgendamentoProcedimentoDto();      
        agendamentoProcedimentoDto.agendamentoId = this.id;
        agendamentoProcedimentoDto.procedimentoId = element.id;      
        this.agendamento.agendamentoProcedimentos.push(agendamentoProcedimentoDto);
      });
    this.agendamento.agendamentoProdutos = [];
    if(this.lista)
      this.lista.forEach(element => {
        const agendamentoProdutoDto = new AgendamentoProdutoDto();      
        agendamentoProdutoDto.agendamentoId = this.id;
        agendamentoProdutoDto.produtoId = element.produtoId;
        agendamentoProdutoDto.quantidade = element.quantidade;
        agendamentoProdutoDto.confirmado = element.confirmado;
        this.agendamento.agendamentoProdutos.push(agendamentoProdutoDto);
      });    
    this.agendamento.agendamentoEquipamentoImagem = [];
    if((!this.equipamentosSelecionados || !this.equipamentosSelecionados.length) && this.equipImagem){
      this.notify.error("Você precisa selecionar o(s) equipamento(s) de imagem");
      this.saving = false;
      return;        
    }
    if(this.equipamentosSelecionados && this.equipImagem){        
        this.equipamentosSelecionados.forEach(element => {
          const agendamentoEquipamentoImagemDto = new AgendamentoEquipamentoImagemDto();
          agendamentoEquipamentoImagemDto.agendamentoId = this.id;
          agendamentoEquipamentoImagemDto.equipamentoImagemId = element.id;
          this.agendamento.agendamentoEquipamentoImagem.push(agendamentoEquipamentoImagemDto);
        });
    }
    this.agendamento.vagaUti = this.vagaUti;
    this.agendamento.bancoSangue = this.bancoSangue;
    this.agendamento.opmeEstoque = this.opmeEstoque;
    this.agendamento.opmeConsignado = this.opmeConsignado;


    if (this.id > 0) {
      this.agendamentoService.update(this.agendamento)
        .pipe( finalize(() => { this.saving = false; }))        
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.close();
          this.modalSave.emit(null);
        });      
    } else {
      this.agendamento.id = 0;
      this.agendamentoService.create(this.agendamento)
        .pipe( finalize(() => { this.saving = false; }))
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.close();
          this.modalSave.emit(null);
        });
    }
  }

  delete(): void {
    abp.message.confirm(
      `Deseja realmente excluir o evento: ${this.agendamento.title}?`, 'Confirmação',
      (result: boolean) => {
        if (result) {
          this.agendamentoService.delete(this.agendamento.id)
            .pipe( finalize(() => { this.saving = false; }))
            .subscribe(() => {
              this.modalSave.emit(null);
              abp.notify.info('Agendamento excluído com sucesso');
              this.close();
            });
        }
      }
    );
  }
  
  confirmar(): void{
    this.agendamento.statusAgendamento = AgendamentoDtoStatusAgendamento._1 //Status confirmado
    this.save();
  }

  private loadProcedimentos() {
    this.procedimentos$ = concat(
      of([]), // default items
      this.procedimentoinput$.pipe(
         debounceTime(300),
         distinctUntilChanged(),
         tap(() => this.procedimentosLoading = true),
         switchMap(term => this.procedimentoService.getByTerm(term).pipe(
             catchError(() => of([])), // empty list on error
             tap(() => this.procedimentosLoading = false)
         )) 
      )
    );
  }
  private loadProdutos() {
    this.produtos$ = concat(
      of([]), // default items
      this.produtoinput$.pipe(
         debounceTime(300),
         distinctUntilChanged(),
         tap(() => this.produtosLoading = true),
         switchMap(term => this.produtoService.getByTerm(term, this.fornecedor ? this.fornecedor.id: undefined).pipe(
             catchError(() => of([])), // empty list on error
             tap(() => this.produtosLoading = false)
         )) 
      )
    );
  }

  loadEquipesByLider(liderId: number){
     this.equipe = null;
     this.equipeMedicaService.getEquipesPorLider(liderId)
                             .subscribe(equipesLider => {
                               this.equipes = equipesLider
                             });
  }

  carregaMembros(){
    if(this.equipe){
      const anestesistaEquipe = this.equipe.medicosEquipes.find(e => e.anestesista);
      this.anestesista = new MedicoDto();
      this.anestesista.id = anestesistaEquipe.medicoId;
      this.anestesista.nome = anestesistaEquipe.medicoNome;

      const auxiliares = this.equipe.medicosEquipes.filter(e => !e.anestesista).sort();
      if(auxiliares.length > 0){
        this.auxiliar1 = new MedicoDto();
        this.auxiliar1.id = auxiliares[0].medicoId;
        this.auxiliar1.nome = auxiliares[0].medicoNome;
        if(auxiliares.length > 1){
          this.auxiliar2 = new MedicoDto();
          this.auxiliar2.id = auxiliares[1].medicoId;
          this.auxiliar2.nome = auxiliares[1].medicoNome;          
        }  
      }      
    }
  }
  limparMembros(){

    this.anestesista = null;
    this.auxiliar1 = null;
    this.auxiliar2 = null;
  } 

  private limparCampos(){
    this.recurso = null;
    this.convenio = null;
    this.paciente = null;
    this.medico = null;
    this.equipe = null;
    this.produto = null;
    this.fornecedor = null;
    this.procedimentosSelecionados = null;
    this.lista = null;
    this.equipamentosSelecionados = null;
    this.vagaUti = false;
    this.bancoSangue = false;
    this.opmeConsignado = false;
    this.opmeEstoque = false;
    this.equipImagem = false;
    this.limparMembros();
  }
  addProduto(produto: ProdutoDto, qtd: number){
    if(!produto){
      abp.notify.error('Selecione o material que deseja adicionar');
      return;
    }
    if(qtd <= 0){
      abp.notify.error('A quantidade do material deve ser maior que 0');
      return;
    }
    if(!this.lista)
      this.lista = [];
    const element = this.lista.find(ap => ap.produtoId == produto.id);
    if(element){
      const idx = this.lista.indexOf(element);
      this.lista[idx].quantidade = parseInt(this.lista[idx].quantidade.toString())  + parseInt(qtd.toString());
    }
    else{
      const agendamentoProdutoDto = new AgendamentoProdutoDto();
      agendamentoProdutoDto.produtoId = produto.id;
      agendamentoProdutoDto.produtoNome = produto.nome;
      agendamentoProdutoDto.produtoQuantidadeEstoque = produto.quantidadeEstoque;
      agendamentoProdutoDto.quantidade = qtd;
      
      this.lista.push(agendamentoProdutoDto);
    }
  }

  removeProduto(produto: AgendamentoProdutoDto){
    const idx = this.lista.indexOf(produto);    
    this.lista.splice(idx, 1);
  }
  confirmarProduto(produto: AgendamentoProdutoDto){
    const idx = this.lista.indexOf(produto);    
    this.lista[idx].confirmado = !this.lista[idx].confirmado;
  }
  setEquipamento(e){
    if(e.checked){
        this.equipImagem = true;
        this.itensSelecionados++;
   }else{
        this.equipImagem =false;
        this.itensSelecionados--;
   }  
  }

  setBancoSangue(e){    
    this.bancoSangue = e.checked;
    if(e.checked){       
      this.itensSelecionados++;
    }else{
      this.itensSelecionados--;
    }
    
    
  }

  setVagaUti(e){    
    this.vagaUti = e.checked; 
    if(e.checked){       
      this.itensSelecionados++;
    }else{
      this.itensSelecionados--;
    }  
  }

  setOpmeEstoque(e){    
    this.opmeEstoque = e.checked; 
    if(e.checked){       
      this.itensSelecionados++;
    }else{
      this.itensSelecionados--;
    }  
  }

  setOpmeConsignado(e){    
    this.opmeConsignado = e.checked;
    if(e.checked){       
      this.itensSelecionados++;
    }else{
      this.itensSelecionados--;
    }
  }

  openDialog() {
    let produtosTemp: AgendamentoProdutoDto[] = [];
    this.produtoService.getByTerm('', this.fornecedor ? this.fornecedor.id: undefined)
                       .subscribe((result) => {
                              result.forEach(element => {
                              const agendamentoProdutoDto = new AgendamentoProdutoDto();      
                              agendamentoProdutoDto.agendamentoId = this.id != 0 ? this.id : -1;
                              agendamentoProdutoDto.produtoId = element.id;
                              agendamentoProdutoDto.produtoNome = element.nome;
                              agendamentoProdutoDto.quantidade = 0;
                              agendamentoProdutoDto.produtoQuantidadeEstoque = element.quantidadeEstoque;
                              agendamentoProdutoDto.confirmado = false;
                              produtosTemp.push(agendamentoProdutoDto);
                            });
                            if(this.lista && this.lista.length){
                              this.lista.forEach(agProd => {
                                const agendamentoProdutoCorresp = produtosTemp.find(p => p.produtoId == agProd.produtoId);
                                if(agendamentoProdutoCorresp){
                                  const idxProd = produtosTemp.indexOf(agendamentoProdutoCorresp);
                                  produtosTemp[idxProd].quantidade = agProd.quantidade;
                                  produtosTemp[idxProd].agendamentoId = agProd.agendamentoId != 0 ? agProd.agendamentoId : -1;

                                }

                              });
                            }
                            this.dialog.openDialogs.pop();                                                       
                            const dialogRef = this.dialog.open(ProductListDialogComponent, { 
                                                                  minWidth: '700px',
                                                                  minHeight: '400px',                                                                                                                                                                                                             
                                                                  data: 
                                                                  {
                                                                    fornecedor: this.fornecedor,
                                                                    produtos: produtosTemp
                                                                  }
                                                                });
                            dialogRef.afterClosed().subscribe((result : ProductList) => {
                              if(!this.lista)
                                this.lista = [];
                              const materiaisSelecionados =  result.produtos.filter(ag => ag.quantidade > 0 && ag.agendamentoId != 0);
                              materiaisSelecionados.forEach(element => {
                                 const materialLista = this.lista.find(l => l.produtoId == element.produtoId);
                                 if(materialLista){
                                   const idxMat = this.lista.indexOf(materialLista);
                                   if(element.quantidade > 0){
                                     element.agendamentoId = this.agendamento.id;
                                     this.lista[idxMat] = element;
                                   }
                                   else
                                     this.lista.splice(idxMat, 1);
                                 }
                                 else{
                                   element.agendamentoId = this.agendamento.id;
                                   this.lista.push(element);
                                 }
                              });
                            });
                          });
      
       
  }
  
}
