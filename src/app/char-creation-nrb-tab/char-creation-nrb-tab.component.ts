import { Component, OnInit } from '@angular/core';
import { DndApiServiceService } from '../dnd-api-service.service';

@Component({
  selector: 'app-char-creation-nrb-tab',
  templateUrl: './char-creation-nrb-tab.component.html',
  styleUrls: ['./char-creation-nrb-tab.component.css']
})
export class CharCreationNrbTabComponent implements OnInit {

  constructor(private dndApiService: DndApiServiceService) { }

  raceList: any[] = [];

  backgroundList: any[] = [];

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
  }
}