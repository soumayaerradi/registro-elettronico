import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProfessoreService } from '../professore.service';

@Component({
  selector: 'app-dialogRemoveProfessore',
  templateUrl: './dialogRemoveProfessore.component.html',
  styleUrls: ['./dialogRemoveProfessore.component.css']
})
export class DialogRemoveProfessoreComponent implements OnInit {

  milliseconds = 80000;

  constructor(@Inject(MAT_DIALOG_DATA) public prof: any,
  private _serviceProfessori: ProfessoreService,
  public dialogRef: MatDialogRef<DialogRemoveProfessoreComponent>,
  private _snackBar: MatSnackBar) { 
  }

  ngOnInit() {
  }

  removeProfessore() {
    this._serviceProfessori.removeProfessore(this.prof.dataKey.codiceFisc);
    this.dialogRef.close();
    this._snackBar.open('Professore eliminato', '', { duration: this.milliseconds, panelClass:'snackbar' });
  }

  chiudi(){
    this.dialogRef.close();
  }

}
