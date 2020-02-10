import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { CalendarioService } from '../calendario.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-calendario-dettaglio',
  templateUrl: './calendario-dettaglio.component.html',
  styleUrls: ['./calendario-dettaglio.component.css']
})
export class CalendarioDettaglioComponent implements OnInit {

  evento: CalendarEvent = { title: '', prof: '', start: new Date(), end: new Date(), note: ['']};
  nuovaNota: FormGroup;
  i: string;

  constructor(
    private _location: Location,
    private _route: ActivatedRoute,
    private _calendarioService: CalendarioService,
    private _formBuilder: FormBuilder) {

    this.nuovaNota = this._formBuilder.group({
      nota: '',
    });
  }

  ngOnInit() {
    this.getEvento();
  }

  getEvento() {
    this.i = this._route.snapshot.paramMap.get('index');
    this._calendarioService.getEventByIndex(this.i).subscribe((evt: any) => {
      console.log("evt: " + evt);
      this.evento = evt;
    });
  }

  onSubmit(nuovaNota: any) {
    if (this.evento.note == undefined) {
      this.evento.note = [];
    }
    this.evento.note.push(nuovaNota['nota']);
    this._calendarioService.aggiornaEvento(this.evento, this.i);
  }

  removeNota(index: number) {
    this.evento.note.splice(index, 1);
    this._calendarioService.aggiornaEvento(this.evento, this.i);
  }

  goBack() {
    this._location.back();
  }

}