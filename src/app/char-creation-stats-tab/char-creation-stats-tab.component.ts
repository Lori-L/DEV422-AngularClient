import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { charObject } from '../create-edit-page/charObject';

@Component({
  selector: 'app-char-creation-stats-tab',
  templateUrl: './char-creation-stats-tab.component.html',
  styleUrls: ['./char-creation-stats-tab.component.css']
})
export class CharCreationStatsTabComponent implements OnInit {

  constructor() {
    let standardArrayChosen:boolean;
    let manualEntryChosen:boolean
    let pointBuyChosen:boolean;
    let selectedOption;

    let standardArraySet: number[];
    let stats: string[];

    let enteredStats: number[];

    let pointBuyPoints: number;
  }

  @Output() completionUpdater = new EventEmitter();

  currentChar: charObject = new charObject;

  standardArray = false;
  manualEntry = false;
  pointBuy = false;
  selectedOption=''

  stats = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
  standardArraySet = [15, 14, 13, 12, 10, 8];

  pointBuyPoints = 27;

  //event emitter shenanigans
  //indicates whether the stats tab is considered "complete" for the purpose of the "finish and view character" button appearing
  //conditions to be met: all ability scores have been modified (have a nonzero value)
  updateCompletedStatus() {
    if(this.currentChar.abilityScores.includes(0) == false) {
      this.completionUpdater.emit([2, true]);
    }
    else {
      this.completionUpdater.emit([2, false]);
    }
  }

  //changes the ability score (corresponding to the passed-in index) on the character object
  updateStat(ind: number) {
    this.currentChar.abilityScores[ind] = Number((document.getElementById("manualEntry" + ind) as HTMLInputElement)?.value);
    console.log(this.currentChar);

    this.updateCompletedStatus();

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //used for displaying the currently chosen generation method / hiding the other two (done through *ngIf statements in the html)
  //changes the "selected option" from the previously displayed generation method to the current one
  //turns the previous generation method false, and the current one true
  newGenMethod() {
    switch(this.selectedOption) {
      case "standardArray": {
        this.standardArray = false;
        break;
      }
      case "manualEntry": {
        this.manualEntry = false;
        break;
      }
      case "pointBuy": {
        this.pointBuy = false;
        break;
      }
    }

    switch((document.getElementById("generationMethod") as HTMLSelectElement)?.value) {
      case "standardArray": {
        this.standardArray = true;
        this.selectedOption = "standardArray";
        break;
      }
      case "manualEntry": {
        this.manualEntry = true;
        this.selectedOption = "manualEntry";
        break;
      }
      case "pointBuy": {
        this.pointBuy = true;
        this.selectedOption = "pointBuy";
        break;
      }
    }
  }

  //takes in the current character object
  ngOnInit(): void {
    this.currentChar = JSON.parse(String(sessionStorage.getItem('currentChar')));
    console.log(this.currentChar);

  }

}
