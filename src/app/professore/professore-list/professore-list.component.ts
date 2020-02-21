import { Component, OnInit } from '@angular/core';
import { ProfessoreService } from '../professore.service';
import { Router } from '@angular/router';
import { Professore } from '../professore';
import {MatDialog} from '@angular/material/dialog';
import { FormProfessoreComponent } from '../formProfessore/formProfessore.component';

@Component({
  selector: 'app-professore-list',
  templateUrl: './professore-list.component.html',
  styleUrls: ['./professore-list.component.css']
})
export class ProfessoreListComponent implements OnInit {

  professori: Professore[];
  professoriNuovo: Professore[];
  prof:string;
  displayedColumns: string[] = ['cognome', 'nome', 'materia', 'azioni'];

  constructor(private _professoriService: ProfessoreService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.visualizzaListaProfessori()
  }

  visualizzaListaProfessori() {
    this._professoriService.getProfessori().subscribe(
      (listaProfessori) => {
        this.professori = listaProfessori;
        this.professoriNuovo = listaProfessori;
      }
    );
  }

  rimuoviProfessore(codiceProfessore: string){
    this._professoriService.removeProfessore(codiceProfessore)
  }

  createPage(){
    this.router.navigate(['professori/nuovo']);
  }

  applyFilter(prof:string) {
    this.professoriNuovo = [];
    for (let event of this.professori) {
      if (event.cognome.toLowerCase().includes(prof.toLowerCase())) {
        this.professoriNuovo.push(event);
      }
    }
  }

  openDialog(): void {
    this.dialog.open(FormProfessoreComponent, {
      width: '60%'
    });
  }
}
