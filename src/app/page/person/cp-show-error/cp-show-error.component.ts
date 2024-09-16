import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cp-show-error',
  standalone: true,
  imports: [],
  templateUrl: './cp-show-error.component.html',
  styleUrl: './cp-show-error.component.scss'
})
export class CpShowErrorComponent {
  @Input() fieldName: string='';
  @Input() fieldErrors: any;

  /*get errorMessage(): string | null {
    // Aquí puedes agregar lógica más compleja para manejar diferentes tipos de errores
    return ((this.fieldErrors.touched || this.fieldErrors.dirty) && this.fieldErrors.errors &&this.fieldErrors?.hasError(this.fieldName)) ? this.fieldErrors[this.fieldName] : null;
  }*/

  get errorMessage(): boolean | null {
    // Aquí puedes agregar lógica más compleja para manejar diferentes tipos de errores
    return ((this.fieldErrors.touched || this.fieldErrors.dirty) && this.fieldErrors.errors &&this.fieldErrors?.hasError(this.fieldName));
  }
  get errorPatron():boolean{
    if(this.fieldErrors?.hasError('pattern')){
      return true
    }
    return false;
  }
}
