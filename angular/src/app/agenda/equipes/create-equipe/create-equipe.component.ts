import { Component, OnInit, ViewEncapsulation, AfterViewInit, ElementRef, ViewChild, Injector, AfterContentInit } from '@angular/core';
import { AppComponentBase } from 'shared/app-component-base';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipeMedicaDto, EquipeMedicaServiceProxy, MedicoDto, MedicoServiceProxy, PagedResultDtoOfMedicoDto, MedicoEquipeDto } from 'shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/internal/operators/finalize';
import { forkJoin, Observable } from 'rxjs';
import { flatMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-create-equipe',
  templateUrl: './create-equipe.component.html',
  styleUrls: ['./create-equipe.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateEquipeComponent extends AppComponentBase implements OnInit, AfterContentInit{

  @ViewChild('foco') inputFoco: ElementRef;
  objeto: EquipeMedicaDto = null;
  medicoLider: MedicoDto;
  anestesista: MedicoDto;
  auxiliar1: MedicoDto;
  auxiliar2: MedicoDto;
  medicos: MedicoDto[] = [];
  anestesistas: MedicoDto[] = [];
  medicosFilter: MedicoDto[] = [];
  medicoEquipe: MedicoEquipeDto[] = [];
  saving = false;
  id = 0;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    private _serviceProxy: EquipeMedicaServiceProxy,    
    private _medicoService: MedicoServiceProxy) {
    super(injector);
  }

  ngAfterContentInit(): void {    
    this.inputFoco.nativeElement.focus();
  }

  ngOnInit() {
    this.objeto = new EquipeMedicaDto();
    
    this._medicoService.getAll('', 0, 1000)
      .pipe(finalize(() => { 
        // tslint:disable-next-line:prefer-const
        let sub = this.route.params.subscribe(params => {
          this.id = +params['id']; // (+) converts string 'id' to a number
          if (this.id > 0) {
            this.operacao = 'Editar';
            this.getById(this.id);
          } else {
            this.objeto = new EquipeMedicaDto();
            this.objeto.id = 0;            
          }
        });
      }))
      .subscribe((result: PagedResultDtoOfMedicoDto) => {
        this.medicos = result.items;
        this.anestesistas = this.medicos.filter(m => m.anestesista);
        this.medicosFilter = this.medicos;
      });
  }

  save(): void {
        
    this.saving = true;
    this.objeto.medicoLiderId = this.medicoLider.id;
    const anestesistaEquipe = new MedicoEquipeDto();    
    const auxiliar1Equipe = new MedicoEquipeDto();    
    const auxiliar2Equipe = new MedicoEquipeDto();    
    anestesistaEquipe.equipeId = this.objeto.id;
    anestesistaEquipe.medicoId = this.anestesista.id;
    anestesistaEquipe.anestesista = true;

    auxiliar1Equipe.equipeId = this.objeto.id;
    auxiliar1Equipe.medicoId = this.auxiliar1.id;
    auxiliar1Equipe.anestesista = false;

    if(this.auxiliar2){
      auxiliar2Equipe.equipeId = this.objeto.id;
      auxiliar2Equipe.medicoId = this.auxiliar2.id;
      auxiliar2Equipe.anestesista = false;
      this.medicoEquipe.push(auxiliar2Equipe);
    }

    this.medicoEquipe.push(anestesistaEquipe);
    this.medicoEquipe.push(auxiliar1Equipe);
    
    this.objeto.medicosEquipes = this.medicoEquipe;

    if (this.id > 0) {
      this._serviceProxy.removeAllMedicoByEquipe(this.objeto.id)
      .pipe(finalize(() => { this.saving = false; }))
      .pipe(
        flatMap( () => {
          return this._serviceProxy.update(this.objeto)          
        })
      ).subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.router.navigate(['app/equipes']);
      });     
    } else {
      this._serviceProxy.create(this.objeto)
        .pipe(finalize(() => { this.saving = false; }))
        .subscribe(() => {          
          this.notify.info(this.l('SavedSuccessfully'));
          this.router.navigate(['app/equipes']);
        });
    }
  } 

  getById(id): void {    
    let liderDto: MedicoDto = null;
    this._serviceProxy.get(id)
    .pipe(finalize(() =>{}))
    .pipe(
      flatMap((equipe) => {          
          return this._medicoService.get(equipe.medicoLiderId)
        }
      ),
      flatMap((lider) => {
        liderDto = lider;
        return this._serviceProxy.getEquipesPorLider(lider.id)
      })
    ).subscribe((membros) =>{
          const equipeMedica = membros.find(e => e.id == id);
          this.objeto = equipeMedica;          
          this.medicoLider = this.medicos.find(m => m.id == liderDto.id);
          this.anestesista = new MedicoDto();
          const anestesistaEquipe = equipeMedica.medicosEquipes.find(med => med.anestesista == true);
          this.anestesista = this.medicos.find(m => m.id == anestesistaEquipe.medicoId);                  
          
          const auxiliares = equipeMedica.medicosEquipes.filter(med => med.anestesista == false).sort();
          if(auxiliares.length){            
            this.auxiliar1 = this.medicos.find(m => m.id == auxiliares[0].medicoId);            
          }
          if(auxiliares.length > 1){
            this.auxiliar2 = this.medicos.find(m => m.id == auxiliares[1].medicoId);
          }         
      }
    );    
  }

  cancel(): void {
    this.router.navigate(['app/equipes']);
  }
  
}

