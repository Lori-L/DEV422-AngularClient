import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-sheet-page2',
  templateUrl: './single-sheet-page2.component.html',
  styleUrls: ['./single-sheet-page2.component.css'],
})
export class SingleSheetPage2Component implements OnInit {
  @Input() character: any;
  @Input() characterData: any;
  @Input() apiService: any;
  @Input() apiInfo: any;
  constructor() {}


  returnProficiency() {
    return Math.ceil(this.characterData.overallLevel / 4) + 1;
  }

  findModifier(abilityScore: number) {
    return Math.floor(( abilityScore - 10) / 2);
  }

  returnSpellcastingModifier() {
    let spellCastingAbility: string = this.characterData.classes[0].spellcasterInfo.spellCastingAbility;

    switch(spellCastingAbility) {
      case ('int'): {
        return this.findModifier(this.characterData.abilityScores[3]);
      }
      case('wis'): {
        return this.findModifier(this.characterData.abilityScores[4]);
      }
      case('cha'): {
        return this.findModifier(this.characterData.abilityScores[5]);
      }
      default: {
        return 0;
      }
    }
  }

  ngOnInit(): void {
  }
}
