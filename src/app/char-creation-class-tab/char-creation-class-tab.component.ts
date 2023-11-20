import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { classInfo } from './classInfo';
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

  @Output() completionUpdater = new EventEmitter();

  currentChar: charObject = new charObject;

  currentClassInfo?: classInfo;

  charClassesInfo: classInfo[] = [];
  
  charClasses: any[] = [];

  classList: any[] = [];

  totalLevel = 0;

  //event emitter shenanigans
  updateCompletedStatus() {
    if(this.currentChar.classes.length != 0) {
      this.completionUpdater.emit([1, true]);
    }
    else {
      this.completionUpdater.emit([1, false]);
    }
  }

  updateClassProficiency(profIndex: string, profName: string, classIndex: number) {
    let charClassInfo = this.currentChar.classes[classIndex];

    if(charClassInfo.chosenProficiencyIndex == null) {
      charClassInfo.chosenProficiencyIndex = [];
    }

    if(this.removeIfPresent(profIndex, charClassInfo.chosenProficiencyIndex)) {
      charClassInfo.chosenProficiencyIndex.push([profIndex, profName]);
    }

    console.log(charClassInfo.chosenProficiencyIndex);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  removeIfPresent(itemIndex: string, containerArray: string[][]) {
    let presentAtIndex: number = -1;

    containerArray.forEach((element, index) => {
      if (itemIndex == element[0]) {
        presentAtIndex = index;
      }
    });

    if(presentAtIndex > -1) {
      containerArray.splice(presentAtIndex, 1);
      return false; //returns false when an applicable array element has been found / removed
    }
    else {
      return true;
    }
  }

  newClassSelected() {
    console.log((document.getElementById("newClass") as HTMLSelectElement)?.value);
    let newCharClass: classObject = new classObject;

    newCharClass.classIndex = (document.getElementById("newClass") as HTMLSelectElement)?.value

    //checks to see if the new class is a spellcaster.
    //if it is, fills out the essentials of the class's spellCasterObject property
    this.dndApiService.SingleClassData(newCharClass.classIndex).subscribe((classData) => {

      //TODO: make this whole section into its own method
      this.currentClassInfo = new classInfo(newCharClass.classIndex);

      this.currentClassInfo.hitDie = classData.hit_die;
      
      //TODO: ADD AN EXTRA CHECK TO ENSURE THE CURRENT CLASS IS THE STARTING CLASS
      //TODO: ADD AN ALTERNATIVE FOR MULTICLASSED PROFICIENCIES IF IT ISN'T STARTING CLASS
      if(this.currentClassInfo.skillProficiencies == null) {
        this.currentClassInfo.skillProficiencies = [];
      }
      classData.proficiencies.forEach((prof: any) => {
        this.currentClassInfo!.skillProficiencies!.push([prof.index, prof.name]);
      });

      //TODO: ADD AN EXTRA CHECK TO ENSURE THE CURRENT CLASS IS THE STARTING CLASS
      if(this.currentClassInfo.startingEquipment == null) {
        this.currentClassInfo.startingEquipment = [];
      }
      classData.starting_equipment.forEach((equip: any) => {
        this.currentClassInfo!.startingEquipment!.push([equip.equipment.name, equip.quantity]);
      });

      //TODO: ADD AN EXTRA CHECK TO ENSURE THE CURRENT CLASS IS THE STARTING CLASS
      if(this.currentClassInfo.userProficienciesOptions == null) {
        this.currentClassInfo.userProficienciesOptions = [];
        this.currentClassInfo.skillProficiencyCount = classData.proficiency_choices[0].choose;
      }
      //TODO: ADD FUNCTIONALITY FOR EXTRA CLASS-SPECIFIC PROFICIENCIES (musical instruments for bard, etc)
      classData.proficiency_choices[0].from.options.forEach((choice: any) => {
        this.currentClassInfo!.userProficienciesOptions!.push([choice.item.index, choice.item.name]);
      });

      this.charClassesInfo.push(this.currentClassInfo);

      console.log(this.currentClassInfo);

      if (classData.spellcasting != null) {
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

      this.updateCompletedStatus()
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