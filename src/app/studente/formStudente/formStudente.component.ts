import { Component, OnInit } from '@angular/core';
import { Studente } from '../studente';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudenteService } from '../studente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formStudente',
  templateUrl: './formStudente.component.html',
  styleUrls: ['./formStudente.component.css']
})
export class FormStudenteComponent implements OnInit {

  nuovoStudente: FormGroup;

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
    });
  }

  onSubmit(nuovoStudente: Studente){
    this._studentiService.aggiornaStudente(nuovoStudente);
    this.router.navigate(['/studenti'])
  }

  ngOnInit() {
  }

}
