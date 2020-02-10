import {Component} from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opened: boolean;
  title = 'Registro Digitale';
  authentication : boolean = false;

  constructor(private _appService: AppService){}

  getAuthentication(){
    this.authentication = this._appService.getAuth();
    console.log(this.authentication);
  }
  
}


