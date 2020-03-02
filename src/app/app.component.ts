import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opened: boolean = false;
  title = 'Registro Digitale';

  constructor(public _auth: AngularFireAuth) {
    console.log("constructor");
    this._auth.auth.onAuthStateChanged(user => {
      console.log("onauthchange");
      if (user) {
        localStorage.setItem('token', user.uid);
        console.log("user logged in");
      }
    });

  }

  checkLogin() {
    if (localStorage.token) {
      return true;
    }
  }

  logout() {
    this._auth.auth.signOut();
    localStorage.removeItem('token');
  }
}

