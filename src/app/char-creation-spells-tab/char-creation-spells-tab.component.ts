import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DndApiServiceService } from '../dnd-api-service.service';
import { spellCasterInfo } from './spellcasterInfo';
import { charObject } from '../create-edit-page/charObject';
import { classObject } from '../create-edit-page/classObject';
import { spellCasterObject } from '../create-edit-page/spellcasterObject';

@Component({
  selector: 'app-char-creation-spells-tab',
  templateUrl: './char-creation-spells-tab.component.html',
  styleUrls: ['./char-creation-spells-tab.component.css']
})
export class CharCreationSpellsTabComponent implements OnInit {

  constructor(private dndApiService: DndApiServiceService) { 
  }

  @Output() completionUpdater = new EventEmitter();

  currentChar: charObject = new charObject;

  spellcastingClasses: any[] = [];

  charClasses: any[] = [];

  //event emitter shenanigans
  //indicates whether the spells tab is considered "complete" for the purpose of the "finish and view character" button appearing
  //conditions to be met: character can't cast spells OR a spellcasting character has learnt at least one spell
  updateCompletedStatus() {
    if(this.spellcastingClasses.length == 0 || this.currentChar.classes[0].spellcasterInfo?.spellsKnown?.length != 0) {
      this.completionUpdater.emit([3, true]);
    }
    else {
      this.completionUpdater.emit([3, false]);
    }
  }

  //adds / removes user-selected cantrip to / from the relevant class's cantrip list
  //creates a cantrip list if it does not yet exist
  updateCantrips(classIndex: string, cantripIndex: string, cantripName: string) {
    let classSpellcasterInfo = this.currentChar.classes[this.findRelevantIndex(classIndex)]!.spellcasterInfo!;

    if(classSpellcasterInfo.cantripsKnown == null) {
      classSpellcasterInfo.cantripsKnown = [];
    }

    if(this.removeIfPresent(cantripIndex, classSpellcasterInfo.cantripsKnown)) {
      classSpellcasterInfo.cantripsKnown.push([cantripIndex, cantripName]);
    }

    console.log(classSpellcasterInfo.cantripsKnown);
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //adds / removes user-selected spell to / from the relevant class's spell list
  //creates a spell list if it does not yet exist
  updateLeveledSpells(classIndex: string, spellIndex: string, spellName: string) {
    let classSpellcasterInfo = this.currentChar.classes[this.findRelevantIndex(classIndex)]!.spellcasterInfo!;

    if(classSpellcasterInfo.spellsKnown == null) {
      classSpellcasterInfo.spellsKnown = [];
    }

    if(this.removeIfPresent(spellIndex, classSpellcasterInfo.spellsKnown)) {6
      classSpellcasterInfo.spellsKnown.push([spellIndex, spellName]);
    }

    console.log(classSpellcasterInfo.spellsKnown);
    console.log(this.currentChar);

    this.updateCompletedStatus();

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //based off of a classIndex string, finds the appropriate index value in the character's classes array
  findRelevantIndex(classIndex: string) {
    let num = 0;

    this.currentChar.classes.forEach((element: any, index) => {
      if(element.classIndex == classIndex) {
        num = index;
      }
    });

    return num;
  }

  //checks to see if the specified spell is already present in the specified container array
  //if it is present, removes it and returns false
  //if it is NOT present, returns true
  //used for "toggling" whether the character knows a spell each time the user checks / unchecks a checkbox
  removeIfPresent(spellIndex: string, containerArray: string[][]) {
    let presentAtIndex: number = -1;

    containerArray.forEach((element, index) => {
      if (spellIndex == element[0]) {
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

  //returns true if specified spell has previously been chosen by the user (for the specified class)
  //used to determine whether or not to have it checked on component load
  spellCheckboxes(spellIndex: string, leveledSpell: boolean, classIndex: string) {
    let isPresent: boolean = false;
    let classLocation = this.findRelevantIndex(classIndex);

    if(leveledSpell) {
      this.currentChar.classes[classLocation].spellcasterInfo!.spellsKnown.forEach((element: any) => {
        if(element[0] == spellIndex) {
          isPresent = true;
        }
      });
    }
    else {
      this.currentChar.classes[classLocation].spellcasterInfo!.cantripsKnown.forEach((element: any) => {
        if(element[0] == spellIndex) {
          isPresent = true;
        }
      });
    }

    return isPresent;
  }

  //takes in the current character object, checks to see if any of its existing classes can learn spells
  //takes stock of each spellcasting class and fills out a spellcasterInfo object for them
  //the spellcasterInfo object contains relevant displayable information (spells available to learn, how many spells can be cast in a day, etc)
  ngOnInit(): void {
    this.currentChar = JSON.parse(String(sessionStorage.getItem('currentChar')));
    console.log(this.currentChar);


    //this.charClasses = JSON.parse(String(sessionStorage.getItem('classList')));
    this.charClasses = this.currentChar.classes;
    console.log("Character classes: ");
    console.log(this.charClasses);

    //Checks to see which (if any) character classes can learn spells.
    //Adds all spellcasting classes to the spellcastingClasses array.
    this.charClasses.forEach((charClass) => {
      if(charClass.isSpellcaster) {

        let spellCastingClass: spellCasterInfo = new spellCasterInfo(charClass.classIndex, charClass.classLevel);

        //Checks what level spell slots / num of cantrips / num of known spells the character has with their class level
        //Adds the spell slot array to the spellCasterInfo object
        this.dndApiService.DetermineAvailableSpellSlotsAtLevel(charClass.classIndex, charClass.classLevel).subscribe((classInfo) => {

          console.log(classInfo.spellcasting);
          let spellSlots = classInfo.spellcasting;
          let spellSlotsArray: number[] = [];

          spellSlotsArray.push(spellSlots.spell_slots_level_1);
          spellSlotsArray.push(spellSlots.spell_slots_level_2);
          spellSlotsArray.push(spellSlots.spell_slots_level_3);
          spellSlotsArray.push(spellSlots.spell_slots_level_4);
          spellSlotsArray.push(spellSlots.spell_slots_level_5);
          spellSlotsArray.push(spellSlots.spell_slots_level_6);
          spellSlotsArray.push(spellSlots.spell_slots_level_7);
          spellSlotsArray.push(spellSlots.spell_slots_level_8);
          spellSlotsArray.push(spellSlots.spell_slots_level_9);

          spellCastingClass.spellSlotsArray = spellSlotsArray;

          if(spellSlots.cantrips_known) {
            spellCastingClass.cantripsKnownCount = spellSlots.cantrips_known;

            //Saves all cantrips available to character
            this.dndApiService.DetermineAvailableSpellsAtSpellLevel(charClass.classIndex, '0').subscribe((cantrips) => {
              let cantripList = cantrips.results;
                
              cantripList.forEach((oneCantrip: any, index: number) => {
                spellCastingClass.cantripsList.push([oneCantrip.index, oneCantrip.name])
              })
            })
          }

          spellSlotsArray.forEach((spellLevel: any, index) => {
            let tempSpells: string[][] = [];
              
            if(spellLevel > 0) {
              this.dndApiService.DetermineAvailableSpellsAtSpellLevel(charClass.classIndex, String(index+1)).subscribe((spells) => {
                spells.results.forEach((spell: any) => {
                  tempSpells.push([spell.index, spell.name]);
                })
              })
            }

            spellCastingClass.spellsByLevel.push(tempSpells);
          })

          //Not all classes have a set number of "known spells"
          if(spellSlots.spells_known) {
            spellCastingClass.spellsKnownCount = spellSlots.spells_known;
          }
            
          //Determines how many spells can be prepared (for relevant classes)
          spellCastingClass.spellCastingAbility = charClass.spellcasterInfo.spellCastingAbility;
          switch (spellCastingClass.spellCastingAbility) {
            case('int'):  {
              spellCastingClass.spellCastingModifier = Math.floor((this.currentChar.abilityScoresBasic[3] - 10) / 2);
              break;
            }
            case('wis'): {
              spellCastingClass.spellCastingModifier = Math.floor((this.currentChar.abilityScoresBasic[4] - 10) / 2);
              break;
            }
            case('cha'): {
              spellCastingClass.spellCastingModifier = Math.floor((this.currentChar.abilityScoresBasic[5] - 10) / 2);
              break;
            }
          }

          if(charClass.classIndex == ('cleric' || 'druid' || 'paladin' || 'wizard')) {
            spellCastingClass.maxPreparedSpells = charClass.classLevel + spellCastingClass.spellCastingModifier;

            if(spellCastingClass.maxPreparedSpells! < 1) {
              spellCastingClass.maxPreparedSpells = 1;
            }
          }

          this.spellcastingClasses.push(spellCastingClass);
            
          console.log(this.spellcastingClasses);
        });
      }
    })

    this.updateCompletedStatus();

  }

}
