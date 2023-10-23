import { Component, OnInit } from '@angular/core';

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

  standardArray = false;
  manualEntry = false;
  pointBuy = false;
  selectedOption=''

  stats = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
  standardArraySet = [15, 14, 13, 12, 10, 8];

  enteredStats = [0,0,0,0,0,0];

  pointBuyPoints = 27;

  onSelect(value: string) {

  }

  ngOnInit(): void {
  }

}
