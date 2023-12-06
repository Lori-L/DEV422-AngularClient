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
        for (const trait of data.traits) {
          this.apiService.TraitData(trait.index).subscribe((data) => {
            this.trait.push([trait.name, data.desc]);
          });
        }
      });

    this.apiService
      .ClassLevelsData(this.characterData.classes[0].classIndex)
      .subscribe((data: any) => {
        for (const i of data) {
          for (const j of i.features) {
            this.apiService.FeatureData(j.index).subscribe((data) => {
              this.trait.push([data.name, data.desc]);
            });
          }
        }
      });

    this.apiService
      .BackgroundInfo(this.characterData.background.backgroundIndex)
      .subscribe((data: any) => {
        this.trait.push([data.feature.name, data.feature.desc]);
      });
  }
}
