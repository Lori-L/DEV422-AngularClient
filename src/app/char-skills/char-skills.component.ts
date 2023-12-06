import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-char-skills',
  templateUrl: './char-skills.component.html',
  styleUrls: ['./char-skills.component.css'],
})
export class CharSkillsComponent implements OnInit {
  proficiencyTitle = 'Proficiency Bonus';
  inspirationTitle = 'Inspiration';
  strengthTitle = 'Strength';
  dexterityTitle = 'Dexerity';
  constitutionTitle = 'Constitution';
  intelligenceTitle = 'Intelligence';
  wisdomTitle = 'Wisdom';
  charismaTitle = 'Charisma';
  acrobaticsTitle = 'Acrobatics';
  animalHandlingTitle = 'Animal Handling';
  arcanaTitle = 'Arcana';
  athleticsTitle = 'Athletics';
  deceptionTitle = 'Deception';
  historyTitle = 'History';
  insightTitle = 'Insight';
  intimidationTitle = 'Intimidation';
  investigationTitle = 'Investigation';
  medicineTitle = 'Medicine';
  natureTitle = 'Nature';
  perceptionTitle = 'Perception';
  performanceTitle = 'Performance';
  persuasionTitle = 'Persuasion';
  religionTitle = 'Religion';
  sleightOfHandTitle = 'Sleight of Hand';
  stealthTitle = 'Stealth';
  survivalTitle = 'Survival';

  @Input() character: any;
  @Input() characterData: any;
  @Input() apiInfo: any;
  constructor() {}

  findModifier(abilityScore: number) {
    return Math.floor(( abilityScore - 10) / 2);
  }

  returnProficiency() {
    return Math.ceil(this.characterData.overallLevel / 4) + 1;
  }

  ngOnInit(): void {}
}
