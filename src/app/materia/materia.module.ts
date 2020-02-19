import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriaComponent } from './materia/materia.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { MateriaDettaglioComponent } from './materia-dettaglio/materia-dettaglio.component';
import {MatTableModule} from '@angular/material/table';

const routes: Routes = [
  { path: '', component: MateriaComponent },
  { path: ':titolo', component: MateriaDettaglioComponent}
]

@NgModule({
  declarations: [MateriaComponent, MateriaDettaglioComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule
  ]
})
export class MateriaModule { }
