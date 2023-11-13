import { Component, Inject, Input, OnInit } from '@angular/core';
import { CharacterApiService } from '../character-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-char-dialog',
  templateUrl: './delete-char-dialog.component.html',
  styleUrls: ['./delete-char-dialog.component.css'],
})
export class DeleteCharDialogComponent implements OnInit {
  constructor(
    private characterApiService: CharacterApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  async Delete() {
    await this.characterApiService
      .deleteCharacter(this.data)
      .subscribe((data: any) => {
        window.location.reload();
      });
  }
}
