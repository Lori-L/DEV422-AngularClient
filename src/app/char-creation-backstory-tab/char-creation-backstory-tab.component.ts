import { Component, OnInit } from '@angular/core';
import { charObject } from '../create-edit-page/charObject';

@Component({
  selector: 'app-char-creation-backstory-tab',
  templateUrl: './char-creation-backstory-tab.component.html',
  styleUrls: ['./char-creation-backstory-tab.component.css']
})
export class CharCreationBackstoryTabComponent implements OnInit {

  constructor() { }

  currentChar: charObject = new charObject;

  //updates the character's backstory property
  updateBackstory() {
    this.currentChar.backstory = (document.getElementById("charBackstory") as HTMLInputElement)?.value;
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  //takes in the current character object and (if it exists) uses its existing backstory info to populate the viewable field
  ngOnInit(): void {
    this.currentChar = JSON.parse(String(sessionStorage.getItem('currentChar')));
    console.log(this.currentChar);

    //populates fields if the info is already present in currentChar
    if(this.currentChar.backstory) {
      (document.getElementById("charBackstory") as HTMLInputElement).value = this.currentChar.backstory;
    }
  }

}
