import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css'],
})
export class CharacterCardComponent implements OnInit {
  constructor() {
    this.character = {} as Character;
  }

  @Input() character: Character;

  ngOnInit(): void {}

  showStartIcon: boolean = false;

  toggleStartIcon(): void {
    this.showStartIcon = !this.showStartIcon;
  }
}

export type Character = {
  name: string;
  race: string;
  class: string;
  level: string;
};
