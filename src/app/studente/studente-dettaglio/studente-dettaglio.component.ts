import { Component, OnInit, Input } from '@angular/core';
import { Studente } from '../studente';
import { StudenteService } from '../studente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';
import { CalendarEvent } from 'angular-calendar';
import { MateriaService } from 'src/app/materia/materia.service';
import { Materia } from 'src/app/materia/materia';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-studente-dettaglio',
  templateUrl: './studente-dettaglio.component.html',
  styleUrls: ['./studente-dettaglio.component.css']
})
export class StudenteDettaglioComponent implements OnInit {
  studente: Studente;
  materie = {};
  oreTotali = 0;
  nuovaNota: FormGroup;
  modificaStudente: FormGroup;
  ritardiTotali: number = 0;
  millisecond: number = 3000;
  constructor(
    private _studenteService: StudenteService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _materieService: MateriaService,
    public router: Router,
    private _snackBar: MatSnackBar) {
    this.nuovaNota = this._formBuilder.group({
      nota: '',
    });
    this.modificaStudente = _formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      dataNascita: '',
      codiceFisc: ['', Validators.required],
      percorsoStudi: '',
      telefono: '',
      citta: '',
      sesso:''
    });
  }
  ngOnInit() {
    this.getStudente();
  }
  getStudente() {
    const codice: string = this._route.snapshot.paramMap.get('codiceFisc');
    this._studenteService.getStudente(codice).subscribe((std: Studente) => {
      this.studente = std;
      this.getRitardiFatti();
      this.formStudente();
      this.getMaterie();
    });
  }
  salvaSnackBar(){
    this._snackBar.open('Studente aggiornato', '', { duration: this.millisecond, panelClass: 'snackbar'});
  }
  formStudente() {
    this.modificaStudente = this._formBuilder.group({
      nome: this.studente.nome,
      cognome: this.studente.cognome,
      dataNascita: this.studente.dataNascita,
      codiceFisc: {value:this.studente.codiceFisc, disabled:true},
      percorsoStudi: this.studente.percorsoStudi,
      telefono: this.studente.telefono,
      citta: this.studente.citta,
      sesso: this.studente.sesso
    });
  }
  onSubmitStudente(aggiornaStudente: Studente) {
    aggiornaStudente.codiceFisc = this.studente.codiceFisc
    this._studenteService.aggiornaStudente(aggiornaStudente);
    this.salvaSnackBar();
  }


  goBack() {
    this._location.back();
  }

  get nome(): AbstractControl {
    return this.modificaStudente.get('nome');
  }

  get cognome(): AbstractControl {
    return this.modificaStudente.get('cognome');
  }

  get codiceFisc(): AbstractControl {
    return this.modificaStudente.get('codiceFisc');
  }

  get nota(): AbstractControl {
    return this.nuovaNota.get('nota');
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
      if (this.materie[titolo].toString().length > 2) {
        this.materie[titolo] = +this.materie[titolo].toFixed(1);
      }
      this.oreTotali += this.studente.storicoAPR[key].oreAss;
    }
    if (this.oreTotali.toString().length > 2) {
      this.oreTotali = +this.oreTotali.toFixed(1);
    }
  }

  eliminaNota(index: number) {
    this.studente.note.splice(index, 1);
    this._studenteService.aggiornaStudente(this.studente);
  }

  onSubmitNote(nuovaNota: any) {
    if (this.studente.note == undefined) {
      this.studente.note = [];
    }
    this.studente.note.push(nuovaNota['nota']);
    this._studenteService.aggiornaStudente(this.studente);
  }

  getRitardiFatti() {
    if (this.studente.storicoAPR) {
      for (var key in this.studente.storicoAPR) {
        if (this.studente.storicoAPR[key].presenza == 'Ritardo') {
          this.ritardiTotali += 1;
        }
      }
    }
  }

}