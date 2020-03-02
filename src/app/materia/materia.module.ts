import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriaComponent } from './materia/materia.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogModule } from '@angular/material';
import { MateriaDettaglioComponent } from './materia-dettaglio/materia-dettaglio.component';
import {MatTableModule} from '@angular/material/table';
import { DialogRemoveMateriaComponent } from './dialogRemoveMateria/dialogRemoveMateria.component';

const routes: Routes = [
  { path: '', component: MateriaComponent },
  { path: ':titolo', component: MateriaDettaglioComponent}
]

@NgModule({
  declarations: [
    MateriaComponent,
    MateriaDettaglioComponent,
    DialogRemoveMateriaComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule
  ],
  entryComponents: [DialogRemoveMateriaComponent]
})
export class MateriaModule { }
