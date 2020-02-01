import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessoreListComponent } from './professore-list/professore-list.component';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormProfessoreComponent } from './formProfessore/formProfessore.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ProfessoreListComponent },
  { path: 'nuovo', component: FormProfessoreComponent }
]

@NgModule({
  declarations: [
    ProfessoreListComponent,
    FormProfessoreComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfessoreModule { }
