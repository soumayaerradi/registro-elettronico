import { Component, OnInit, Input } from '@angular/core';
import { Studente } from '../studente';
import { StudenteService } from '../studente.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-studente-dettaglio',
  templateUrl: './studente-dettaglio.component.html',
  styleUrls: ['./studente-dettaglio.component.css']
})
export class StudenteDettaglioComponent implements OnInit {

  studente: Studente;
  nuovaNota: FormGroup;

  constructor(
    private _studenteService: StudenteService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder) {

    this.nuovaNota = this._formBuilder.group({
      nota: '',
    });
  }

  ngOnInit() {
    this.getStudente();
  }


  getStudente() {
    const codice: string = this._route.snapshot.paramMap.get('codiceFisc');
    console.log(codice);
    this._studenteService.getStudente(codice).subscribe((std: Studente) => {
      console.log(std);
      console.log(typeof std);
      this.studente = std;
    });
  }

  eliminaNota(index: number){
    console.log(index);
    this.studente.note.splice(index, 1);
    this._studenteService.aggiornaStudente(this.studente);
  }

  onSubmit(nuovaNota: any) {
    this.studente.note.push(nuovaNota['nota']);
    this._studenteService.aggiornaStudente(this.studente);
    //this.router.navigate(['/studenti']);
  } 

}
