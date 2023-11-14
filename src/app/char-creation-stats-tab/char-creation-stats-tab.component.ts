import { Component, OnInit } from '@angular/core';
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

  currentChar: charObject = new charObject;

  standardArray = false;
  manualEntry = false;
  pointBuy = false;
  selectedOption=''

  stats = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
  standardArraySet = [15, 14, 13, 12, 10, 8];

  enteredStats = [0,0,0,0,0,0];

  pointBuyPoints = 27;

  updateStat(ind: number) {
    this.currentChar.abilityScores[ind] = Number((document.getElementById("manualEntry" + ind) as HTMLInputElement)?.value);
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

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

  ngOnInit(): void {
    this.currentChar = JSON.parse(String(sessionStorage.getItem('currentChar')));
    console.log(this.currentChar);

  }

}
