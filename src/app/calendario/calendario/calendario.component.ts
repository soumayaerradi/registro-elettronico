import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
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
import { start } from 'repl';
import { element } from 'protractor';
import { CalendarioService } from '../calendario.service';

const colors: any = {
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
export class CalendarioComponent {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  constructor(private modal: NgbModal, 
              private router: Router,
              private _calendarioService: CalendarioService) { }

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
    this.router.navigate(['/calendario/' + event.id]);
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
        prof : '',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.violaDigital,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
    console.log(this.events)
  }

  salvaEvento() {
    let updateList: any[] = [];
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

  deleteEvent(eventToDelete: CalendarEvent) {
    let i: any;
    this.events.forEach((evt, index) => {
      if (evt.id == eventToDelete.id) {
        i = index;
      }
    });
    console.log("index: " + i);
    this.events.splice(i, 1);

    this._calendarioService.removeCalendario();
    this._calendarioService.aggiornaCalendario(this.events);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  genId(events: CalendarEvent[]): number {
    return events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;
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
            }
          )
        });
        this.refresh.next();
      }
    )
  }

  ngOnInit() {
    this.getEventi();
    console.log(this.events);
  }

}
