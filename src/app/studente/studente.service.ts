import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Studente } from './studente';

@Injectable({
  providedIn: 'root'
})
export class StudenteService {

  pathStudenti: Observable<any[]>
  studenti: Observable<any>;
  chiavissimeStronze: Observable<any>;

  constructor(public db: AngularFireDatabase) {
    this.studenti = db.list('studenti').valueChanges();
    this.chiavissimeStronze = db.list('studenti').snapshotChanges();
  }

  getChiavi(): Observable<any[]>{
    console.log("porcodio non riesco a estrarre queste cazzo di chiavi: " + this.chiavissimeStronze);
    return (this.chiavissimeStronze);
  }

  getStudenti(): Observable<Studente[]> {
    console.log("getStudenti: " + this.studenti);
    return (this.studenti);
  }

  removeStudente(keyStud: string){
    this.db.object(`/studenti/${keyStud}`).remove();
  }

  addStudente(newStudente: Studente) {
    this.db.list('studenti/').update("bviyvuv", newStudente);
  }

}
