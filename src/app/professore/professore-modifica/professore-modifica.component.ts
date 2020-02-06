import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ProfessoreService } from '../professore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Professore } from '../professore';
import { Location } from '@angular/common';

@Component({
  selector: 'app-professore-modifica',
  templateUrl: './professore-modifica.component.html',
  styleUrls: ['./professore-modifica.component.css']
})
export class ProfessoreModificaComponent implements OnInit {

  professore: Professore;
  modificaProfessore: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private _professoreService: ProfessoreService,
    private _route: ActivatedRoute,
    private router: Router,
    private _location: Location) {

    this.modificaProfessore = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      materia: '',
      sesso: '',
      telefono: '',
      codiceFisc: ['', Validators.required],
    })
  }

  getProfessore() {
    const codice: string = this._route.snapshot.paramMap.get('codiceFisc');
    this._professoreService.getProfessore(codice).subscribe((profe: Professore) => {
      this.professore = profe;
      this.formProfessore();
    });
  }

  ngOnInit() {
    this.getProfessore()
  }

  formProfessore(){

    this.modificaProfessore = this.formBuilder.group({
      nome: this.professore.nome,
      cognome: this.professore.cognome,
      materia: this.professore.materia,
      sesso: this.professore.sesso,
      telefono: this.professore.telefono,
      codiceFisc: this.professore.codiceFisc,
    })
  }

  onSubmit(aggiornaProfessore: Professore) {
    this._professoreService.aggiornaProfessore(aggiornaProfessore);
    this.router.navigate(['/professori']);
  }

  goBack() {
    this._location.back();
  }

  get nome(): AbstractControl {
    return this.modificaProfessore.get('nome');
  }

  get cognome(): AbstractControl {
    return this.modificaProfessore.get('cognome');
  }

  get codiceFisc(): AbstractControl {
    return this.modificaProfessore.get('codiceFisc');
  }

}
