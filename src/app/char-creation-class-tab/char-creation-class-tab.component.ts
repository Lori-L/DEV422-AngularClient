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
  //indicates whether the classes tab is considered "complete" for the purpose of the "finish and view character" button appearing
  //conditions to be met: character has at least one class
  updateCompletedStatus() {
    if(this.currentChar.classes.length != 0) {
      this.completionUpdater.emit([1, true]);
    }
    else {
      this.completionUpdater.emit([1, false]);
    }
  }

  //adds / removes user-selected proficiency to / from the relevant class's proficiency list
  //creates a proficiency list if it does not yet exist
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

  //checks to see if the specified item is already present in the specified container array
  //if it is present, removes it and returns false
  //if it is NOT present, returns true
  //used for "toggling" whether the character has a certain property each time the user checks / unchecks a checkbox
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

  //adds a new class to the character
  newClassSelected() {
    console.log((document.getElementById("newClass") as HTMLSelectElement)?.value);
    let newCharClass: classObject = new classObject;

    newCharClass.classIndex = (document.getElementById("newClass") as HTMLSelectElement)?.value

    this.establishClassInfo(newCharClass, true);
    
  }

  //finds the specified class's features depending on class level
  establishFeatures(charClass: classObject) {
    this.dndApiService.ClassLevelsData(charClass.classIndex).subscribe((levelsData) => {
      let featureList: string[] = [];
      let temp: number = 0;

      for (let i = 0; i < charClass.classLevel; i++) {
        levelsData[i].features.forEach((feature: any) => {
          featureList.push(feature.index);
        });
      }

      featureList.forEach((featureName: any, index) => {
        this.dndApiService.FeatureData(featureName).subscribe((featureData) => {
          this.currentClassInfo!.levelFeatures.push([featureData.name, featureData.desc]);
          console.log(this.currentClassInfo);

          //likely unnecessary test boolean
          this.currentClassInfo!.test = true;
        });
      });
    });
  }

  //gathers relevant displayable class information
  //if addToClasses == true, gathers basic spellcasting info and adds the class to character's classes array
  establishClassInfo(newCharClass: classObject, addToClasses: boolean) {

    //checks to see if the new class is a spellcaster.
    //if it is, fills out the essentials of the class's spellCasterObject property
    this.dndApiService.SingleClassData(newCharClass.classIndex).subscribe((classData) => {

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

      //likely unnecessary test boolean
      if(this.currentClassInfo.test == false) {

        //TODO: FIX DOUBLE VALUES / VALUES NOT APPEARING ON INITIAL CLASS ADDITION
        this.establishFeatures(newCharClass);
      }
      

      this.charClassesInfo.push(this.currentClassInfo);

      console.log(this.currentClassInfo);

      if(addToClasses) {
        newCharClass.hitDie = classData.hit_die;
        

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
      }

      this.updateCompletedStatus()
    });
  }

  //returns true if specified option has previously been chosen by the user
  //used to determine whether or not to have it checked on component load
  classesCheckboxes(abilityIndex: string, arrayChecked: any[][]) {
    let isPresent: boolean = false;

    arrayChecked.forEach((element: any) => {
      if(element[0] == abilityIndex) {
        isPresent = true;
      }
    });

    return isPresent;
  }

  //takes in current character object and collects displayable information about any existing char classes
  //gets a list of classes (minus any already on the char)
  ngOnInit(): void {
    this.classList = [];
    this.totalLevel = 0;

    this.currentChar = JSON.parse(String(sessionStorage.getItem('currentChar')));
    console.log(this.currentChar);

    this.charClasses = this.currentChar.classes;

    console.log(this.charClasses);

    this.charClasses.forEach((element: any) => {
      this.totalLevel += element.classLevel;
      this.establishClassInfo(element, false);
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