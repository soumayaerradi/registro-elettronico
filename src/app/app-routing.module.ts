import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'studenti', loadChildren: './studente/studente.module#StudenteModule' },
  { path: 'professori', loadChildren: './professore/professore.module#ProfessoreModule' },
  { path: 'calendario', loadChildren: './calendario/calendario.module#CalendarioModule'},
  { path: 'materie', loadChildren: './materia/materia.module#MateriaModule'},
  { path: '', redirectTo: '/calendario', pathMatch: 'full'},
  { path: '**', redirectTo: '/calendario', pathMatch: 'full'},
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
