import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriaService } from '../materia.service';
import { Materia } from '../materia';
import { CalendarioService } from 'src/app/calendario/calendario.service';
import { CalendarEvent } from 'angular-calendar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-materia-dettaglio',
  templateUrl: './materia-dettaglio.component.html',
  styleUrls: ['./materia-dettaglio.component.css']
})
export class MateriaDettaglioComponent implements OnInit {

  materia: Materia = {
    titolo: "",
    colore: ""
  };
  totOre: number = 0;
  eventiMateria: CalendarEvent[] = [];
  displayedColumns: string[] = ['materia', 'professore', 'inizio', 'fine', 'note'];

  constructor(private router: Router,
    private _route: ActivatedRoute,
    private _materiaService: MateriaService,
    private _calendarioService: CalendarioService,
    private _location: Location) { }

  ngOnInit() {
    this.getMateria();
  }

  getMateria() {
    const nomeMateria: string = this._route.snapshot.paramMap.get('titolo');
    this._materiaService.getMateria(nomeMateria).subscribe((materia: Materia) => {
      this.materia = materia;
      this.getEventi();
    })

  }

  getEventi() {
    this._calendarioService.getEvents().subscribe((event) => {
      event.forEach((elm) => {
        if (elm.title == this.materia.titolo) {
          this.eventiMateria.push(elm);
          this.calcolaOre(elm.start, elm.end);
        }
      })
    })
  }

  calcolaOre(start, end) {
    let inizio = new Date(start);
    let fine = new Date(end);

    let value: number = Math.abs(inizio.getTime() - fine.getTime()) / 36e5;
    let hour = value.toString().split(".");
    let ore: number = +hour[0];

    this.totOre += ore;
  }

  goBack() {
    this._location.back();
  }

  routerlink(event: CalendarEvent){
    this.router.navigate([`calendario/${event.id}`]);
  }
}