import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Professore } from './professore';

@Injectable({
  providedIn: 'root'
})
export class ProfessoreService {

  professori: Observable<any>;
  chiavissimeStronze: Observable<any>;

  constructor(public db: AngularFireDatabase) {
    this.professori = db.list('professori').valueChanges();
  }

  getStudenti(): Observable<Professore[]> {
    return (this.professori);
  }

  removeProfessore(codiceStudente: string){
    this.db.object(`/professori/${codiceStudente}`).remove();
  }

  addProfessore(newProfessore: Professore) {
    this.db.list('professori/').update(newProfessore.codiceFisc, newProfessore);
  }
}
