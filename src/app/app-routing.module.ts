import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'studenti', loadChildren: './studente/studente.module#StudenteModule' },
  { path: 'professore', loadChildren: './professore/professore.module#ProfessoreModule' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
