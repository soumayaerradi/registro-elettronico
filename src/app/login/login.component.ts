import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private router: Router,
              private _appService : AppService) { }
  
  ngOnInit() {
  }

  login(): void {
    if (this.username === 'admin' && this.password === 'admin') {
      this._appService.setAuth();
      this.router.navigate(['calendario']);
    } else {
      alert("Invalid credentials");
      this._appService.authentication = false;
    }
  }
}
