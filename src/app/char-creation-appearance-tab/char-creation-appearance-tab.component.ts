import { Component, OnInit } from '@angular/core';
import { charObject } from '../create-edit-page/charObject';
import { appearanceObject } from '../create-edit-page/appearanceObject';

@Component({
  selector: 'app-char-creation-appearance-tab',
  templateUrl: './char-creation-appearance-tab.component.html',
  styleUrls: ['./char-creation-appearance-tab.component.css']
})
export class CharCreationAppearanceTabComponent implements OnInit {

  constructor() { }

  currentChar: charObject = new charObject;

  //updates the character's age information (in the char's appearance object)
  //creates a new appearance object if it doesn't already exist
  updateAge() {
    if(this.currentChar.appearance == null) {
      this.currentChar.appearance = new appearanceObject;
    }

    this.currentChar.appearance.age = (String((document.getElementById("charAge") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //updates the character's height information (in the char's appearance object)
  //creates a new appearance object if it doesn't already exist
  updateHeight() {
    if(this.currentChar.appearance == null) {
      this.currentChar.appearance = new appearanceObject;
    }

    this.currentChar.appearance.height = (String((document.getElementById("charHeight") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //updates the character's weight information (in the char's appearance object)
  //creates a new appearance object if it doesn't already exist
  updateWeight() {
    if(this.currentChar.appearance == null) {
      this.currentChar.appearance = new appearanceObject;
    }

    this.currentChar.appearance.weight = (String((document.getElementById("charWeight") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //updates the character's eyes information (in the char's appearance object)
  //creates a new appearance object if it doesn't already exist
  updateEyes() {
    if(this.currentChar.appearance == null) {
      this.currentChar.appearance = new appearanceObject;
    }

    this.currentChar.appearance.eyes = (String((document.getElementById("charEyes") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //updates the character's skin information (in the char's appearance object)
  //creates a new appearance object if it doesn't already exist
  updateSkin() {
    if(this.currentChar.appearance == null) {
      this.currentChar.appearance = new appearanceObject;
    }

    this.currentChar.appearance.skin = (String((document.getElementById("charSkin") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //updates the character's hair information (in the char's appearance object)
  //creates a new appearance object if it doesn't already exist
  updateHair() {
    if(this.currentChar.appearance == null) {
      this.currentChar.appearance = new appearanceObject;
    }

    this.currentChar.appearance.hair = (String((document.getElementById("charHair") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //updates the character's additional appearance notes (in the char's appearance object)
  //creates a new appearance object if it doesn't already exist
  updateAdditionalNotes() {
    if(this.currentChar.appearance == null) {
      this.currentChar.appearance = new appearanceObject;
    }

    this.currentChar.appearance.otherNotes = (String((document.getElementById("charAppearanceNotes") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //takes in the current character object and (as relevant) populates viewable fields with existing character info
  ngOnInit(): void {
    this.currentChar = JSON.parse(String(sessionStorage.getItem('currentChar')));
    console.log(this.currentChar);

    //populates fields if the info is already present in currentChar
    //checks to make sure the info exists first to prevent nullpointerexception
    if(this.currentChar.appearance) {
      if(this.currentChar.appearance.age) {
        (document.getElementById("charAge") as HTMLInputElement).value = this.currentChar.appearance.age;
      }

      if(this.currentChar.appearance.height) {
        (document.getElementById("charHeight") as HTMLInputElement).value = this.currentChar.appearance.height;
      }

      if(this.currentChar.appearance.weight) {
        (document.getElementById("charWeight") as HTMLInputElement).value = this.currentChar.appearance.weight;
      }

      if(this.currentChar.appearance.eyes) {
        (document.getElementById("charEyes") as HTMLInputElement).value = this.currentChar.appearance.eyes;
      }

      if(this.currentChar.appearance.skin) {
        (document.getElementById("charSkin") as HTMLInputElement).value = this.currentChar.appearance.skin;
      }

      if(this.currentChar.appearance.hair) {
        (document.getElementById("charHair") as HTMLInputElement).value = this.currentChar.appearance.hair;
      }

      if(this.currentChar.appearance.otherNotes) {
        (document.getElementById("charAppearanceNotes") as HTMLInputElement).value = this.currentChar.appearance.otherNotes;
      }
    }
  }

}
