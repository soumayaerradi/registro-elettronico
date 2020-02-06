import { Component, OnInit } from '@angular/core';
import { Studente } from '../studente';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { StudenteService } from '../studente.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-formStudente',
  templateUrl: './formStudente.component.html',
  styleUrls: ['./formStudente.component.css']
})
export class FormStudenteComponent implements OnInit {

  nuovoStudente: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private _studentiService: StudenteService,
    private _router: Router,
    private _location: Location) { }

  onSubmit(nuovoStudente: Studente) {
    this._studentiService.aggiornaStudente(nuovoStudente);
    this._router.navigate(['/studenti'])
  }

  ngOnInit() {
    this.nuovoStudente = this._formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      dataNascita: '',
      codiceFisc: ['', Validators.required],
      percorsoStudi: '',
      telefono: '',
      citta: '',
    });
  }

  goBack() {
    this._location.back();
  }

  get nome(): AbstractControl {
    return this.nuovoStudente.get('nome');
  }

  get cognome(): AbstractControl {
    return this.nuovoStudente.get('cognome');
  }

  get codiceFisc(): AbstractControl {
    return this.nuovoStudente.get('codiceFisc');
  }


}
