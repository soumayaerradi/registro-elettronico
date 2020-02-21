import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Materia } from '../materia';
import { MateriaService } from '../materia.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  nuovaMateria: any;
  listaMaterie: Materia[];

  constructor(private formBuilder: FormBuilder,
    private _materieService: MateriaService) {
    this.nuovaMateria = this.formBuilder.group({
      titolo: '',
      colore: '',
    });
  }

  onSubmit(materia: Materia) {
    this._materieService.updateMaterie(materia);
    this.getMaterie();
  }

  getMaterie(){
    this.listaMaterie = [];
    this._materieService.getMat().subscribe((materia: Materia[]) => {
      this.listaMaterie = materia;
    });
  }

  deleteMateria(delMateria: Materia){
    this._materieService.removeMateria(delMateria.titolo);
  }

  ngOnInit() {
    this.getMaterie();
  }
}