import { Component, OnInit } from '@angular/core';
import { Studente } from '../studente';
import { StudenteService } from '../studente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-studente-modifica',
  templateUrl: './studente-modifica.component.html',
  styleUrls: ['./studente-modifica.component.css']
})
export class StudenteModificaComponent implements OnInit {

  studente: Studente;
  modificaStudente: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private _studenteService: StudenteService,
    private _route: ActivatedRoute,
    private router: Router,
    private _location: Location) {

    this.modificaStudente = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      dataNascita: '',
      codiceFisc: ['', Validators.required],
      percorsoStudi: '',
      telefono: '',
      citta: '',
    });
  }

  ngOnInit() {
    this.getStudente();
  }

  getStudente() {
    const codice: string = this._route.snapshot.paramMap.get('codiceFisc');
    this._studenteService.getStudente(codice).subscribe((std: Studente) => {
      this.studente = std;
      this.formStudente()
    });
  }

  formStudente() {
    this.modificaStudente = this.formBuilder.group({
      nome: this.studente.nome,
      cognome: this.studente.cognome,
      dataNascita: this.studente.dataNascita,
      codiceFisc: this.studente.codiceFisc,
      percorsoStudi: this.studente.percorsoStudi,
      telefono: this.studente.telefono,
      citta: this.studente.citta,
    });
  }

  onSubmit(aggiornaStudente: Studente) {
    this._studenteService.aggiornaStudente(aggiornaStudente);
    this.router.navigate(['/studenti']);
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

}
