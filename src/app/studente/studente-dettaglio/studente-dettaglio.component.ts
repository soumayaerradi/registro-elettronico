import { Component, OnInit, Input } from '@angular/core';
import { Studente } from '../studente';

@Component({
  selector: 'app-studente-dettaglio',
  templateUrl: './studente-dettaglio.component.html',
  styleUrls: ['./studente-dettaglio.component.css']
})
export class StudenteDettaglioComponent implements OnInit {

  @Input() studente: Studente;

  constructor() { }

  ngOnInit() {
  }

}
