import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-passwordReset',
  templateUrl: './passwordReset.component.html',
  styleUrls: ['./passwordReset.component.css']
})
export class PasswordResetComponent implements OnInit {

  passwordReset: FormGroup;
  milliseconds: number = 5000;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PasswordResetComponent>,
    public _auth: AngularFireAuth,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.passwordReset = this._formBuilder.group({
      email: ['', Validators.required],
    });
  }

  onSubmit(email: any) {
    this._auth.auth.sendPasswordResetEmail(email.email);
    this.dialogRef.close();
  }

  get email(): AbstractControl {
    return this.passwordReset.get('email');
  }

  emailSended(){
    this._snackBar.open('Email di recupero passoword inviata, controlla la posta elettronica', 'OK', { duration: this.milliseconds });
  }
}
