import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../../environments/environment';
import { StudentiListComponent } from './studenti-list/studenti-list.component';
import { StudenteDettaglioComponent } from './studente-dettaglio/studente-dettaglio.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: StudentiListComponent },
]

@NgModule({
  declarations: [
    StudentiListComponent,
    StudenteDettaglioComponent,
  ],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forChild(routes)
  ]
})
export class StudenteModule { }

