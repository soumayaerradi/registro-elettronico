import { Component, OnInit } from '@angular/core';
import { StudenteService } from '../studente.service';
import { Studente } from '../studente';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { FormStudenteComponent } from '../formStudente/formStudente.component';
import { DialogDeleteStudenteComponent } from '../dialogDeleteStudente/dialogDeleteStudente.component';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-studenti-list',
  templateUrl: './studenti-list.component.html',
  styleUrls: ['./studenti-list.component.css']
})
export class StudentiListComponent implements OnInit {

  studenti: Studente[] =[];
  studentiNuovo: Studente[]=[];
  studente : string;
  displayedColumns: string[] = ['cognome', 'nome', 'dataNascita', 'codiceFisc', 'azioni'];
  

  constructor(private _serviceStudenti: StudenteService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.visualizzaListaStudente();
  }

  visualizzaListaStudente() {
    this._serviceStudenti.getStudenti().subscribe(
      (listStudenti) => {
        listStudenti.sort((el1, el2) => el1.cognome.localeCompare(el2.cognome));
        this.studenti = listStudenti;
        this.studentiNuovo = listStudenti;
      }
    );
  }

  openDialogRemove(std: Studente){
    this.dialog.open(DialogDeleteStudenteComponent, {
      width: '50%',
      data: {
        dataKey: std
      }
    });
  }

  addStudente() {
    this.router.navigate(['/studenti/nuovo']);
  }
  
  applyFilter(studente:string) {
    this.studentiNuovo = [];
    for (let event of this.studenti) {
      if (event.cognome.toLowerCase().includes(studente.toLowerCase())) {
        this.studentiNuovo.push(event);
      }
    }
  }

  openDialog(): void {
    this.dialog.open(FormStudenteComponent, {
      width: '60%',
    });
  }

}
