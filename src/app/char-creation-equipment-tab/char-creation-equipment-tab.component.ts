import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-char-creation-equipment-tab',
  templateUrl: './char-creation-equipment-tab.component.html',
  styleUrls: ['./char-creation-equipment-tab.component.css']
})
export class CharCreationEquipmentTabComponent implements OnInit {

  constructor() { 
    let charItems: string[];
  }

  charItems = [
    "item1", "item2", "item3"
  ];

  ngOnInit(): void {
  }

}
