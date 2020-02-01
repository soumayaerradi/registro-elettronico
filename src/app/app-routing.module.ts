import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'studenti', loadChildren: './studente/studente.module#StudenteModule' },
  { path: 'professori', loadChildren: './professore/professore.module#ProfessoreModule' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
