import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DndApiServiceService } from '../dnd-api-service.service';
import { charObject } from '../create-edit-page/charObject';
import { raceInfo } from './raceInfo';
import { backgroundInfo } from './backgroundInfo';

@Component({
  selector: 'app-char-creation-nrb-tab',
  templateUrl: './char-creation-nrb-tab.component.html',
  styleUrls: ['./char-creation-nrb-tab.component.css']
})
export class CharCreationNrbTabComponent implements OnInit {

  constructor(private dndApiService: DndApiServiceService) { }

  @Output() completionUpdater = new EventEmitter();

  raceList: any[] = [];

  backgroundList: any[] = [];

  currentChar: charObject = new charObject;

  currentRace?: raceInfo;

  //data that race-based user choices (when applicable) are pulled from
  raceUserAbilitiesData?: any;
  raceUserAbilitiesCount?: number;
  raceUserAbilities?: any[][]; //[[index, name, bonus], [index, name, bonus]]
  raceUserProficienciesData?: any;
  raceUserProficienciesCount?: number;
  raceUserProficiencies?: any[][];
  raceUserLanguagesData?: any;
  raceUserLanguagesCount?: number;
  raceUserLanguages?: any[][];

  currentBackground?: backgroundInfo;
  backgroundUserLanguagesCount: number = 0;
  backgroundLanguageList: string[][] = [];

  //event emitter shenanigans
  updateCompletedStatus() {
    if(this.currentChar.name != '' && this.currentChar.background.backgroundIndex != '' && this.currentChar.race.raceIndex != '') {
      this.completionUpdater.emit([0, true]);
    }
    else {
      this.completionUpdater.emit([0, false]);
    }
  }

  //to make this secure even in the case of multiple tabs open, should first refresh currentChar from session storage
  //left out for now to avoid clutter and focus on more important functionality
  updateRace() {
    this.raceUserAbilitiesData = null;
    this.raceUserProficienciesData = null;
    this.raceUserLanguagesData = null;

    this.currentChar.race.raceIndex = (document.getElementById("charRace") as HTMLSelectElement)?.value;
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));

    this.dndApiService.RaceInfo(this.currentChar.race.raceIndex).subscribe((raceData) => {
      this.currentRace = new raceInfo(this.currentChar.race.raceIndex);

      this.currentRace.alignmentText = raceData.alignment;
      this.currentRace.ageText = raceData.age;
      this.currentRace.sizeText = raceData.size_description;
      this.currentRace.languageText = raceData.language_desc;
      this.currentRace.raceSpeed = raceData.speed;

      let tempAbilities: any[][] = [];

      raceData.ability_bonuses.forEach((element: any) => {
        tempAbilities.push([element.ability_score.index, element.bonus]);
      });

      this.currentRace.raceAbilityBonuses = tempAbilities;

      //if the chosen race allows the user to choose ability scores to boost
      if(raceData.ability_bonus_options) {
        this.raceUserAbilitiesData = raceData.ability_bonus_options;
        let data = this.raceUserAbilitiesData;

        this.raceUserAbilities = [];

        this.raceUserAbilitiesCount = data.choose;

        data.from.options.forEach((ability: any) => {
          this.raceUserAbilities?.push([ability.ability_score.index, ability.ability_score.name, ability.bonus]);
        });
      }

      if(raceData.starting_proficiency_options) {
        this.raceUserProficienciesData = raceData.starting_proficiency_options;
        let data = this.raceUserProficienciesData;

        this.raceUserProficiencies = [];

        this.raceUserProficienciesCount = data.choose;

        data.from.options.forEach((proficiency: any) => {
          this.raceUserProficiencies?.push([proficiency.item.index, proficiency.item.name]);
        });
      }

      if(raceData.language_options) {
        this.raceUserLanguagesData = raceData.language_options;
        let data = this.raceUserLanguagesData;

        this.raceUserLanguages = [];

        this.raceUserLanguagesCount = data.choose;

        data.from.options.forEach((language: any) => {
          this.raceUserLanguages?.push([language.item.index, language.item.name]);
        });
      }

      this.updateCompletedStatus();

      console.log(this.currentRace);
    });
  }

  //updateRaceAbilityBonuses
  updateRaceAbilityBonuses(abilityIndex: string, bonusAmount: number) {
    let charRaceInfo = this.currentChar.race;

    if(charRaceInfo.chosenAbilityBonuses == null) {
      charRaceInfo.chosenAbilityBonuses = [];
    }

    if(this.removeIfPresent(abilityIndex, charRaceInfo.chosenAbilityBonuses)) {
      charRaceInfo.chosenAbilityBonuses.push([abilityIndex, bonusAmount]);
    }

    console.log(charRaceInfo.chosenAbilityBonuses);
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //updateRaceProficiencies
  updateRaceProficiencies(proficiencyIndex: string, proficiencyName: string) {
    let charRaceInfo = this.currentChar.race;

    if(charRaceInfo.chosenProficiencyIndex == null) {
      charRaceInfo.chosenProficiencyIndex = [];
    }

    if(this.removeIfPresent(proficiencyIndex, charRaceInfo.chosenProficiencyIndex)) {
      charRaceInfo.chosenProficiencyIndex.push([proficiencyIndex, proficiencyName]);
    }

    console.log(charRaceInfo.chosenProficiencyIndex);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //updateRaceLanguages
  updateRaceLanguages(languageIndex: string, languageName: string) {
    let charRaceInfo = this.currentChar.race;

    if(charRaceInfo.chosenLanguageIndex == null) {
      charRaceInfo.chosenLanguageIndex = [];
    }

    if(this.removeIfPresent(languageIndex, charRaceInfo.chosenLanguageIndex)) {
      charRaceInfo.chosenLanguageIndex.push([languageIndex, languageName]);
    }

    console.log(charRaceInfo.chosenLanguageIndex);

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

  updateBackground() {
    this.currentChar.background.backgroundIndex = (document.getElementById("charBackground") as HTMLSelectElement)?.value;
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));

    this.dndApiService.BackgroundInfo(this.currentChar.background.backgroundIndex).subscribe((backgroundData) => {
      this.currentBackground = new backgroundInfo(this.currentChar.background.backgroundIndex);

      let tempProficiencies: string[][] = [];
      let tempEquipment: any[][] = [];

      backgroundData.starting_proficiencies.forEach((proficiency: any) => {
        tempProficiencies.push([proficiency.index, proficiency.name]);
      });

      backgroundData.starting_equipment.forEach((item: any) => {
        tempEquipment.push([item.equipment.name, item.quantity]);
      });

      this.currentBackground.startingProfiencies = tempProficiencies;
      this.currentBackground.startingEquipment = tempEquipment;
      this.currentBackground.feature = [backgroundData.feature.name, backgroundData.feature.desc];

      this.backgroundUserLanguagesCount = backgroundData.language_options.choose;

      this.dndApiService.MiscQuery("/api/languages").subscribe((languageData) => {
        languageData.results.forEach((language: any) => {
          this.backgroundLanguageList.push([language.index, language.name]);
        });
        console.log(this.backgroundLanguageList);
      });


      this.updateCompletedStatus();

      console.log(this.currentBackground);
    });
  }

  updateBackgroundLanguage(languageIndex: string, languageName: string) {
    let charBackgroundInfo = this.currentChar.background;

    if(charBackgroundInfo.chosenLanguageIndexes == null) {
      charBackgroundInfo.chosenLanguageIndexes = [];
    }

    if(this.removeIfPresent(languageIndex, charBackgroundInfo.chosenLanguageIndexes)) {
      charBackgroundInfo.chosenLanguageIndexes.push([languageIndex, languageName]);
    }

    console.log(charBackgroundInfo.chosenLanguageIndexes);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  updateName() {
    this.currentChar.name = (document.getElementById("charName") as HTMLInputElement)?.value;
    console.log(this.currentChar);

    this.updateCompletedStatus();

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  ngOnInit(): void {
    //Gets a list of races from dnd api. Puts into raceList.
    this.dndApiService.RaceList().subscribe((data) => {
      let results = data.results;
      results.forEach((element: any) => {
        this.raceList.push(element);
      });
    });

    //Gets a list of backgrounds from dnd api. Puts into backgroundList.
    this.dndApiService.BackgroundList().subscribe((data) => {
      let results = data.results;
      results.forEach((element: any) => {
        this.backgroundList.push(element);
      });
    });

    this.currentChar = JSON.parse(String(sessionStorage.getItem('currentChar')));
    console.log(this.currentChar);
  }
}