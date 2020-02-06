import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-calendario-dettaglio',
  templateUrl: './calendario-dettaglio.component.html',
  styleUrls: ['./calendario-dettaglio.component.css']
})
export class CalendarioDettaglioComponent implements OnInit {
  @Input() event: CalendarEvent;

  constructor(private _location: Location, private _route: ActivatedRoute,) { }

  ngOnInit() {
    const id = + this._route.snapshot.paramMap.get('id');
  }


  goBack() {
    this._location.back();
  }

}
