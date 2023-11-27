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

  //updates the character's alignment (in the char's personality object)
  //creates a new personality object if it doesn't already exist
  updateAlignment() {
    if(this.currentChar.personality == null) {
      this.currentChar.personality = new personalityObject;
    }

    this.currentChar.personality.alignmentIndex = (document.getElementById("alignment") as HTMLSelectElement)?.value;
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //updates the character's personality traits (in the char's personality object)
  //creates a new personality object if it doesn't already exist
  updateTraits() {
    if(this.currentChar.personality == null) {
      this.currentChar.personality = new personalityObject;
    }

    this.currentChar.personality.personalityTraits = (String((document.getElementById("userTrait") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //updates the character's ideals (in the char's personality object)
  //creates a new personality object if it doesn't already exist
  updateIdeals() {
    if(this.currentChar.personality == null) {
      this.currentChar.personality = new personalityObject;
    }

    this.currentChar.personality.ideals = (String((document.getElementById("userIdeal") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //updates the character's bonds (in the char's personality object)
  //creates a new personality object if it doesn't already exist
  updateBonds() {
    if(this.currentChar.personality == null) {
      this.currentChar.personality = new personalityObject;
    }

    this.currentChar.personality.bonds = (String((document.getElementById("userBond") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //updates the character's flaws (in the char's personality object)
  //creates a new personality object if it doesn't already exist
  updateFlaws() {
    if(this.currentChar.personality == null) {
      this.currentChar.personality = new personalityObject;
    }

    this.currentChar.personality.flaws = (String((document.getElementById("userFlaw") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //takes in the current character object, then (as applicable) populates viewable fields with existing character info
  ngOnInit(): void {
    this.currentChar = JSON.parse(String(sessionStorage.getItem('currentChar')));
    console.log(this.currentChar);

    //populates fields if the info is already present in currentChar
    //checks to make sure the info exists first to prevent nullpointerexception
    if(this.currentChar.personality) {
      if(this.currentChar.personality.alignmentIndex) {
        (document.getElementById("alignment") as HTMLSelectElement).value = this.currentChar.personality.alignmentIndex;
      }

      if(this.currentChar.personality.personalityTraits) {
        (document.getElementById("userTrait") as HTMLInputElement).value = this.currentChar.personality.personalityTraits;
      }

      if(this.currentChar.personality.ideals) {
        (document.getElementById("userIdeal") as HTMLInputElement).value = this.currentChar.personality.ideals;
      }

      if(this.currentChar.personality.bonds) {
        (document.getElementById("userBond") as HTMLInputElement).value = this.currentChar.personality.bonds;
      }

      if(this.currentChar.personality.flaws) {
        (document.getElementById("userFlaw") as HTMLInputElement).value = this.currentChar.personality.flaws;
      }
    }
    
  }

}
