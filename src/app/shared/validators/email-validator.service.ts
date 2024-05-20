import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    const email = control.value;
    console.log({ email })

    const httpCallObsersable = new Observable<ValidationErrors | null>( (suscriber) => {
      console.log({ email });

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


