import { Component, Input, OnInit } from '@angular/core';
import { DndApiServiceService } from '../dnd-api-service.service';

@Component({
  selector: 'app-check-num-box',
  templateUrl: './check-num-box.component.html',
  styleUrls: ['./check-num-box.component.css'],
})
export class CheckNumBoxComponent implements OnInit {
  @Input() title: any;
  @Input() value: any;
  @Input() characterData: any;
  @Input() testing = ['strength', 'dexterity'];
  @Input() savingThrowsMapping = {
    strength: 'str',
    dexterity: 'dex',
    constitution: 'con',
    intelligence: 'int',
    wisdom: 'wis',
    charisma: 'cha',
  };
  savingThrows: string[] = [];
  isChecked = false;

  constructor(private apiService: DndApiServiceService) {}

  ngOnInit(): void {
    this.apiService
      .SingleClassData(this.characterData.classes[0].classIndex)
      .subscribe((data: any) => {
        if (data.saving_throws) {
          for (const i of data.saving_throws) {
            this.savingThrows.push(i.index);
          }
        }

        if (this.savingThrows.includes(this.title.slice(0, 3).toLowerCase())) {
          if (this.title === 'Intimidation') {
            this.isChecked = this.isChecked;
          } else {
            this.isChecked = true;
          }
        }
      });

    this.apiService
      .RaceInfo(this.characterData.race.raceIndex)
      .subscribe((data: any) => {
        for (const i of data.starting_proficiencies) {
          const newArr = i.index.split('-');

          if (newArr[1].toLowerCase() === this.title.toLowerCase()) {
            this.isChecked = true;
          }
        }
      });

    this.apiService
      .BackgroundInfo(this.characterData.background.backgroundIndex)
      .subscribe((data: any) => {
        for (const i of data.starting_proficiencies) {
          const newArr = i.index.split('-');

          if (newArr[1].toLowerCase() === this.title.toLowerCase()) {
            this.isChecked = true;
          }
        }
      });

    for (const i of this.characterData.classes[0].chosenProficiencyIndex) {
      const newArr = i[0].split('-');
      if (newArr[1].toLowerCase() === this.title.toLowerCase()) {
        this.isChecked = true;
      }
    }

    for (const i of this.characterData.race.chosenProficiencyIndex) {
      const newArr = i[0].split('-');
      if (newArr[1].toLowerCase() === this.title.toLowerCase()) {
        this.isChecked = true;
      }
    }
  }
}
