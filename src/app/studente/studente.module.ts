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
import { StudenteModificaComponent } from './studente-modifica/studente-modifica.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule, MatFormFieldModule, MatListModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [
  { path: '', component: StudentiListComponent },
  { path: 'nuovo', component: FormStudenteComponent },
  { path: 'dettaglio/:codiceFisc', component: StudenteDettaglioComponent },
  { path: 'modifica/:codiceFisc', component: StudenteModificaComponent}
]

@NgModule({
  declarations: [
    StudentiListComponent,
    StudenteDettaglioComponent,
    FormStudenteComponent,
    StudenteModificaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatSidenavModule,
    MatDialogModule
  ]
})
export class StudenteModule { }

