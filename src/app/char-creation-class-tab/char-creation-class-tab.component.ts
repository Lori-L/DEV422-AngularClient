import { Component, OnInit } from '@angular/core';
import { CharClasses } from './charClasses';
import { DndApiServiceService } from '../dnd-api-service.service';
import { charObject } from '../create-edit-page/charObject';
import { classObject } from '../create-edit-page/classObject';
import { spellCasterObject } from '../create-edit-page/spellcasterObject';

@Component({
  selector: 'app-char-creation-class-tab',
  templateUrl: './char-creation-class-tab.component.html',
  styleUrls: ['./char-creation-class-tab.component.css']
})
export class CharCreationClassTabComponent implements OnInit {

  constructor(private dndApiService: DndApiServiceService) {
  }

  currentChar: charObject = new charObject;
  
  charClasses: any[] = [];

  classList: any[] = [];

  totalLevel = 0;

  testMethod() {
    console.log("success");
    this.ngOnInit();
  }

  newClassSelected() {
    console.log((document.getElementById("newClass") as HTMLSelectElement)?.value);
    let newCharClass: classObject = new classObject;

    newCharClass.classIndex = (document.getElementById("newClass") as HTMLSelectElement)?.value
  
    //checks to see if the new class is a spellcaster.
    //if it is, fills out the essentials of the class's spellCasterObject property
    this.dndApiService.DetermineIfSpellcaster(newCharClass.classIndex).subscribe((spellCount) => {
      let count = spellCount.count;

      if (count > 0) {
        newCharClass.isSpellcaster = true;
        newCharClass.spellcasterInfo = new spellCasterObject;

        switch(newCharClass.classIndex) {
          case('bard'): {
            newCharClass.spellcasterInfo.spellCastingAbility = 'cha';
            newCharClass.spellcasterInfo.knowsCantrips = true;
            newCharClass.spellcasterInfo.learnsSpells = true;
            newCharClass.spellcasterInfo.preparesSpells = false;
            break;
          }
          case('cleric'): {
            newCharClass.spellcasterInfo.spellCastingAbility = 'wis';
            newCharClass.spellcasterInfo.knowsCantrips = true;
            newCharClass.spellcasterInfo.learnsSpells = false;
            newCharClass.spellcasterInfo.preparesSpells = true;
            break;
          }
          case('druid'): {
            newCharClass.spellcasterInfo.spellCastingAbility = 'wis';
            newCharClass.spellcasterInfo.knowsCantrips = true;
            newCharClass.spellcasterInfo.learnsSpells = false;
            newCharClass.spellcasterInfo.preparesSpells = true;
            break;
          }
          case('paladin'): {
            newCharClass.spellcasterInfo.spellCastingAbility = 'cha';
            newCharClass.spellcasterInfo.knowsCantrips = false;
            newCharClass.spellcasterInfo.learnsSpells = false;
            newCharClass.spellcasterInfo.preparesSpells = true;
            break;
          }
          case('ranger'): {
            newCharClass.spellcasterInfo.spellCastingAbility = 'wis';
            newCharClass.spellcasterInfo.knowsCantrips = false;
            newCharClass.spellcasterInfo.learnsSpells = true;
            newCharClass.spellcasterInfo.preparesSpells = false;
            break;
          }
          case('sorcerer'): {
            newCharClass.spellcasterInfo.spellCastingAbility = 'cha';
            newCharClass.spellcasterInfo.knowsCantrips = true;
            newCharClass.spellcasterInfo.learnsSpells = true;
            newCharClass.spellcasterInfo.preparesSpells = false;
            break;
          }
          case('warlock'): {
            newCharClass.spellcasterInfo.spellCastingAbility = 'cha';
            newCharClass.spellcasterInfo.knowsCantrips = true;
            newCharClass.spellcasterInfo.learnsSpells = true;
            newCharClass.spellcasterInfo.preparesSpells = false;
            break;
          }
          case('wizard'): {
            newCharClass.spellcasterInfo.spellCastingAbility = 'int';
            newCharClass.spellcasterInfo.knowsCantrips = true;
            newCharClass.spellcasterInfo.learnsSpells = true;
            newCharClass.spellcasterInfo.preparesSpells = true;
            break;
          }
        }

        this.currentChar.classes.push(newCharClass);
        sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));

        this.ngOnInit();
      }
      else {
        this.currentChar.classes.push(newCharClass);
        sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));

        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.classList = [];
    this.totalLevel = 0;

    this.currentChar = JSON.parse(String(sessionStorage.getItem('currentChar')));
    console.log(this.currentChar);

    this.charClasses = this.currentChar.classes;

    console.log(this.charClasses);

    this.charClasses.forEach((element: any) => {
      this.totalLevel += element.classLevel;
    })

    //Gets a list of classes from dnd api. Puts into classList.
    //Does not add to classList if the character already has that class (charClasses).
    this.dndApiService.ClassList().subscribe((data) => {
      let results = data.results;
      let validClass: boolean = false;

      results.forEach((apiClass: any) => {
        validClass = true;

        this.charClasses.forEach((charClass: any) => {
          if(apiClass.index == charClass.classIndex) {
            validClass = false;
          }
        });
        if(validClass) {
          this.classList.push(apiClass);
        }
      });

      console.log(this.classList);
    });
  }

}