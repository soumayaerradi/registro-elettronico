import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'
import { MatDialog } from '@angular/material/dialog';
import { PasswordResetComponent } from '../passwordReset/passwordReset.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: string;
  password: string;
  email: string;
  milliseconds = 3000;

  constructor(
    private router: Router,
    public auth: AngularFireAuth,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  login(): void {
    const loginForm = document.querySelector('#login-form');
    const email = loginForm['login-name'].value;
    const password = loginForm['login-password'].value;
    this.auth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['calendario']);
    }).catch(err => {
      this.snackBar.open('email o password errate', '', { duration: this.milliseconds, panelClass: 'snackbar' });
    });
  }

  passwordReset(): void {
    this.dialog.open(PasswordResetComponent, {
      width: '40%',
      height: '50%'
    });
  }
}
