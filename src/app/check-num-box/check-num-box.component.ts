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

  savingThrows: string[] = [];
  isChecked = false;
  constructor(private apiService: DndApiServiceService) {}

  ngOnInit(): void {
    console.log(this.characterData.classes[0].classIndex, this.value);

    this.apiService
      .SingleClassData(this.characterData.classes[0].classIndex)
      .subscribe((data: any) => {
        if (data.saving_throws) {
          for (const i of data.saving_throws) {
            this.savingThrows.push(i.index);
          }
        }

        if (this.savingThrows.includes(this.title.slice(0, 3).toLowerCase())) {
          this.isChecked = true;
        }

        console.log(this.savingThrows);
      });

    // if (
    //   this.characterData.savingThrows.includes(
    //     this.title.slice(0, 3).toLowerCase()
    //   )
    // ) {
    //   this.isChecked = true;
    // }

    // console.log(this.savingThrows, this.title.slice(0, 3).toLowerCase());
    // console.log(this.savingThrows[0] == this.title.slice(0, 3).toLowerCase());
  }
}
