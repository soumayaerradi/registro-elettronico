import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Studente } from './studente';

@Injectable({
  providedIn: 'root'
})
export class StudenteService {

  studenti: Observable<any>;

  constructor(public db: AngularFireDatabase) {
    this.studenti = db.list('studenti').valueChanges();
  }

  getStudenti(): Observable<Studente[]> {
    return this.studenti;
  }

  getStudente(codiceFisc: string): Observable<any> {
    return this.db.object(`studenti/${codiceFisc}`).valueChanges();
  }

  removeStudente(codiceStudente: string){
    this.db.object(`/studenti/${codiceStudente}`).remove();
  }

  aggiornaStudente(std: Studente){
    this.db.list(`studenti/`).update(std.codiceFisc ,std);
  }

}
