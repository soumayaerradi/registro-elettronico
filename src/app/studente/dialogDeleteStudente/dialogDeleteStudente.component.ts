import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import { StudenteService } from '../studente.service';

@Component({
  selector: 'app-dialogDeleteStudente',
  templateUrl: './dialogDeleteStudente.component.html',
  styleUrls: ['./dialogDeleteStudente.component.css']
})
export class DialogDeleteStudenteComponent implements OnInit {

  milliseconds = 3000;

  constructor(@Inject(MAT_DIALOG_DATA) public std: any,
  private _serviceStudenti: StudenteService,
  public dialogRef: MatDialogRef<DialogDeleteStudenteComponent>,
  private _snackBar: MatSnackBar) { 
  }

  ngOnInit() {
  }

  removeStudente() {
    this._serviceStudenti.removeStudente(this.std.dataKey.codiceFisc);
    this.dialogRef.close();
    this._snackBar.open('Studente eliminato', '', { duration: this.milliseconds, panelClass: 'snackbar' });
  }

  chiudi(){
    this.dialogRef.close();
  }

}
