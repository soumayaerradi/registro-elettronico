import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import {FormsModule} from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import { CalendarioDettaglioComponent } from './calendario-dettaglio/calendario-dettaglio.component';



const routes: Routes = [
  { path: '', component: CalendarioComponent },
  { path: ':id', component: CalendarioDettaglioComponent}
  ];

@NgModule({
  imports: [
    CommonModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    FormsModule,
    RouterModule.forChild(routes),
    MatChipsModule,
    MatButtonModule,
  ],
  declarations: [CalendarioComponent, CalendarioDettaglioComponent]
})
export class CalendarioModule { }
