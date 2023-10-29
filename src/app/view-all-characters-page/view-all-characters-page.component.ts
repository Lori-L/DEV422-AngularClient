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
      name: 'Jacob Solvang',
      race: 'Dragonborn',
      class: 'Paladin',
      level: 'Level 22',
    },
    {
      name: 'Lori Latchinian',
      race: 'Elf',
      class: 'Druid',
      level: 'Level 38',
    },
    {
      name: 'Gabriel Blake',
      race: 'Tiefling',
      class: 'Rogue',
      level: 'Level 7',
    },
    // Add more characters as needed
  ];

  constructor(private userApiService: UserApiService) {}

  ngOnInit(): void {}
}
