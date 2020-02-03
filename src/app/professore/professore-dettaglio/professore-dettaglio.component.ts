import { Component, OnInit } from '@angular/core';
import { ProfessoreService } from '../professore.service';
import { ActivatedRoute } from '@angular/router';
import { Professore } from '../professore';

@Component({
  selector: 'app-professore-dettaglio',
  templateUrl: './professore-dettaglio.component.html',
  styleUrls: ['./professore-dettaglio.component.css']
})
export class ProfessoreDettaglioComponent implements OnInit {

  professore: Professore;

  constructor(
    private _professoreService: ProfessoreService,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getProfessore();
  }

  getProfessore(){
    const codice: string = this._route.snapshot.paramMap.get('codiceFisc');
    this._professoreService.getProfessore(codice).subscribe((profe: Professore)=>{
      this.professore = profe;
    });
  }

}
