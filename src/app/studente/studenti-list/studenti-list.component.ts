import { Component, OnInit } from '@angular/core';
import { StudenteService } from '../studente.service';
import { Studente } from '../studente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studenti-list',
  templateUrl: './studenti-list.component.html',
  styleUrls: ['./studenti-list.component.css']
})
export class StudentiListComponent implements OnInit {

  studenti: Studente[];
  displayedColumns: string[] = ['position', 'nome', 'cognome', 'sesso', 'dataNascita', 'codiceFisc', 'azioni'];
  opened: boolean;
  title = 'Registro Digitale';

  constructor(private _serviceStudenti: StudenteService,
    private router: Router) { }

  ngOnInit() {
    this.visualizzaListaStudente();
  }

  visualizzaListaStudente() {
    this._serviceStudenti.getStudenti().subscribe(
      (listStudenti) => {
        this.studenti = listStudenti;
        this.studenti.forEach((studente) => {
          console.log(studente);
        });
      }
    );
  }

  removeStudente(codiceStudente: string) {
    this._serviceStudenti.removeStudente(codiceStudente);
  }

  addStudente() {
    this.router.navigate(['/studenti/nuovo']);
  }

  selectStudente(selectedStudente: Studente){
    console.log(selectedStudente);
  }
}
