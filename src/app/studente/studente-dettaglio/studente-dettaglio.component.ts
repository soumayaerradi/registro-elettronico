import { Component, OnInit, Input } from '@angular/core';
import { Studente } from '../studente';
import { StudenteService } from '../studente.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-studente-dettaglio',
  templateUrl: './studente-dettaglio.component.html',
  styleUrls: ['./studente-dettaglio.component.css']
})
export class StudenteDettaglioComponent implements OnInit {

  studente: Studente;
  nuovaNota: FormGroup;

  constructor(
    private _studenteService: StudenteService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder) {

    this.nuovaNota = this._formBuilder.group({
      nota: '',
    });
  }

  ngOnInit() {
    this.getStudente();
  }

  getStudente() {
    const codice: string = this._route.snapshot.paramMap.get('codiceFisc');
    this._studenteService.getStudente(codice).subscribe((std: Studente) => {
      this.studente = std;
    });
  }

  eliminaNota(index: number) {
    this.studente.note.splice(index, 1);
    this._studenteService.aggiornaStudente(this.studente);
  }

  onSubmit(nuovaNota: any) {
    if (this.studente.note == undefined) {
      this.studente.note = [];
    }
    this.studente.note.push(nuovaNota['nota']);
    this._studenteService.aggiornaStudente(this.studente);
  }
}
