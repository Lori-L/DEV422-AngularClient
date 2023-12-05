import { Component, OnInit } from '@angular/core';
import { charObject } from './charObject';
import { CharacterApiService } from '../character-api.service';
import { ParamMap, Params, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-edit-page',
  templateUrl: './create-edit-page.component.html',
  styleUrls: ['./create-edit-page.component.css']
})
export class CreateEditPageComponent implements OnInit {

  constructor(private characterApiService: CharacterApiService, private _router: Router, private aRoute: ActivatedRoute) {
    //used for navigation between steps
    let tabOrder: boolean[];
    let previousTab: number;
  }

  tabOrder = [true, false, false, false, false, false, false, false];
  requiredTabsComplete: boolean[] = [false, false, false, false, false];;
  minimumCompleted: boolean = false;
  previousTab = 0;
  headerText: string = "Character Creator";

  canLoad: boolean = false;

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

    let hpValue: number = 0;
    let conModifier: number = Math.floor((this.currentChar.abilityScores[2] - 10) / 2);

    let totalCharLevel: number = 0;

    this.currentChar.classes.forEach(charClass => {
      let increaseBy: number = 0;

      switch(charClass.hitDie){
        case(6): {
          increaseBy = 4 + conModifier;
          break;
        }
        case(8): {
          increaseBy = 5 + conModifier;
          break;
        }
        case(10): {
          increaseBy = 6 + conModifier;
          break; 
        }
        case(12): {
          increaseBy = 7 + conModifier;
          break;
        }
      }

      hpValue += (increaseBy * charClass.classLevel);

      totalCharLevel += charClass.classLevel;
    });

    this.currentChar.hp.maxHP = hpValue;
    this.currentChar.hp.currentHP = hpValue;
    this.currentChar.overallLevel = totalCharLevel;

    //if the character already exists and is being edited, update
    if(this.currentChar.userId.length > 0) {
      this.characterApiService.updateExistingChar(this.currentChar).subscribe((data: any) => {
        console.log(data);

        this._router.navigate(['/character/' + data.message]);
      })
    }
    //else if the character is new, create
    else {
      let userId: any = localStorage.getItem('userId')?.replace(/['"]+/g, '');

      this.currentChar.startingEquipmentSelected = true;

      this.currentChar.userId = userId;
  
      console.log(this.currentChar);
  
      this.characterApiService.createFinishedChar(this.currentChar).subscribe((data: any) => {
        console.log(data);
  
        this._router.navigate(['/character/' + data.message]);
      });
    }
  }

  ngOnInit(): void {
    this.aRoute.params.subscribe((params: Params) => {
      const id = params['id'];
      console.log(id);

      if(id == 'newchar') {
        let newChar: charObject = new charObject;
        sessionStorage.setItem("currentChar", JSON.stringify(newChar));

        this.canLoad = true;
      }
      else {
        this.headerText = "Character Editor";
        this.requiredTabsComplete = [true, true, true, true, true];

        this.characterApiService.getCharacter(id).subscribe((data: any) => {
          console.log(data.result);

          let existingChar: charObject = data.result;
          sessionStorage.setItem("currentChar", JSON.stringify(existingChar));

          this.canLoad = true;
        })
      }
    });
  }

}
