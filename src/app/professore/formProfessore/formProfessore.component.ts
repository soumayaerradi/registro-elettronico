import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ProfessoreService } from '../professore.service';
import { Router } from '@angular/router';
import { Professore } from '../professore';
import { Location } from '@angular/common';

@Component({
  selector: 'app-formProfessore',
  templateUrl: './formProfessore.component.html',
  styleUrls: ['./formProfessore.component.css']
})
export class FormProfessoreComponent implements OnInit {

  nuovoProfessore: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private _professoreService: ProfessoreService,
    private router: Router,
    private _location: Location) {

    this.nuovoProfessore = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      materia: '',
      sesso: '',
      telefono: '',
      codiceFisc: ['', Validators.required],
    })
  }

  onSubmit(nuovoProfessore: Professore){
    this._professoreService.aggiornaProfessore(nuovoProfessore);
    this.router.navigate(['/professori'])
  }

  ngOnInit() {
  }

  goBack() {
    this._location.back();
  }

  get nome(): AbstractControl {
    return this.nuovoProfessore.get('nome');
  }

  get cognome(): AbstractControl {
    return this.nuovoProfessore.get('cognome');
  }

  get codiceFisc(): AbstractControl {
    return this.nuovoProfessore.get('codiceFisc');
  }

}
