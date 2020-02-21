import { Component, OnInit } from '@angular/core';
import { ProfessoreService } from '../professore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Professore } from '../professore';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';
import { MateriaService } from 'src/app/materia/materia.service';
import { Materia } from 'src/app/materia/materia';

@Component({
  selector: 'app-professore-dettaglio',
  templateUrl: './professore-dettaglio.component.html',
  styleUrls: ['./professore-dettaglio.component.css']
})
export class ProfessoreDettaglioComponent implements OnInit {

  professore: Professore;
  nuovaNota: FormGroup;
  modificaProfessore: FormGroup;
  listaMaterie: Materia[];

  constructor(
    private _professoreService: ProfessoreService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _location: Location,
    public router: Router,
    private _materiaService: MateriaService) {

    this.nuovaNota = this._formBuilder.group({
      nota: '',
    });

    this.modificaProfessore = this._formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      materia: '',
      sesso: '',
      telefono: '',
      codiceFisc: ['', Validators.required],
    })

  }

  ngOnInit() {
    this.getProfessore();
    this.getMaterie();
  }

  getProfessore() {
    const codice: string = this._route.snapshot.paramMap.get('codiceFisc');
    this._professoreService.getProfessore(codice).subscribe((profe: Professore) => {
      this.professore = profe;
      this.formProfessore();
    });
  }

  getMaterie() {
    this._materiaService.getMat().subscribe((listaM: Materia[]) => {
      this.listaMaterie = listaM;
    });
  }

  formProfessore() {
    this.modificaProfessore = this._formBuilder.group({
      nome: this.professore.nome,
      cognome: this.professore.cognome,
      materia: this.professore.materia,
      sesso: this.professore.sesso,
      telefono: this.professore.telefono,
      codiceFisc: this.professore.codiceFisc,
    })
  }

  onSubmitProfessore(aggiornaProfessore: Professore) {
    this._professoreService.aggiornaProfessore(aggiornaProfessore);
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

  eliminaNota(index: number) {
    this.professore.note.splice(index, 1);
    this._professoreService.aggiornaProfessore(this.professore);
  }

  onSubmitNota(nuovaNota: any) {
    if (this.professore.note == undefined) {
      this.professore.note = [];
    }
    this.professore.note.push(nuovaNota['nota']);
    this._professoreService.aggiornaProfessore(this.professore);
  }

  goBack() {
    this._location.back();
  }

}