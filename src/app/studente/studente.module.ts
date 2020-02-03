import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../../environments/environment';
import { StudentiListComponent } from './studenti-list/studenti-list.component';
import { StudenteDettaglioComponent } from './studente-dettaglio/studente-dettaglio.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormStudenteComponent } from './formStudente/formStudente.component';

const routes: Routes = [
  { path: '', component: StudentiListComponent },
  { path: 'nuovo', component: FormStudenteComponent },
  { path: 'dettaglio/:codiceFisc', component: StudenteDettaglioComponent },
]

@NgModule({
  declarations: [
    StudentiListComponent,
    StudenteDettaglioComponent,
    FormStudenteComponent,
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
export class StudenteModule { }

