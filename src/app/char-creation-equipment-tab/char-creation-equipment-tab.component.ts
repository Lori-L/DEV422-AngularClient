import { Component, OnInit } from '@angular/core';
import { charObject } from '../create-edit-page/charObject';
import { classObject } from '../create-edit-page/classObject';

@Component({
  selector: 'app-char-creation-equipment-tab',
  templateUrl: './char-creation-equipment-tab.component.html',
  styleUrls: ['./char-creation-equipment-tab.component.css']
})
export class CharCreationEquipmentTabComponent implements OnInit {

  constructor() { 
    let charItems: string[];
  }

  currentChar: charObject = new charObject;

  charItems = [
    "item1", "item2", "item3"
  ];

  addItems(itemsArray: string[]) {
    itemsArray.forEach(element => {
      this.currentChar.inventoryItemsIndexes.push(element);
    });
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  startingClass?: string;

  ngOnInit(): void {
    this.currentChar = JSON.parse(String(sessionStorage.getItem('currentChar')));
    console.log(this.currentChar);

    //  TODO: add in default class equipment depending on startingClass value
    if(this.currentChar.classes.length > 0) {
      this.startingClass = this.currentChar.classes[0].classIndex;
    }
    else{
      this.startingClass = undefined;
    }
  }

}
