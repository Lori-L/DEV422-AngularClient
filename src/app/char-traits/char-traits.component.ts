import { Component, Input, OnInit } from '@angular/core';
import { DndApiServiceService } from '../dnd-api-service.service';

@Component({
  selector: 'app-char-traits',
  templateUrl: './char-traits.component.html',
  styleUrls: ['./char-traits.component.css'],
})
export class CharTraitsComponent implements OnInit {
  @Input() character: any;
  @Input() characterData: any;
  @Input() trait: any = [];
  constructor(private apiService: DndApiServiceService) {}

  ngOnInit(): void {
    this.apiService
      .RaceInfo(this.characterData.race.raceIndex)
      .subscribe((data: any) => {
        console.log(data);
        for (const trait of data.traits) {
          this.trait.push(trait);
        }
        console.log(this.trait);
      });
  }
}
