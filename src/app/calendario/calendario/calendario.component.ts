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
import {MatSnackBar} from '@angular/material/snack-bar';
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
  constructor(
    private router: Router,
    private _calendarioService: CalendarioService,
    private _professoreService: ProfessoreService,
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
        });
        this.refresh.next();
      }
    );
  }
  getProfessori() {
    this._professoreService.getProfessori().subscribe((listP: Professore[]) => {
      this.listaProf = listP;
      console.log(this.listaProf);
    });
  }
  assegnaMateria(prof: Professore, evento: CalendarEvent) {
    evento.title = prof.materia.titolo;
    evento.color = { primary: prof.materia.colore };
    this.events[this.events.indexOf(evento)] = evento;
  }

  dateController(event, action) {
    if (event.end < event.start) {
      event.end = event.start;
      this._snackBar.open("LA DATA DI FINE NON PUO' PRECEDERE QUELLA DI INIZIO!",action, {duration:4000});
    }
  }

  ngOnInit() {
    this.getEventi();
    this.getProfessori();
  }
}