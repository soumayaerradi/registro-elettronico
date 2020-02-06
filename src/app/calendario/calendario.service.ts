import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  removeEvento(index: number) {
    this.db.object(`calendario/listaEventi/${index}`).remove();
  }

  removeCalendario(){
    this.db.list('calendario/listaEventi').remove();
  }

  aggiornaCalendario(listaEventi: any){
    this.db.list(`calendario/`).update('listaEventi', listaEventi);
  }
}