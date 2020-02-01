import { Component, OnInit } from '@angular/core';
import { Studente } from '../studente';
import { FormBuilder } from '@angular/forms';
import { StudenteService } from '../studente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formStudente',
  templateUrl: './formStudente.component.html',
  styleUrls: ['./formStudente.component.css']
})
export class FormStudenteComponent implements OnInit {

  nuovoStudente;

  constructor(private formBuilder: FormBuilder,
    private _studentiService: StudenteService,
    private router: Router) { 

    this.nuovoStudente = this.formBuilder.group({
      nome: '',
      cognome: '',
      dataNascita: '',
      codiceFisc: '',
      percorsoStudi: '',
      telefono: '',
      citta: '',
    })
  }

  onSubmit(nuovoStudente: Studente){
    this._studentiService.addStudente(nuovoStudente);
    this.router.navigate(['/studenti'])
  }

  ngOnInit() {
  }

}
