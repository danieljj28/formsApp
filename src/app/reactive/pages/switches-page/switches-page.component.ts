import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styles: `.firsth5{
    margin-top: 3rem;
  }`
})

/*El objetivo de este componente es la utilización de inputs de tipo Switch.
  Como acceder a sus valores y el tipo de validators que se utiliza */
export class SwitchesPageComponent implements OnInit{

  public myForm: FormGroup = this.fb.group({
    gender : ['M', [ Validators.required ] ],
    wantNotifications: [true, [ Validators.requiredTrue ] ],
    termsAndConditions: [false, [ Validators.requiredTrue ] ]
  });

  public person = {
    gender: 'F',
    wantNotifications: false
  }

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) { }

  ngOnInit(): void {
    this.myForm.reset( this.person );
  }

  isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  onSave() {

    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;

    this.myForm.reset( {gender: this.person.gender} )

  }

}
