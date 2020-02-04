import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  private url: string = ""

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

constructor(private _http: HttpClient) { }

getEventsList(): Observable<CalendarEvent[]>{
  return this._http.get<CalendarEvent[]>(this.url);
}

getEvent(id: number): Observable<CalendarEvent> {
  const url = `${this.url}/${id}`;
  return this._http.get<CalendarEvent>(url);
}

}
