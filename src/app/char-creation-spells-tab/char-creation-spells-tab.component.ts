import { Component, OnInit } from '@angular/core';
import { DndApiServiceService } from '../dnd-api-service.service';
import { spellCasterInfo } from './spellcasterInfo';

@Component({
  selector: 'app-char-creation-spells-tab',
  templateUrl: './char-creation-spells-tab.component.html',
  styleUrls: ['./char-creation-spells-tab.component.css']
})
export class CharCreationSpellsTabComponent implements OnInit {

  constructor(private dndApiService: DndApiServiceService) { 
  }

  spellcastingClasses: any[] = [];

  charClasses: any[] = [];

  ngOnInit(): void {
    this.charClasses = JSON.parse(String(sessionStorage.getItem('classList')));
    console.log("Character classes: ");
    console.log(this.charClasses);

    //Checks to see which (if any) character classes can learn spells.
    //Adds all spellcasting classes to the spellcastingClasses array.
    this.charClasses.forEach((charClass) => {
      this.dndApiService.DetermineIfSpellcaster(charClass[0].toLowerCase()).subscribe((spellCount) => {

        let count = spellCount.count;

        if(count > 0) {
          let spellCastingClass: spellCasterInfo = new spellCasterInfo(charClass[0], charClass[1]);

          //Checks what level spell slots / num of cantrips / num of known spells the character has with their class level
          //Adds the spell slot array to the spellCasterInfo object
          this.dndApiService.DetermineAvailableSpellSlotsAtLevel(charClass[0].toLowerCase(), String(charClass[1])).subscribe((classInfo) => {

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
              this.dndApiService.DetermineAvailableSpellsAtSpellLevel(charClass[0].toLowerCase(), '0').subscribe((cantrips) => {
                let cantripList = cantrips.results;
                
                cantripList.forEach((oneCantrip: any, index: number) => {
                  spellCastingClass.cantripsList.push([oneCantrip.index, oneCantrip.name])
                })
              })
            }

            spellSlotsArray.forEach((spellLevel: any, index) => {
              let tempSpells: string[][] = [];
              
              if(spellLevel > 0) {
                this.dndApiService.DetermineAvailableSpellsAtSpellLevel(charClass[0].toLowerCase(), String(index+1)).subscribe((spells) => {
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
            
            //Determines the character's spellcasting ability stat. Dependent on class.
            //Used to determine effectiveness of spells, how many spells can be prepared, etc
            this.dndApiService.DetermineSpellcastingAbility(charClass[0].toLowerCase()).subscribe((data) => {
              spellCastingClass.spellCastingAbility = data.spellcasting_ability.name;

              //TODO: ADD A MODIFIER CALCULATOR. REQUIRES THE CHARACTER'S STATS TO BE LOGGED.

              if(charClass[0].toLowerCase == ('cleric' || 'druid' || 'paladin' || 'wizard')) {
                spellCastingClass.maxPreparedSpells = charClass[1] + spellCastingClass.spellCastingModifier;
              }
            })

          });

          this.spellcastingClasses.push(spellCastingClass);

          console.log(this.spellcastingClasses);
        }

      });
    })



  }

}
