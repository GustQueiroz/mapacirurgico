﻿import { Component, Injector, ViewChild, ElementRef, OnInit, AfterContentInit } from '@angular/core';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { AppComponentBase } from '@shared/app-component-base';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { LoginService } from './login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  animations: [accountModuleAnimation()]
})
export class LoginComponent extends AppComponentBase implements OnInit, AfterContentInit{
  submitting: boolean = false;
  @ViewChild('foco') inputFoco: ElementRef;
  
  constructor(
    injector: Injector,
    public loginService: LoginService,
    private _sessionService: AbpSessionService
    ) {
      super(injector);
    }
    
    ngAfterContentInit(): void{
      this.inputFoco.nativeElement.focus();
    }
    
    get multiTenancySideIsTeanant(): boolean {
      return this._sessionService.tenantId > 0;
    }
    
    get isSelfRegistrationAllowed(): boolean {
      if (!this._sessionService.tenantId) {
        return false;
      }
      
      return true;
    }
    
    login(): void {
      this.submitting = true;
      this.loginService.authenticate(() => (this.submitting = false));
    }
    ngOnInit(): void {
      
    }
  }
