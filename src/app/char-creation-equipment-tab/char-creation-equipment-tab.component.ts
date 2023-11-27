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

  startingClass?: string;

  charItems = [
    "item1", "item2", "item3"
  ];

  chosenOptions: string[] = [];

  arcane_foci: string[][] = [];
  druidic_foci: string[][] = [];
  holy_symbols: string[][] = []; //[['amulet', 'Amulet'], ['emblem', 'Emblem'], ['reliquary', 'Reliquary']];
  martial_weapons: string[][] = [];
  martial_melee_weapons: string[][] = [];
  musical_instruments: string[][] = [];
  simple_weapons: string[][] = [];
  simple_melee_weapons: string[][] = [];

  //event emitter shenanigans
  //indicates whether the equipment tab is considered "complete" for the purpose of the "finish and view character" button appearing
  //conditions to be met: character has at least one item
  updateCompletedStatus() {
    if(this.currentChar.inventoryItemsIndexes.length > 0) {
      this.completionUpdater.emit([4, true]);
    }
    else {
      this.completionUpdater.emit([4, false]);
    }
  }

  //adds each item to the character object the specified amount of times
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

  //locates the specified select dropdown, and adds the selected item to the character object
  addItemsFromSelect(htmlId: string) {
    let temp: any[][] = [[(document.getElementById(htmlId) as HTMLSelectElement)?.value, 1]];

    this.addItems(temp);
  }

  //adds a set of "default" items to the character's inventory (depending on the character's class)
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

  //displays the specified section
  revealCategory(hiddenSelectID: string) {
    (document.getElementById(hiddenSelectID) as HTMLSelectElement).style.display = "block";
  }

  //updates the "startingEquipmentOptions" array (which stores user selections so they can be re-checked on component reload)
  updateSelected(newSelection: string) {
    this.chosenOptions.push(newSelection);

    sessionStorage.setItem('startingEquipmentOptions', JSON.stringify(this.chosenOptions));
  }

  //takes in the current character object and determines the character's "starting class"
  //distributes "default" starting items, if they haven't yet been received
  //stores previous starting equipment selections, if they exist
  //collects and stores item lists from relevant equipment categories
  ngOnInit(): void {
    this.currentChar = JSON.parse(String(sessionStorage.getItem('currentChar')));
    console.log(this.currentChar);

    if(sessionStorage.getItem('startingEquipmentOptions') == null) {
      sessionStorage.setItem('startingEquipmentOptions', JSON.stringify([]));
    }
    else{
      this.chosenOptions = JSON.parse(String(sessionStorage.getItem('startingEquipmentOptions')));
      console.log(this.chosenOptions);
    }


    if(this.currentChar.classes.length > 0) {
      this.startingClass = this.currentChar.classes[0].classIndex;

      if(this.currentChar.defaultStartingEquipmentCollected == false) {
        this.addDefaultItems(this.startingClass);
        this.currentChar.defaultStartingEquipmentCollected = true;
        sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));

        this.dndApiService.EquipmentCategoryData('arcane-foci').subscribe((data) => {
          let results = data.equipment;
          results.forEach((element: any) => {
            this.arcane_foci.push([element.index, element.name]);
          });
        });

        this.dndApiService.EquipmentCategoryData('druidic-foci').subscribe((data) => {
          let results = data.equipment;
          results.forEach((element: any) => {
            this.druidic_foci.push([element.index, element.name]);
          });
        });

        this.dndApiService.EquipmentCategoryData('holy-symbols').subscribe((data) => {
          let results = data.equipment;
          results.forEach((element: any) => {
            this.holy_symbols.push([element.index, element.name]);
          });
        });

        this.dndApiService.EquipmentCategoryData('martial-weapons').subscribe((data) => {
          let results = data.equipment;
          results.forEach((element: any) => {
            this.martial_weapons.push([element.index, element.name]);
          });
        });

        this.dndApiService.EquipmentCategoryData('martial-melee-weapons').subscribe((data) => {
          let results = data.equipment;
          results.forEach((element: any) => {
            this.martial_melee_weapons.push([element.index, element.name]);
          });
        });

        this.dndApiService.EquipmentCategoryData('musical-instruments').subscribe((data) => {
          let results = data.equipment;
          results.forEach((element: any) => {
            this.musical_instruments.push([element.index, element.name]);
          });
        });

        this.dndApiService.EquipmentCategoryData('simple-weapons').subscribe((data) => {
          let results = data.equipment;
          results.forEach((element: any) => {
            this.simple_weapons.push([element.index, element.name]);
          });
        });

        this.dndApiService.EquipmentCategoryData('simple-melee-weapons').subscribe((data) => {
          let results = data.equipment;
          results.forEach((element: any) => {
            this.simple_melee_weapons.push([element.index, element.name]);
          });
        });
      }
      
    }
    else{
      this.startingClass = undefined;
    }
  }

}
