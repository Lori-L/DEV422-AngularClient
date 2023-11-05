import { Component, Inject, Input, OnInit } from '@angular/core';
import { CharacterApiService } from '../character-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-char-dialog',
  templateUrl: './delete-char-dialog.component.html',
  styleUrls: ['./delete-char-dialog.component.css'],
})
export class DeleteCharDialogComponent implements OnInit {
  constructor(
    private characterApiService: CharacterApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private location: Location
  ) {
    this.characterId = '';
  }

  @Input() characterId: any;

  ngOnInit(): void {}

  async Delete() {
    console.log(this.data);
    await this.characterApiService
      .deleteCharacter(this.data)
      .subscribe((data: any) => {
        console.log(data);
      });

    this.characterApiService
      .getCharacters(localStorage.getItem('userId') as string)
      .subscribe((data: any) => {
        console.log(data);
        window.location.reload();
      });
  }
}
