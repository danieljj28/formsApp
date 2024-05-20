import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() {}

  // Register-page
  public canBeStrader = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      };
    }

    return null;
  };

  // Register-page. Validación por formGroup que devuelve una función que devuelve un objeto tipo
  // ValidationErrors o null.
  public isFieldOneEqualFieldTwo( field1: string, field2: string ) {
    return ( formGroup: AbstractControl ): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if( fieldValue1 !== fieldValue2 ){
        formGroup.get(field2)?.setErrors( {notEqual: true} )
        return { notEqual:  true }
      }
      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }

  // Todos los componentes o pages
  public isValidField(myForm: FormGroup, field: string): boolean | null {
    return myForm.controls[field].errors && myForm.controls[field].touched;
  }

  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  // Muestra un mensaje u otro en el formControl name de basic-page
  getFieldError(myForm: FormGroup, field: string): string | null {
    if (!myForm.controls[field]) return null;

    const errors = myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      console.log(key)
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracters`;
      }
    }

    return null;
  }
}
