import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Materia } from './materia';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  materie: Materia[] = [];

  constructor(public db: AngularFireDatabase) { }

  updateMaterie(materia: Materia) {
    this.db.list('materie').update(materia.titolo, materia);
  }

  removeMateria(Mat: string){
    this.db.list(`materie/${Mat}`).remove();
  }

  getMat() {
    return this.db.list('materie').valueChanges();
  }

  getMaterie() {
    return this.db.object('materie').valueChanges();
  }

  getMateria(nomeMat: string){
    return this.db.object(`materie/${nomeMat}`).valueChanges();
  }


}