import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteCharDialogComponent } from '../delete-char-dialog/delete-char-dialog.component';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css'],
})
export class CharacterCardComponent implements OnInit {
  constructor(private dialog: MatDialog) {
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
