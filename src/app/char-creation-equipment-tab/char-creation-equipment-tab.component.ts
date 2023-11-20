import { Component, OnInit, Output, EventEmitter }from '@angular/core';
import { charObject } from '../create-edit-page/charObject';
import { classObject } from '../create-edit-page/classObject';
import { DndApiServiceService } from '../dnd-api-service.service';

@Component({
  selector: 'app-char-creation-equipment-tab',
  templateUrl: './char-creation-equipment-tab.component.html',
  styleUrls: ['./char-creation-equipment-tab.component.css']
})
export class CharCreationEquipmentTabComponent implements OnInit {

  constructor(private dndApiService: DndApiServiceService) { 
    let charItems: string[];
  }

  @Output() completionUpdater = new EventEmitter();

  currentChar: charObject = new charObject;

  charItems = [
    "item1", "item2", "item3"
  ];

  threeB: boolean = false;

  holy_symbols: string[][] = [['amulet', 'Amulet'], ['emblem', 'Emblem'], ['reliquary', 'Reliquary']];
  simple_weapons: string[][] = [['club', 'Club'], ['dagger', 'Dagger'], ['greatclub', 'Greatclub']];

  //event emitter shenanigans
  updateCompletedStatus() {
    if(this.currentChar.inventoryItemsIndexes.length > 0) {
      this.completionUpdater.emit([4, true]);
    }
    else {
      this.completionUpdater.emit([4, false]);
    }
  }

  addItems(itemsArray: any[][]) {
    itemsArray.forEach(element => {
      for(let i=0; i < element[1]; i++) {
        this.currentChar.inventoryItemsIndexes.push(element[0]);
      }
    });
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));

    this.updateCompletedStatus();
  }

  startingClass?: string;

  equipmentCategoryBreakdown(categoryName: string, arrayToEdit: string[][]) {
    let tempArray: string[][] = [];

    this.dndApiService.EquipmentCategoryData(categoryName).subscribe((catData) => {
      catData.equipment.forEach((item: any) => {
        tempArray.push([item.index, item.name]);
      });;

      arrayToEdit = tempArray;
      console.log(arrayToEdit);
    });
  }

  addDefaultItems(className: string) {
    switch(className) {
      case 'barbarian': {
        this.addItems([['explorers-pack', 1], ['javelin', 4]]);
        break;
      }
      case 'bard': {
        this.addItems([['leather-armor', 1], ['dagger', 1]]);
        break;
      }
      case 'cleric': {
        this.addItems([['shield', 1]]);
        break;
      }
      case 'druid': {
        this.addItems([['leather-armor', 1], ['explorers-pack', 1]]);
        break;
      }
      case 'fighter': { //fighter has no default starting items, they're all selected by the user
        break;
      }
      case 'monk': {
        this.addItems([['dart', 10]]);
        break;
      }
      case 'paladin': {
        this.addItems([['chain-mail', 1]]);
        break;
      }
      case 'ranger': {
        this.addItems([['longbow', 1], ['arrow', 20]]);
        break;
      }
      case 'rogue': {
        this.addItems([['leather-armor', 1], ['dagger', 2], ['thieves-tools', 1]]);
        break;
      }
      case 'sorcerer': {
        this.addItems([['dagger', 2]]);
        break;
      }
      case 'warlock': {
        this.addItems([['leather-armor', 1], ['dagger', 2]]);
        break;
      }
      case 'wizard': {
        this.addItems([['spellbook', 1]]);
        break;
      }
    }
  }

  ngOnInit(): void {
    this.currentChar = JSON.parse(String(sessionStorage.getItem('currentChar')));
    console.log(this.currentChar);


    if(this.currentChar.classes.length > 0) {
      this.startingClass = this.currentChar.classes[0].classIndex;

      if(this.currentChar.defaultStartingEquipmentCollected == false) {
        this.addDefaultItems(this.startingClass);
        this.currentChar.defaultStartingEquipmentCollected = true;
        sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
      }
      
    }
    else{
      this.startingClass = undefined;
    }
  }

}
