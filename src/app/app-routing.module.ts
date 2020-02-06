import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'studenti', loadChildren: './studente/studente.module#StudenteModule' },
  { path: 'professori', loadChildren: './professore/professore.module#ProfessoreModule' },
  { path: 'calendario', loadChildren: './calendario/calendario.module#CalendarioModule'},
  { path: '**', redirectTo:'home'},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
