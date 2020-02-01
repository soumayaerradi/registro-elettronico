import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProfessoreService } from '../professore.service';
import { Router } from '@angular/router';
import { Professore } from '../professore';

@Component({
  selector: 'app-formProfessore',
  templateUrl: './formProfessore.component.html',
  styleUrls: ['./formProfessore.component.css']
})
export class FormProfessoreComponent implements OnInit {

  nuovoProfessore;

  constructor(private formBuilder: FormBuilder,
    private _professoreService: ProfessoreService,
    private router: Router) { 

    this.nuovoProfessore = this.formBuilder.group({
      nome: '',
      cognome: '',
      materia: '',
      sesso: '',
      telefono: '',
      codiceFisc: '',
    })
  }

  onSubmit(nuovoProfessore: Professore){
    this._professoreService.addProfessore(nuovoProfessore);
    this.router.navigate(['/professori'])
  }

  ngOnInit() {
  }

}
