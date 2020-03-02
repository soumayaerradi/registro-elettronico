import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { MateriaService } from '../materia.service';

@Component({
  selector: 'app-dialogRemoveMateria',
  templateUrl: './dialogRemoveMateria.component.html',
  styleUrls: ['./dialogRemoveMateria.component.css']
})
export class DialogRemoveMateriaComponent implements OnInit {

  milliseconds = 3000;

  constructor(@Inject(MAT_DIALOG_DATA) public mat: any,
  private _serviceMateria: MateriaService,
  public dialogRef: MatDialogRef<DialogRemoveMateriaComponent>,
  private _snackBar: MatSnackBar) { 
  }

  ngOnInit() {
  }

  deleteMateria(){
    this._serviceMateria.removeMateria(this.mat.dataKey.titolo);
    this.dialogRef.close();
    this._snackBar.open('Materia eliminata', '', { duration: this.milliseconds, panelClass: 'snackbar' });
  }

  chiudi(){
    this.dialogRef.close();
  }

}
