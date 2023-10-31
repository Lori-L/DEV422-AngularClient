import { Component, OnInit } from '@angular/core';
import { Character } from '../character-card/character-card.component';
import { CreateUserPaylaod, User, UserApiService } from '../user-api.service';

@Component({
  selector: 'app-view-all-characters-page',
  templateUrl: './view-all-characters-page.component.html',
  styleUrls: ['./view-all-characters-page.component.css'],
})
export class ViewAllCharactersPageComponent implements OnInit {
  data: CreateUserPaylaod = {} as CreateUserPaylaod;

  characterArray: Character[] = [
    {
      id: '123',
      name: 'Jacob Solvang',
      race: 'Dragonborn',
      class: 'Paladin',
      level: 'Level 22',
      favorite: false,
    },
    {
      id: '456',
      name: 'Lori Latchinian',
      race: 'Elf',
      class: 'Druid',
      level: 'Level 38',
      favorite: false,
    },
    {
      id: '789',
      name: 'Gabriel Blake',
      race: 'Tiefling',
      class: 'Rogue',
      level: 'Level 7',
      favorite: true,
    },
    // Add more characters as needed
  ];

  constructor(private userApiService: UserApiService) {}

  ngOnInit(): void {
    // sort character array by favorite attribute
    this.characterArray.sort((a, b) => {
      // First, compare by the "favorite" attribute
      if (a.favorite === b.favorite) {
        // If they have the same "favorite" status, compare by name
        return a.name.localeCompare(b.name);
      } else {
        // Sort by "favorite" with favorites first
        return a.favorite ? -1 : 1;
      }
    });
  }
}
