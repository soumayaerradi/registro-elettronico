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
import { MatSnackBar } from '@angular/material';

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
    private _snackBar: MatSnackBar) { }

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

  deleteEvent(eventToDelete: CalendarEvent) {
    this._studenteService.removeStoricoAPRevento(eventToDelete, this.listaStudenti);
    this._calendarioService.removeEvento(eventToDelete.id.toString());
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
      this._snackBar.open('OCCHIO ALLE DATE!', 'OK', { duration: this.millisecond });
    }
  }

}