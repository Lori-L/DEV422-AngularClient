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

  updateAge() {
    if(this.currentChar.appearance == null) {
      this.currentChar.appearance = new appearanceObject;
    }

    this.currentChar.appearance.age = (String((document.getElementById("charAge") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  updateHeight() {
    if(this.currentChar.appearance == null) {
      this.currentChar.appearance = new appearanceObject;
    }

    this.currentChar.appearance.height = (String((document.getElementById("charHeight") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  updateWeight() {
    if(this.currentChar.appearance == null) {
      this.currentChar.appearance = new appearanceObject;
    }

    this.currentChar.appearance.weight = (String((document.getElementById("charWeight") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  updateEyes() {
    if(this.currentChar.appearance == null) {
      this.currentChar.appearance = new appearanceObject;
    }

    this.currentChar.appearance.eyes = (String((document.getElementById("charEyes") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  updateSkin() {
    if(this.currentChar.appearance == null) {
      this.currentChar.appearance = new appearanceObject;
    }

    this.currentChar.appearance.skin = (String((document.getElementById("charSkin") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  updateHair() {
    if(this.currentChar.appearance == null) {
      this.currentChar.appearance = new appearanceObject;
    }

    this.currentChar.appearance.hair = (String((document.getElementById("charHair") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  updateAdditionalNotes() {
    if(this.currentChar.appearance == null) {
      this.currentChar.appearance = new appearanceObject;
    }

    this.currentChar.appearance.otherNotes = (String((document.getElementById("charAppearanceNotes") as HTMLInputElement)?.value));
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  ngOnInit(): void {
    this.currentChar = JSON.parse(String(sessionStorage.getItem('currentChar')));
    console.log(this.currentChar);
  }

}
