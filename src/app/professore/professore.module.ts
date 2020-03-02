import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessoreListComponent } from './professore-list/professore-list.component';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormProfessoreComponent } from './formProfessore/formProfessore.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfessoreDettaglioComponent } from './professore-dettaglio/professore-dettaglio.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule, MatDialogModule, MatFormFieldModule, MatTooltipModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { DialogRemoveProfessoreComponent } from './dialogRemoveProfessore/dialogRemoveProfessore.component';

const routes: Routes = [
  { path: '', component: ProfessoreListComponent },
  { path: 'nuovo', component: FormProfessoreComponent },
  { path: 'dettaglio/:codiceFisc', component: ProfessoreDettaglioComponent }
]

@NgModule({
  declarations: [
    ProfessoreListComponent,
    ProfessoreDettaglioComponent,
    FormProfessoreComponent,
    DialogRemoveProfessoreComponent
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
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTooltipModule
  ],
  entryComponents: [DialogRemoveProfessoreComponent]
})
export class ProfessoreModule { }
