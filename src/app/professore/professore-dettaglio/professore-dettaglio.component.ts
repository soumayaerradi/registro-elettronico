import { Component, OnInit } from '@angular/core';
import { ProfessoreService } from '../professore.service';
import { ActivatedRoute } from '@angular/router';
import { Professore } from '../professore';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-professore-dettaglio',
  templateUrl: './professore-dettaglio.component.html',
  styleUrls: ['./professore-dettaglio.component.css']
})
export class ProfessoreDettaglioComponent implements OnInit {

  professore: Professore;
  nuovaNota: FormGroup;

  constructor(
    private _professoreService: ProfessoreService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder) {
    this.nuovaNota = this._formBuilder.group({
      nota: '',
    });
  }

  ngOnInit() {
    this.getProfessore();
  }

  getProfessore() {
    const codice: string = this._route.snapshot.paramMap.get('codiceFisc');
    this._professoreService.getProfessore(codice).subscribe((profe: Professore) => {
      this.professore = profe;
    });
  }

  eliminaNota(index: number) {
    this.professore.note.splice(index, 1);
    this._professoreService.aggiornaProfessore(this.professore);
  }

  onSubmit(nuovaNota: any) {
    if (this.professore.note == undefined) {
      this.professore.note = [];
    }
    this.professore.note.push(nuovaNota['nota']);
    this._professoreService.aggiornaProfessore(this.professore);
  }

}
