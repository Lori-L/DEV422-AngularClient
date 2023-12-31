import { Component, OnInit } from '@angular/core';
import { CharacterApiService } from '../character-api.service';

@Component({
  selector: 'app-view-all-characters-page',
  templateUrl: './view-all-characters-page.component.html',
  styleUrls: ['./view-all-characters-page.component.css'],
})
export class ViewAllCharactersPageComponent implements OnInit {
  characters: any[] = [];

  constructor(private characterApiService: CharacterApiService) {}

  SortCharacters(chars: any[]): any[] {
    return chars.sort((a, b) => {
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

  ngOnInit(): void {
    // get user data

    sessionStorage.setItem("currentChar", 'e');

    let userId = localStorage.getItem('userId') ?? '';

    userId = userId.replace(/['"]+/g, '');

    this.characterApiService
      .getCharacters(userId ?? '')
      .subscribe((data: any) => {
        this.characters = data.result.sort((a: any, b: any) => {
          // First, compare by the "favorite" attribute
          if (a.favorite === b.favorite) {
            // If they have the same "favorite" status, compare by name
            return a.name.localeCompare(b.name);
          } else {
            // Sort by "favorite" with favorites first
            return a.favorite ? -1 : 1;
          }
        });
        console.log(this.characters);
      });
  }

  async createTestChars() {
    await this.characterApiService.createTestChars().subscribe((data: any) => {
      window.location.reload();
    });
  }
}
