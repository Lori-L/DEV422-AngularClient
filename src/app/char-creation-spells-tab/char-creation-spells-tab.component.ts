import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-char-creation-spells-tab',
  templateUrl: './char-creation-spells-tab.component.html',
  styleUrls: ['./char-creation-spells-tab.component.css']
})
export class CharCreationSpellsTabComponent implements OnInit {

  constructor() { 
    let charSpells: number[][];
    let charClass: string;
  }

  charSpells = [ //spell level, then how many spells slots of that level they have
    [0, 999],
    [1, 4],
    [2, 3],
    [3, 2]
  ];

  charClass = "Wizard";

  ngOnInit(): void {
  }

}
