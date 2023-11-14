import { Component, OnInit } from '@angular/core';
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

  currentChar: charObject = new charObject;

  spellcastingClasses: any[] = [];

  charClasses: any[] = [];

  //TODO: MAKE BOTH UPDATE METHODS APPLY TO THE CLASSINDEX INSTEAD OF FIRST ARRAY ITEM
  updateCantrips(classIndex: string, cantripIndex: string, cantripName: string) {
    let classSpellcasterInfo = this.currentChar.classes[0]!.spellcasterInfo!;

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

  updateLeveledSpells(classIndex: string, spellIndex: string, spellName: string) {
    let classSpellcasterInfo = this.currentChar.classes[0]!.spellcasterInfo!;

    if(classSpellcasterInfo.spellsKnown == null) {
      classSpellcasterInfo.spellsKnown = [];
    }

    if(this.removeIfPresent(spellIndex, classSpellcasterInfo.spellsKnown)) {
      classSpellcasterInfo.spellsKnown.push([spellIndex, spellName]);
    }

    console.log(classSpellcasterInfo.spellsKnown);
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

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
          if(charClass.classIndex == ('cleric' || 'druid' || 'paladin' || 'wizard')) {
            spellCastingClass.maxPreparedSpells = charClass.classLevel + spellCastingClass.spellCastingModifier;
          }

          this.spellcastingClasses.push(spellCastingClass);
            
          console.log(this.spellcastingClasses);
        });
      }
    })



  }

}
