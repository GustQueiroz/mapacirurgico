import { Component } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`
})
export class RootComponent {
    constructor(private config: NgSelectConfig) {
        this.config.notFoundText = 'Nenhum registro encontrado';
        this.config.loadingText = 'Buscando...'
    }
}