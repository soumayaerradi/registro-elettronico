import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { CalendarioDettaglioComponent } from './calendario-dettaglio/calendario-dettaglio.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule, MatListModule } from '@angular/material';



const routes: Routes = [
  { path: '', component: CalendarioComponent },
  { path: ':index', component: CalendarioDettaglioComponent },
];

@NgModule({
  imports: [
    MatSelectModule,
    CommonModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatChipsModule,
    MatButtonModule,
    MatInputModule,
    MatListModule
  ],
  declarations: [CalendarioComponent, CalendarioDettaglioComponent]
})
export class CalendarioModule { }