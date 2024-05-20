import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ValidatorsService } from '../../../shared/services/validators.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html'
})

/*El objetivo de esta clase son las validaciones personalizadas, y también las validaciones por FormGroup
  en vez de por FormControl.
  Hay dos tipos de validaciones en general, las síncronas y las asíncronas.

  Para realizar las validaciones personalizadas síncronas no es necesario ningun scope que implementa
  ninguna interfaz.

  Sin embargo para las validaciones asíncronas es necesario implementar la interfaz AsyncValidator, cuyo
  núcleo es el método validate, el cual no hace falta llamar, con llamar a la clase vale.

  Para llevar a cabo las validaciones por FormGroup, hay que pasar un objeto como segundo parametro, con la
  posibilidad de contener dos arrays, el primero para síncronas y el segundo para asíncronas.
  Esta validación llamara a un método que devuelve una función que devuelve un observable*/
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern) ]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern)],[ this.emailValidator ] ],
    username: ['', [ Validators.required, this.validatorsService.canBeStrader ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  },{
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  })

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidatorService
  ) { }

  isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
