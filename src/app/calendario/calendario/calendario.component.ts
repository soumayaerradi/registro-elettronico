import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { Router } from '@angular/router';
import { CalendarioService } from '../calendario.service';
import { Professore } from 'src/app/professore/professore';
import { ProfessoreService } from 'src/app/professore/professore.service';
import { StudenteService } from 'src/app/studente/studente.service';
import { Studente } from 'src/app/studente/studente';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ExcelService } from '../excel.service';
import { DialogRemoveEventComponent } from '../dialogRemoveEvent/dialogRemoveEvent.component';

const colors = {
  red: {
    primary: '#ad2121'
  },
  blue: {
    primary: '#1e90ff'
  },
  yellow: {
    primary: '#e3bc08'
  },
  violaDigital: {
    primary: '#6d23ce'
  }
};

@Component({
  selector: 'app-calendario',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})

export class CalendarioComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  eventiMeseCorrente: CalendarEvent[] = []
  activeDayIsOpen: boolean = false;
  listaProf: Professore[];
  listaStudenti: Studente[];
  eventiNonModificati: any[] = [];
  millisecond = 2000;

  constructor(
    private router: Router,
    private _calendarioService: CalendarioService,
    private _professoreService: ProfessoreService,
    private _studenteService: StudenteService,
    private _snackBar: MatSnackBar,
    private _excelService: ExcelService,
    public dialog: MatDialog) { }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    this.router.navigate([`calendario/${event.id}`]);
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
  }

  genMoP(event: CalendarEvent): string {
    if (event.start.getHours() < 12) {
      return event.orario = 'Mattina';
    } else {
      return event.orario = 'Pomeriggio';
    }
  }

  eventiQuestoMese() {
    this.eventiMeseCorrente = [];
    this.events.forEach(element => {
      if (isSameMonth(element.start, this.viewDate)) {
        this.eventiMeseCorrente = [
          ...this.eventiMeseCorrente,
          {
            start: element.start,
            orario: this.genMoP(element),
            title: element.title,
            prof: element.prof,
          }];
      }
    });
  }

  addEvent(): void {
    let newId = this.genId(this.events);
    this.events = [
      ...this.events,
      {
        id: newId,
        title: 'Nuovo evento',
        prof: '',
        start: startOfDay(this.viewDate),
        end: endOfDay(this.viewDate),
        color: colors.violaDigital,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        note: [''],
      }
    ];
    this.activeDayIsOpen = true;
    this.salvaEventi();
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  genId(events: CalendarEvent[]): number {
    return events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;
  }

  salvaEventi() {
    this._calendarioService.salvaCalendario(this.events);
    this._studenteService.modificaStoriciAPR(this.events, this.listaStudenti, this.eventiNonModificati);
  }

  getEventi() {
    this._calendarioService.getEvents().subscribe(
      (events) => {
        this.events = [];
        events.forEach(evt => {
          this.events.push(
            {
              id: evt.id,
              title: evt.title,
              prof: evt.prof,
              start: new Date(evt.start),
              end: new Date(evt.end),
              color: evt.color,
              draggable: true,
              resizable: evt.resizable,
              note: [],
            }
          );
          this.eventiNonModificati.push({
            title: evt.title,
            start: new Date(evt.start),
            end: new Date(evt.end)
          });
        });
        this.refresh.next();
      }
    );
  }

  getProfessori() {
    this._professoreService.getProfessori().subscribe((listP: Professore[]) => {
      this.listaProf = listP;
    });
  }

  assegnaMateria(prof: Professore, evento: CalendarEvent) {
    evento.title = prof.materia.titolo;
    evento.color = { primary: prof.materia.colore };
    this.events[this.events.indexOf(evento)] = evento;
  }

  ngOnInit() {
    this.getEventi();
    this.getProfessori();
    this.getStudenti();
  }

  getStudenti() {
    this._studenteService.getStudenti().subscribe((listaStudenti: Studente[]) => {
      this.listaStudenti = listaStudenti;
    });
  }

  dateController(event: CalendarEvent) {
    if (event.end < event.start) {
      event.end = new Date(event.start);
      this._snackBar.open('Attenzione alle date!', '', { duration: this.millisecond, panelClass: 'snackbar' });
    }
  }

  exportCalendar(): void {
    this._excelService.exportAsExcelFile(this.eventiMeseCorrente, "Calendario_" + this.viewDate.toString().slice(4, 7));
  }

  salvaSnackBar(){
    this._snackBar.open('Eventi aggiornati', '', { duration: this.millisecond, panelClass: 'snackbar'})
  }

  openDialogRemove(event: CalendarEvent){
    this.dialog.open(DialogRemoveEventComponent, {
      width: '50%',
      data: {
        evento : event
      }
    });
  }

}