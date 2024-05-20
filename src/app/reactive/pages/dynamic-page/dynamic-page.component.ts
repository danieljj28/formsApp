import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
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
