import { Component, OnInit } from '@angular/core';
import { CharClasses } from '../char-creation-class-tab/charClasses';

@Component({
  selector: 'app-create-edit-page',
  templateUrl: './create-edit-page.component.html',
  styleUrls: ['./create-edit-page.component.css']
})
export class CreateEditPageComponent implements OnInit {

  constructor() {
    //used for navigation between steps
    let tabOrder: boolean[];
    let previousTab: number;
  }

  tabOrder = [true, false, false, false, false, false, false, false];
  previousTab = 0;

  navTab(tabIndex: number) {
    this.tabOrder[this.previousTab] = false;
    this.tabOrder[tabIndex] = true;
    this.previousTab = tabIndex;
  }

  ngOnInit(): void {
  }

}
