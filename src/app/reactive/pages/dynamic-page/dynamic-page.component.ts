import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: `.firsth5{
    margin-top: 3rem;
  }`
})

/*El objetivo de este componente es desarrollar un Formulario que utilice el formArray.
  El nombre de dynamics hace referiencia a que un formArray puede aumentar o reducir el numero
  de controles que contiene.
  Es por eso que aqui hemos realizado funciones que añaden y eliminan controles del formArray. */
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ] ],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  })

  public newFavorite: FormControl = new FormControl('',[ Validators.required ]);

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  get favoriteGamesControl() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.myForm, field )
  }

  isValidFieldInArray( formArray: FormArray, index: number ): boolean | null{
    return this.validatorsService.isValidFieldInArray( formArray, index )
  }

  getFieldError( field: string ): string | null{
    return this.validatorsService.getFieldError( this.myForm, field )
  }

  onAddToFavorites(): void {
    console.log(this.favoriteGamesControl.controls);
    if( this.newFavorite.invalid ) return;

    this.favoriteGamesControl.push(
      this.fb.control( this.newFavorite.value, Validators.required)
    );

    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number): void{
    this.favoriteGamesControl.removeAt(index);
  }

  onSubmit(): void {

    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }
}
