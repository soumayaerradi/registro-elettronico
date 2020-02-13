import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Observable, of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  events: Observable<any>;
  constructor(public db: AngularFireDatabase) { }
  getEvents(): Observable<any> {
    return this.db.list('calendario/listaEventi').valueChanges();
  }
  getEventByIndex(index: string): Observable<any> {
    return this.db.object(`calendario/listaEventi/${index}`).valueChanges();
  }
  removeEvento(index: string) {
    this.db.object(`calendario/listaEventi/${index}`).remove();
  }
  salvaCalendario(listaEventi: any) {
    let updateList = [];
    listaEventi.forEach((evt) => {
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
      );
    });
    updateList.forEach((evt) => {
      this.db.object(`calendario/listaEventi/${evt.id}`).update(evt);
    });
  }
  aggiornaEvento(evento: CalendarEvent, index: string){
    this.db.object(`calendario/listaEventi/${index}`).update(evento);
  }
}
