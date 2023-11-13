import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteCharDialogComponent } from '../delete-char-dialog/delete-char-dialog.component';

import { CharacterApiService } from '../character-api.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css'],
})
export class CharacterCardComponent implements OnInit {
  constructor(private dialog: MatDialog, private characterApiService: CharacterApiService) {
    this.character = {} as any;
  }

  @Input() character: any;

  openDelete(id: string) {
    this.dialog.open(DeleteCharDialogComponent, {
      data: id,
    });
  }

  ngOnInit(): void {}

  showStartIcon: boolean = false;

  toggleFavorite(): void {
    this.character.favorite = !this.character.favorite;
    // send an update request to the server to update the favorite attribute
    if (this.character.favorite == true) {
      this.characterApiService.favoriteCharacter(this.character._id)
      .subscribe((data: any) => {
        window.location.reload();
      });;
    }
    else {
      this.characterApiService.unfavoriteCharacter(this.character._id)
        .subscribe((data: any) => {
          window.location.reload();
        });;
    }
  }
}

export type Character = {
  id: string;
  name: string;
  race: string;
  class: Array<any>;
  level: string;
  favorite: boolean;
};
