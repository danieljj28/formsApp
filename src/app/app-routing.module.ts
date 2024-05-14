import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : 'auth',
    loadChildren: () => import ('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path : 'reactive',
    loadChildren: () => import ('./reactive/reactive.module').then( m => m.ReactiveModule)
  },
  {
    path: '**',
    redirectTo: 'reactive'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
