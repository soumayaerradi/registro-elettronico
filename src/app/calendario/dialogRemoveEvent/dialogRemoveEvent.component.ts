import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { CalendarioService } from '../calendario.service';
import { StudenteService } from 'src/app/studente/studente.service';
import { Studente } from 'src/app/studente/studente';

@Component({
  selector: 'app-dialogRemoveEvent',
  templateUrl: './dialogRemoveEvent.component.html',
  styleUrls: ['./dialogRemoveEvent.component.css']
})
export class DialogRemoveEventComponent implements OnInit {
  milliseconds = 3000;
  listaStudenti: Studente[];

  constructor(@Inject(MAT_DIALOG_DATA) public event: any,
  public dialogRef: MatDialogRef<DialogRemoveEventComponent>,
  private _calendarioService : CalendarioService,
  private _snackBar: MatSnackBar,
  private _studenteService: StudenteService) { 
  }

  ngOnInit() {
    this.getStudenti();
  }

  getStudenti() {
    this._studenteService.getStudenti().subscribe((listaStudenti: Studente[]) => {
      this.listaStudenti = listaStudenti;
    });
  }

  removeEvent() {
    this._studenteService.removeStoricoAPRevento(this.event.evento, this.listaStudenti);
    this._calendarioService.removeEvento(this.event.evento.id.toString());
    this.dialogRef.close();
    this._snackBar.open('Lezione eliminata', '', { duration: this.milliseconds, panelClass:'snackbar' });
  }

  chiudi(){
    this.dialogRef.close();
  }

}
