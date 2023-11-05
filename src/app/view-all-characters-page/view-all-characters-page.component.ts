import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { MatDialog } from '@angular/material/dialog';
import { CharacterApiService } from '../character-api.service';

@Component({
  selector: 'app-view-all-characters-page',
  templateUrl: './view-all-characters-page.component.html',
  styleUrls: ['./view-all-characters-page.component.css'],
})
export class ViewAllCharactersPageComponent implements OnInit {
  characters: any[] = [];

  constructor(
    private userApiService: UserApiService,
    private dialog: MatDialog,
    private characterApiService: CharacterApiService
  ) {}

  ngOnInit(): void {
    // get user data

    let userId = localStorage.getItem('userId') ?? '';

    userId = userId.replace(/['"]+/g, '');

    this.characterApiService
      .getCharacters(userId ?? '')
      .subscribe((data: any) => {
        this.characters = data.result;
        console.log(this.characters);
      });
  }

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

  createTestChars() {
    this.characterApiService.createTestChars().subscribe((data: any) => {
      window.location.reload();
    });
  }
}

// sort character array by favorite attribute
// this.characterArray.sort((a, b) => {
//   // First, compare by the "favorite" attribute
//   if (a.favorite === b.favorite) {
//     // If they have the same "favorite" status, compare by name
//     return a.name.localeCompare(b.name);
//   } else {
//     // Sort by "favorite" with favorites first
//     return a.favorite ? -1 : 1;
//   }
// });
