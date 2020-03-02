import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { CalendarioService } from '../calendario.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { StudenteService } from 'src/app/studente/studente.service';
import { Studente } from 'src/app/studente/studente';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-calendario-dettaglio',
  templateUrl: './calendario-dettaglio.component.html',
  styleUrls: ['./calendario-dettaglio.component.css']
})
export class CalendarioDettaglioComponent implements OnInit {

  evento: CalendarEvent = { title: '', prof: '', start: new Date(), end: new Date(), note: [''] };
  nuovaNota: FormGroup;
  i: string;
  listaStudenti: Studente[];
  valueString: string[] = ['Presente', 'Assente', 'Ritardo'];
  control: boolean;
  viewDate: Date = new Date();
  millisecond = 2000;
  someOneRitardo: boolean = false;

  constructor(
    private _location: Location,
    private _route: ActivatedRoute,
    private _calendarioService: CalendarioService,
    private _formBuilder: FormBuilder,
    private _studenteService: StudenteService,
    private _snackBar: MatSnackBar) {

    this.nuovaNota = this._formBuilder.group({
      nota: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getEvento();
  }

  getEvento() {
    this.i = this._route.snapshot.paramMap.get('index');
    this._calendarioService.getEventByIndex(this.i).subscribe((evt: any) => {
      this.evento = evt;
      this.getStudenti();
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

  getStudenti() {
    this._studenteService.getStudenti().subscribe((listaStd: Studente[]) => {
      this.listaStudenti = listaStd;
      this.controllo();
    });
  }

  controllo() {
    this.listaStudenti.forEach((std: Studente) => {
      if (std.storicoAPR) {
        if (std.storicoAPR[this.evento.id]) {
          this.control = true;
        } else {
          let index = this.listaStudenti.indexOf(std);
          std.storicoAPR[this.evento.id] = {
            id: this.evento.id,
            titolo: this.evento.title,
            presenza: 'Presente',
            oreAss: 0,
          };
          this.listaStudenti[index].storicoAPR[this.evento.id] = std.storicoAPR[this.evento.id];
          this.control = false;
        }
      } else {
        let index = this.listaStudenti.indexOf(std);
        std.storicoAPR = {};
        std.storicoAPR[this.evento.id] = {
          id: this.evento.id,
          titolo: this.evento.title,
          presenza: 'Presente',
          oreAss: 0,
        };
        this.listaStudenti[index].storicoAPR[this.evento.id] = std.storicoAPR[this.evento.id];
        this.control = false;
      }
    });
  }

  controlloRitardo(std: Studente) {
    if (std.storicoAPR[this.evento.id].presenza == 'Ritardo') {
      return true;
    } else {
      return false;
    }
  }

  checkRitardo() {
    let ritardo = false;
    this.listaStudenti.forEach((std: Studente) => {
      if (std.storicoAPR[this.evento.id].presenza == 'Ritardo') {
        console.log("checkRitardo: true");
        ritardo = true;
      }
    });
    if (!ritardo) {
      this.someOneRitardo = false;
    } else {
      this.someOneRitardo = true;
    }
  }

  selezioneAPR(std: Studente, str: string) {
    std.storicoAPR[this.evento.id].presenza = str;
    if (str == 'Presente') {
      std.storicoAPR[this.evento.id].oreAss = 0;
    } else if (str == 'Assente') {
      let start = new Date(this.evento.start);
      let end = new Date(this.evento.end);
      std.storicoAPR[this.evento.id].oreAss = Math.abs(start.getTime() - end.getTime()) / 36e5;
    } else {
      std.storicoAPR[this.evento.id].oraEntrata = new Date(this.evento.start);
    }
    this.checkRitardo();
  }

  calcolaOreRitardo(std: Studente) {
    let start1 = new Date(this.evento.start);
    let start2 = std.storicoAPR[this.evento.id].oraEntrata;
    let end = new Date(this.evento.end);
    let totaleOreLezione = Math.abs(start1.getTime() - end.getTime()) / 36e5;
    let parzialeOreFatte = Math.abs(start2.getTime() - end.getTime()) / 36e5;
    std.storicoAPR[this.evento.id].oreAss = totaleOreLezione - parzialeOreFatte;
  }

  dateController(std: Studente) {
    if (std.storicoAPR[this.evento.id].oraEntrata > new Date(this.evento.end)) {
      std.storicoAPR[this.evento.id].oraEntrata = new Date(this.evento.end);
      this._snackBar.open('Attenzione alle date!', '', { duration: this.millisecond, panelClass: 'snackbar' });
    } else if (std.storicoAPR[this.evento.id].oraEntrata < new Date(this.evento.start)) {
      std.storicoAPR[this.evento.id].oraEntrata = new Date(this.evento.start);
      this._snackBar.open('Attenzione alle date!', '', { duration: this.millisecond, panelClass: 'snackbar' });
    }
  }

  salvaSuDB() {
    this._studenteService.aggiornaStoriciAPR(this.listaStudenti, this.evento.id);
  }

  get nota(): AbstractControl {
    return this.nuovaNota.get('nota');
  }

}