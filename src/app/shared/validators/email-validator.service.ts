import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/*El objetivo de esta clase o servicio es el uso de validaciones asíncronas personalizadas.
  Para ello es obligatorio el uso de la interfaz AsyncValidator, la cual tiene un único método, llamado
  validate, que devuelve una promesa o un observable de tipo ValidationErrors o null.
  Se puede implementar dicha interfaz también en una función flecha. */
export class EmailValidatorService implements AsyncValidator {

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    const email = control.value;
    console.log({ email })

    const httpCallObsersable = new Observable<ValidationErrors | null>( (suscriber) => {

      if( email === 'fernando@google.com' ){
        suscriber.next({ emailTaken: true });
        suscriber.complete();
        return;
      }

      suscriber.next(null);
      suscriber.complete();
    }).pipe(
      delay( 2000 )
    )

    return httpCallObsersable;
  }

  // validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

  //   const email = control.value;
  //   console.log({ email })

  //   return of({
  //     emailTaken: true
  //   }).pipe(
  //     delay( 2000 )
  //   )
  // }

}


