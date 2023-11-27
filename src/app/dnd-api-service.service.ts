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

  RaceInfo(raceIndex: string): Observable<any>{
    return this.http.get(
      'https://www.dnd5eapi.co/api/races/' + raceIndex
    );
  }

  BackgroundList(): Observable<any> {
    return this.http.get(
      'https://www.dnd5eapi.co/api/backgrounds/'
    );
  }

  BackgroundInfo(backgroundIndex: string): Observable<any> {
    return this.http.get(
      'https://www.dnd5eapi.co/api/backgrounds/' + backgroundIndex
    )
  }

  ClassList(): Observable<any> {
    return this.http.get(
      'https://www.dnd5eapi.co/api/classes/'
    );
  }

  SingleClassData(classIndex: string): Observable<any> {
    return this.http.get(
      'https://www.dnd5eapi.co/api/classes/' + classIndex
    );
  }

  ClassLevelsData(classIndex: string): Observable<any> {
    return this.http.get(
      'https://www.dnd5eapi.co/api/classes/' + classIndex + '/levels'
    )
  }

  ClassFeatureData(featureName: string): Observable<any> {
    return this.http.get(
      'https://www.dnd5eapi.co/api/features/' + featureName
    )
  }

  EquipmentCategoryData(category: string): Observable<any> {
    return this.http.get(
      'https://www.dnd5eapi.co/api/equipment-categories/' + category
    )
  }

  //deprecated
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

  MiscQuery(url: string): Observable<any> {
    return this.http.get(
      'https://www.dnd5eapi.co' + url
    );
  }
}
