import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DndApiServiceService {

  constructor(private http: HttpClient) { }

  RaceList(): Observable<any> {
    return this.http.get(
      'https://www.dnd5eapi.co/api/races/'
    );
  }

  BackgroundList(): Observable<any> {
    return this.http.get(
      'https://www.dnd5eapi.co/api/backgrounds/'
    );
  }

  ClassList(): Observable<any> {
    return this.http.get(
      'https://www.dnd5eapi.co/api/classes/'
    );
  }

  DetermineIfSpellcaster(className: string): Observable<any> {
    return this.http.get(
      'https://www.dnd5eapi.co/api/classes/' + className + '/spells'
    );
  }

  DetermineAvailableSpellSlotsAtLevel(className: string, classLevel: string): Observable<any> {
    return this.http.get(
      'https://www.dnd5eapi.co/api/classes/' + className + '/levels/' + classLevel
    );
  }

  DetermineAvailableSpellsAtSpellLevel(className: string, spellLevel: string): Observable<any> {
    return this.http.get(
      'https://www.dnd5eapi.co/api/classes/' + className + '/levels/' + spellLevel + '/spells'
    );
  }

  DetermineSpellcastingAbility(className: string): Observable<any> {
    return this.http.get(
      'https://www.dnd5eapi.co/api/classes/' + className + '/spellcasting'
    );
  }
}
