import { Component, OnInit } from '@angular/core';
import { charObject } from '../create-edit-page/charObject';
import { personalityObject } from '../create-edit-page/personalityObject';

@Component({
  selector: 'app-char-creation-personality-tab',
  templateUrl: './char-creation-personality-tab.component.html',
  styleUrls: ['./char-creation-personality-tab.component.css']
})
export class CharCreationPersonalityTabComponent implements OnInit {

  constructor() { }

  currentChar: charObject = new charObject;

  updateAlignment() {
    if(this.currentChar.personality == null) {
      this.currentChar.personality = new personalityObject;
    }

    this.currentChar.personality.alignmentIndex = (document.getElementById("alignment") as HTMLSelectElement)?.value;
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  updateTraits() {
    if(this.currentChar.personality == null) {
      this.currentChar.personality = new personalityObject;
    }

    this.currentChar.personality.personalityTraits = (String((document.getElementById("userTrait") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  updateIdeals() {
    if(this.currentChar.personality == null) {
      this.currentChar.personality = new personalityObject;
    }

    this.currentChar.personality.ideals = (String((document.getElementById("userIdeal") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  updateBonds() {
    if(this.currentChar.personality == null) {
      this.currentChar.personality = new personalityObject;
    }

    this.currentChar.personality.bonds = (String((document.getElementById("userBond") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  updateFlaws() {
    if(this.currentChar.personality == null) {
      this.currentChar.personality = new personalityObject;
    }

    this.currentChar.personality.flaws = (String((document.getElementById("userFlaw") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  ngOnInit(): void {
    this.currentChar = JSON.parse(String(sessionStorage.getItem('currentChar')));
    console.log(this.currentChar);
  }

}
