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
  //indicates whether the nrb tab is considered "complete" for the purpose of the "finish and view character" button appearing
  //conditions to be met: character name exists AND a background is chosen AND a race is chosen
  updateCompletedStatus() {
    if(this.currentChar.name != '' && this.currentChar.background.backgroundIndex != '' && this.currentChar.race.raceIndex != '') {
      this.completionUpdater.emit([0, true]);
    }
    else {
      this.completionUpdater.emit([0, false]);
    }
  }

  //sets the current character's race according to user choice
  updateRace() {
    this.raceUserAbilitiesData = null;
    this.raceUserProficienciesData = null;
    this.raceUserLanguagesData = null;

    //reverts any ability score boosts from the previous race
    if(this.currentRace) {
      this.currentRace.raceAbilityBonuses.forEach(bonus => {
        switch(bonus[0]){
          case('str'): {
            this.currentChar.abilityScores[0] -= bonus[1];
            break;
          }
          case ('dex'):  {
            this.currentChar.abilityScores[1] -= bonus[1];
            break;
          }
          case('con'): {
            this.currentChar.abilityScores[2] -= bonus[1];
            break;
          }
          case('int'): {
            this.currentChar.abilityScores[3] -= bonus[1];
            break;
          }
          case('wis'): {
            this.currentChar.abilityScores[4] -= bonus[1];
            break;
          }
          case ('cha'): {
            this.currentChar.abilityScores[5] -= bonus[1];
            break;
          }
        }
      });
    }

    this.currentChar.race.raceIndex = (document.getElementById("charRace") as HTMLSelectElement)?.value;
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));

    this.establishRaceInfo();
  }

  //gathers relevant displayable race information based off of the current character's race
  //also checks if the race allows the user to choose ability score bonuses, proficiencies, and/or languages
  establishRaceInfo() {
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

        switch(element.ability_score.index){
          case('str'): {
            this.currentChar.abilityScores[0] += element.bonus;
            break;
          }
          case ('dex'):  {
            this.currentChar.abilityScores[1] += element.bonus;
            break;
          }
          case('con'): {
            this.currentChar.abilityScores[2] += element.bonus;
            break;
          }
          case('int'): {
            this.currentChar.abilityScores[3] += element.bonus;
            break;
          }
          case('wis'): {
            this.currentChar.abilityScores[4] += element.bonus;
            break;
          }
          case ('cha'): {
            this.currentChar.abilityScores[5] += element.bonus;
            break;
          }
        }
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

      //if the chosen race allows the user to choose proficiencies
      if(raceData.starting_proficiency_options) {
        this.raceUserProficienciesData = raceData.starting_proficiency_options;
        let data = this.raceUserProficienciesData;

        this.raceUserProficiencies = [];

        this.raceUserProficienciesCount = data.choose;

        data.from.options.forEach((proficiency: any) => {
          this.raceUserProficiencies?.push([proficiency.item.index, proficiency.item.name]);
        });
      }

      //if the chosen race allows the user to choose a language
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

  //adds / removes an ability bonus to / from the current character's race information
  //creates an ability bonuses array to the race object if it doesn't yet exist
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

  //adds / removes a proficiency to / from the current character's race information
  //creates a proficiencies array to the race object if it doesn't yet exist
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

  //adds / removes a language to / from the current character's race information
  //creates a languages array to the race object if it doesn't yet exist
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

  //sets the current character's background according to user choice
  updateBackground() {
    this.currentChar.background.backgroundIndex = (document.getElementById("charBackground") as HTMLSelectElement)?.value;
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));

    this.establishBackgroundInfo();
  }

  //gathers relevant displayable background information based off of the current character's background
  //also gathers a list of languages from which the user can choose for their character to learn
  establishBackgroundInfo() {
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

  //adds / removes a language to / from the current character's background information
  //creates a languages array to the background object if it doesn't yet exist
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

  //updates the current character's name according to user choice
  updateName() {
    this.currentChar.name = (document.getElementById("charName") as HTMLInputElement)?.value;
    console.log(this.currentChar);

    this.updateCompletedStatus();

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //returns true if specified option has previously been chosen by the user
  //used to determine whether or not to have it checked on component load
  nrbCheckboxes(abilityIndex: string, arrayChecked: any[][]) {
    let isPresent: boolean = false;

    arrayChecked.forEach((element: any) => {
      if(element[0] == abilityIndex) {
        isPresent = true;
      }
    });

    return isPresent;
  }

  //populating selections if the character object is already populated
  prePopulate() {
    try {
      if(this.currentChar.name.length > 0) {
        (document.getElementById("charName") as HTMLInputElement).value = this.currentChar.name;
      }
      if(this.currentChar.race.raceIndex.length > 0) {
        this.establishRaceInfo();
      }
      if(this.currentChar.background.backgroundIndex.length > 0) {
        this.establishBackgroundInfo();
      }
    } catch (error) {
      this.prePopulate;
    }
  }

  //gets a list of all API-available races and backgrounds
  //takes in the current character object and (as relevant) populates viewable fields with existing character info
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

    this.prePopulate();
    
  }
}