import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriaComponent } from './materia/materia.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

const routes: Routes = [
  { path: '', component: MateriaComponent },
]

@NgModule({
  declarations: [MateriaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MateriaModule { }
