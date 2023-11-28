import { Pipe, PipeTransform, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Pipe(
  { 
    name: 'except',
    pure: true
  }
)
export class ExceptPipe extends AppComponentBase implements PipeTransform {

  constructor(injector: Injector) {
    super(injector);
  }

  transform(data: any[], arr: any[]) {  // replace the any with your interface for data.    
    if(data && arr){
      return data.filter(dado => arr.indexOf(dado) < 0); 
    }
    return;
  }
}