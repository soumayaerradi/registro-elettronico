import { Component, OnInit } from '@angular/core';
import { StudenteService } from '../studente.service';
import { Studente } from '../studente';
import { Router } from '@angular/router';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormStudenteComponent } from '../formStudente/formStudente.component';

@Component({
  selector: 'app-studenti-list',
  templateUrl: './studenti-list.component.html',
  styleUrls: ['./studenti-list.component.css']
})
export class StudentiListComponent implements OnInit {

  studenti: Studente[] =[];
  studentiNuovo: Studente[]=[];
  studente : string;
  displayedColumns: string[] = ['nome', 'cognome', 'dataNascita', 'codiceFisc', 'azioni'];
  

  constructor(private _serviceStudenti: StudenteService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.visualizzaListaStudente();
  }

  visualizzaListaStudente() {
    this._serviceStudenti.getStudenti().subscribe(
      (listStudenti) => {
        this.studenti = listStudenti;
        this.studentiNuovo = listStudenti;
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
  
  applyFilter(studente:string) {
    this.studentiNuovo = [];
    for (let event of this.studenti) {
      if (event.cognome.toLowerCase().includes(studente.toLowerCase())) {
        this.studentiNuovo.push(event);
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormStudenteComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
