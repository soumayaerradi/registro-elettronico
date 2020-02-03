import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfessoreService } from '../professore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Professore } from '../professore';

@Component({
  selector: 'app-professore-modifica',
  templateUrl: './professore-modifica.component.html',
  styleUrls: ['./professore-modifica.component.css']
})
export class ProfessoreModificaComponent implements OnInit {

  professore: Professore;
  modificaProfessore: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private _professoreService: ProfessoreService,
    private _route: ActivatedRoute,
    private router: Router) {

    this.modificaProfessore = this.formBuilder.group({
      nome: '',
      cognome: '',
      materia: '',
      sesso: '',
      telefono: '',
      codiceFisc: '',
    })
  }

  getProfessore() {
    const codice: string = this._route.snapshot.paramMap.get('codiceFisc');
    this._professoreService.getProfessore(codice).subscribe((profe: Professore) => {
      this.professore = profe;
      this.formProfessore();
    });
  }

  ngOnInit() {
    this.getProfessore()
  }

  formProfessore(){

    this.modificaProfessore = this.formBuilder.group({
      nome: this.professore.nome,
      cognome: this.professore.cognome,
      materia: this.professore.materia,
      sesso: this.professore.sesso,
      telefono: this.professore.telefono,
      codiceFisc: this.professore.codiceFisc,
    })
  }

  onSubmit(aggiornaProfessore: Professore) {
    this._professoreService.aggiornaProfessore(aggiornaProfessore);
    this.router.navigate(['/professori']);
  }

}
