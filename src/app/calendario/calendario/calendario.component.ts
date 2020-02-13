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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { Router } from '@angular/router';
import { CalendarioService } from '../calendario.service';
import { start } from 'repl';
import { element } from 'protractor';
import { Title } from '@angular/platform-browser';
import { Professore } from 'src/app/professore/professore';
import { ProfessoreService } from 'src/app/professore/professore.service';

const colors= {
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

  eventiGiornalieri: CalendarEvent[] = [];



  constructor(
    private modal: NgbModal,
    private router: Router,
    private _calendarioService: CalendarioService,
    private _professoreService: ProfessoreService) { }

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
    console.log('Event clicked', event);
    this.router.navigate(['/calendario/' + this.events.indexOf(event)]);
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
    console.log(this.events);
    this.activeDayIsOpen = true;
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    let i: number;
    this.events.forEach((evt, index) => {
      if (evt.id == eventToDelete.id) {
        i = index;
        this.events.splice(i, 1);
      }
    });
    this.eventiGiornalieri.forEach((evt, index) => {
      if (evt.id == eventToDelete.id) {
        i = index;
        this.eventiGiornalieri.splice(i, 1);
      }
    });
    console.log("index: " + i);

    this._calendarioService.removeCalendario();
    this._calendarioService.aggiornaCalendario(this.events);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  genId(events: CalendarEvent[]): number {
    return events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;
  }

  salvaEvento() {
    let updateList = [];
    this.events.forEach((evt) => {
      updateList.push(
        {
          id: evt.id,
          title: evt.title,
          prof: evt.prof,
          start: evt.start.toString(),
          end: evt.end.toString(),
          color: evt.color,
          draggable: true,
          resizable: evt.resizable,
        }
      )
    });

    this._calendarioService.aggiornaCalendario(updateList);
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
          )
        });
        this.refresh.next();
      }
    )
  }

  getEventiGiornalieri() {
    let dataOggi: string = this.viewDate.toString();
    this.eventiGiornalieri = [];
    for (let evento of this.events){
      if(evento.start.toString().slice(0, 12) === dataOggi.slice(0, 12)){
        this.eventiGiornalieri.push(evento);
      }
      this.refresh.next();
    }
  }

  getProfessori() {
    this._professoreService.getProfessori().subscribe((listP: Professore[]) => {
      this.listaProf = listP;
      console.log(this.listaProf);
    });
  }

  assegnaMateria(prof: Professore, evento: CalendarEvent) {
    evento.title = prof.materia.titolo;
    evento.color = { primary: prof.materia.colore};
    this.events[this.events.indexOf(evento)] = evento;
  }

  ngOnInit() {
    this.getEventi();
    this.getProfessori();
    this.getEventiGiornalieri();
  }
}