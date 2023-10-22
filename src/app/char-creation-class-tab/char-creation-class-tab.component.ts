import { Component, OnInit } from '@angular/core';
import { CharClasses } from './charClasses';

@Component({
  selector: 'app-char-creation-class-tab',
  templateUrl: './char-creation-class-tab.component.html',
  styleUrls: ['./char-creation-class-tab.component.css']
})
export class CharCreationClassTabComponent implements OnInit {

  constructor() {

    //class(es) tab
    let totalLevel: number;
    let classes: CharClasses[] [];
  }
  
  classes = [
    {charClass: "rogue", level: 1, spellcaster: false},
    {charClass: "sorcerer", level: 1, spellcaster: true},
    {charClass: "bard", level: 1, spellcaster: true},
    {charClass: "wizard", level: 1, spellcaster: true},
    {charClass: "barbarian", level: 1, spellcaster: false},
  ];

  totalLevel = 1;
  ngOnInit(): void {
  }

}