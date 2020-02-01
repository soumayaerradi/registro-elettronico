import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessoreListComponent } from './professore-list/professore-list.component';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';

const routes: Routes = [
  { path: '', component: ProfessoreListComponent },
]

@NgModule({
  declarations: [
    ProfessoreListComponent
  ],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfessoreModule { }
