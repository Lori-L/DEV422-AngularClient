import { Component, OnInit } from '@angular/core';
import { DndApiServiceService } from '../dnd-api-service.service';
import { charObject } from '../create-edit-page/charObject';

@Component({
  selector: 'app-char-creation-nrb-tab',
  templateUrl: './char-creation-nrb-tab.component.html',
  styleUrls: ['./char-creation-nrb-tab.component.css']
})
export class CharCreationNrbTabComponent implements OnInit {

  constructor(private dndApiService: DndApiServiceService) { }

  raceList: any[] = [];

  backgroundList: any[] = [];

  currentChar: charObject = new charObject;

  //to make this secure even in the case of multiple tabs open, should first refresh currentChar from session storage
  //left out for now to avoid clutter and focus on more important functionality
  updateRace() {
    this.currentChar.race.raceIndex = (document.getElementById("charRace") as HTMLSelectElement)?.value;
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  updateBackground() {
    this.currentChar.background.backgroundIndex = (document.getElementById("charBackground") as HTMLSelectElement)?.value;
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  updateName() {
    this.currentChar.name = (document.getElementById("charName") as HTMLInputElement)?.value;
    console.log(this.currentChar);

    sessionStorage.setItem('currentChar', JSON.stringify(this.currentChar));
  }

  ngOnInit(): void {
    //Gets a list of races from dnd api. Puts into raceList.
    this.dndApiService.RaceList().subscribe((data) => {
      let results = data.results;
      results.forEach((element: any) => {
        this.raceList.push(element);
      });
    });

    //Gets a list of backgrounds from dnd api. Puts into backgroundList.
    this.dndApiService.BackgroundList().subscribe((data) => {
      let results = data.results;
      results.forEach((element: any) => {
        this.backgroundList.push(element);
      });
    });

    this.currentChar = JSON.parse(String(sessionStorage.getItem('currentChar')));
    console.log(this.currentChar);
  }
}