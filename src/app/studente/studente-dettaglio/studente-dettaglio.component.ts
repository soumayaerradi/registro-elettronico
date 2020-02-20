import { Component, OnInit, Input } from '@angular/core';
import { Studente } from '../studente';
import { StudenteService } from '../studente.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { CalendarEvent } from 'angular-calendar';
import { MateriaService } from 'src/app/materia/materia.service';
import { Materia } from 'src/app/materia/materia';

@Component({
  selector: 'app-studente-dettaglio',
  templateUrl: './studente-dettaglio.component.html',
  styleUrls: ['./studente-dettaglio.component.css']
})
export class StudenteDettaglioComponent implements OnInit {

  studente: Studente;
  nuovaNota: FormGroup;
  materie = {};
  oreTotali = 0;

  constructor(
    private _studenteService: StudenteService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _materieService: MateriaService) {

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
      this.getMaterie();
    });
  }

  getMaterie() {
    this._materieService.getMaterie().subscribe((mat: Materia) => {
      for (var key in mat) {
        this.materie[key] = 0;
      }
      this.calcolaOreStorico();
    });
  }

  calcolaOreStorico() {
    for (var key in this.studente.storicoAPR) {
      let titolo = this.studente.storicoAPR[key].titolo;
      this.materie[titolo] += this.studente.storicoAPR[key].oreAss;
      this.oreTotali += this.studente.storicoAPR[key].oreAss;
    }
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

  goBack() {
    this._location.back();
  }
}