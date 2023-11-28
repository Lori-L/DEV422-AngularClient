import { Component, OnInit } from '@angular/core';
import { charObject } from './charObject';
import { CharacterApiService } from '../character-api.service';

@Component({
  selector: 'app-create-edit-page',
  templateUrl: './create-edit-page.component.html',
  styleUrls: ['./create-edit-page.component.css']
})
export class CreateEditPageComponent implements OnInit {

  constructor(private characterApiService: CharacterApiService) {
    //used for navigation between steps
    let tabOrder: boolean[];
    let previousTab: number;
  }

  tabOrder = [true, false, false, false, false, false, false, false];
  requiredTabsComplete: boolean[] = [false, false, false, false, false];;
  minimumCompleted: boolean = false;
  previousTab = 0;

  currentChar: charObject = new charObject;

  updateCompletedTabs(change: any[]) {
    this.requiredTabsComplete[change[0]] = change[1];

    if(!this.requiredTabsComplete.includes(false)) {
      this.minimumCompleted = true;
    }

    console.log(this.requiredTabsComplete);
  }

  navTab(tabIndex: number) {
    this.tabOrder[this.previousTab] = false;
    this.tabOrder[tabIndex] = true;
    this.previousTab = tabIndex;
  }

  submitChar() {
    this.currentChar = JSON.parse(String(sessionStorage.getItem('currentChar')));
    let userId: any = localStorage.getItem('userId')?.replace(/['"]+/g, '');

    this.currentChar._userID = userId;

    console.log(this.currentChar);

    this.characterApiService.createFinishedChar(this.currentChar).subscribe((data: any) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    sessionStorage.setItem("classList", JSON.stringify([["Bard", 3], ["Barbarian", 1]]));
    sessionStorage.setItem("startingClass", "bard");
    
    let testChar: charObject = new charObject;
    sessionStorage.setItem("currentChar", JSON.stringify(testChar));
  }

}
