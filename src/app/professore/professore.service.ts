import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Professore } from './professore';

@Injectable({
  providedIn: 'root'
})
export class ProfessoreService {

  professori: Observable<any>;

  constructor(public db: AngularFireDatabase) {
    this.professori = db.list('professori').valueChanges();
  }

  getProfessori(): Observable<Professore[]> {
    return (this.professori);
  }

  getProfessore(codiceFisc: string) {
    return this.db.object(`professori/${codiceFisc}`).valueChanges();
  }

  removeProfessore(codiceProfessore: string){
    this.db.object(`/professori/${codiceProfessore}`).remove();
  }

  aggiornaProfessore(newProfessore: Professore) {
    this.db.list('professori/').update(newProfessore.codiceFisc, newProfessore);
  }
}
