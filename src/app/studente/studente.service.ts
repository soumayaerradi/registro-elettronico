import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Studente } from './studente';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class StudenteService {

  studenti: Observable<any>;

  constructor(public db: AngularFireDatabase) {
    this.studenti = db.list('studenti').valueChanges();
  }

  getStudenti(): Observable<Studente[]> {
    this.studenti = this.db.list('studenti').valueChanges();
    return this.studenti;
  }

  getStudente(codiceFisc: string): Observable<any> {
    return this.db.object(`studenti/${codiceFisc}`).valueChanges();
  }

  removeStudente(codiceStudente: string) {
    this.db.object(`/studenti/${codiceStudente}`).remove();
  }

  removeStoricoAPRevento(eventToDelete: CalendarEvent, listaStudenti: Studente[]) {
    listaStudenti.forEach((std: Studente) => {
      this.db.object(`studenti/${std.codiceFisc}/storicoAPR/${eventToDelete.id}`).remove();
    });
  }

  aggiornaStudente(std: Studente) {
    this.db.list(`studenti/`).update(std.codiceFisc, std);
  }

  aggiornaStoriciAPR(listaStudenti: Studente[], idEvento: number) {
    listaStudenti.forEach((std: Studente) => {
      this.db.object(`studenti/${std.codiceFisc}/storicoAPR/${idEvento}`).update(std.storicoAPR[idEvento]);
    });
  }

  modificaStoriciAPR(listaEventi: CalendarEvent[], listaStudenti: Studente[], olds: any[]) {

    listaEventi.forEach((evt) => {
      listaStudenti.forEach((std) => {
        if (std.storicoAPR) {
          if (std.storicoAPR[evt.id]) {
            if (olds[listaEventi.indexOf(evt)].title != evt.title || olds[listaEventi.indexOf(evt)].start.toString() != evt.start.toString() || olds[listaEventi.indexOf(evt)].end.toString() != evt.end.toString()) {
              std.storicoAPR[evt.id] = {
                id: evt.id,
                titolo: evt.title,
                presenza: 'presente',
                oreAss: 0
              }
              this.db.object(`studenti/${std.codiceFisc}/storicoAPR/${evt.id}`).update(std.storicoAPR[evt.id]);
            }
          }
        }
      });
    });
  }

}