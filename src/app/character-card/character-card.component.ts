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

  toggleFavorite(): void {
    this.character.favorite = !this.character.favorite;
    // send an update request to the server to update the favorite attribute
  }
}

export type Character = {
  id: string;
  name: string;
  race: string;
  class: string;
  level: string;
  favorite: boolean;
};
