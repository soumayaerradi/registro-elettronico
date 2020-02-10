import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  authentication: boolean = false;

  getAuth(){
    return this.authentication;
  }

  setAuth(){
    return this.authentication = true;
  }

}
