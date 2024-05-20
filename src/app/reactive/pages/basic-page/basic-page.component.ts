import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';


@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styles: ``
})

/*El objetivo de esta clase es implementar lo básico de los formularios reactivos, es decir :
  Creación de un formGroup, el cual contiene controles.
  Cada control esta relacionado con un input dentro del form de la plantilla html
  Cada control también tiene una serie de validaciones obligatorias(Validators)
  En este clase también se comprueba si un campo es valido o no(isValidField) y entonces mostrar
  un mensaje u otro(getFieldError)*/
export class BasicPageComponent {

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(''),
  //   inStorage: new FormControl(''),
  // })

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ] ],
    price: [0, [ Validators.required, Validators.min(0) ] ],
    inStorage: [0, [ Validators.required, Validators.min(0) ] ]
  })

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  getFieldError( field: string ): string | null {
    return this.validatorsService.getFieldError( this.myForm, field );
  }

  onSubmit(): void {

    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset({price: 0, inStorage: 0});

  }
}
