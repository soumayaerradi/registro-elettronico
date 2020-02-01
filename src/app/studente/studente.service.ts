import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Studente } from './studente';

@Injectable({
  providedIn: 'root'
})
export class StudenteService {

  studenti: Observable<any>;
  chiavissimeStronze: Observable<any>;

  constructor(public db: AngularFireDatabase) {
    this.studenti = db.list('studenti').valueChanges();
  }

  getStudenti(): Observable<Studente[]> {
    return (this.studenti);
  }

  removeStudente(codiceStudente: string){
    this.db.object(`/studenti/${codiceStudente}`).remove();
  }

  addStudente(newStudente: Studente) {
    this.db.list('studenti/').update(newStudente.codiceFisc, newStudente);
  }

  addNotaStudente(updatedStudente: Studente){
    this.db.list(`/studenti/${updatedStudente.codiceFisc}`).update('note', updatedStudente.note);
  }

}
