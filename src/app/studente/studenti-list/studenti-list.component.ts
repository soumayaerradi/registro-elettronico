import { Component, OnInit } from '@angular/core';
import { StudenteService } from '../studente.service';
import { FormBuilder } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Studente } from '../studente';
import { stringify } from 'querystring';

@Component({
  selector: 'app-studenti-list',
  templateUrl: './studenti-list.component.html',
  styleUrls: ['./studenti-list.component.css']
})
export class StudentiListComponent implements OnInit {

  nuovoStudente: Studente;
  studenti: Studente[];
  chiavi: any[];
  keyStudente: any[] = [];

  constructor(private _getStudenti: StudenteService) { }

  ngOnInit() {
    this.visualizzaListaStudente();
    this.visualizzaChiavi();
  }

  visualizzaChiavi() {
    console.log("FINALLY PORCAMADONNA")
    this._getStudenti.getChiavi().subscribe(
      (leMieKeys) => {
        this.chiavi = leMieKeys;
        this.chiavi.forEach((chiave) => {
          console.log(chiave.key);
          this.keyStudente.push(chiave.key);
        });
      }
    );
  }

  visualizzaListaStudente() {
    this._getStudenti.getStudenti().subscribe(
      (listStudenti) => {
        this.studenti = listStudenti;
        this.studenti.forEach((studente) => {
          //console.log(studente);
        });
      }
    );

  }

  getKeys() {
    console.log(this.keyStudente);
  }

  removeStudente() {
    this._getStudenti.removeStudente('COSICEFISCALE');
  }




  addStudente() {
    let newStudente: Studente ={
      "citta": "Erbusco",
      "codiceFisc": "NDRLCU97R30E333Y",
      "cognome": "Andreoli",
      "dataNascita": "30/10/1997",
      "nome": "Luca",
      "note": [],
      "percorsoStudi": "Coding",
      "storicoLezioni": {},
      "telefono": 3387417579
    };
    this._getStudenti.addStudente(newStudente);
  }
}
