import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'login', component: LoginComponent },
  { path: 'studenti', loadChildren: './studente/studente.module#StudenteModule' },
  { path: 'professori', loadChildren: './professore/professore.module#ProfessoreModule' },
  { path: 'calendario', loadChildren: './calendario/calendario.module#CalendarioModule'},
  { path: 'materie', loadChildren: './materia/materia.module#MateriaModule'},
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
