import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-char-proficiencies-equipment-features',
  templateUrl: './char-proficiencies-equipment-features.component.html',
  styleUrls: ['./char-proficiencies-equipment-features.component.css'],
})
export class CharProficienciesEquipmentFeaturesComponent implements OnInit {
  @Input() characterData: any;
  constructor() {}

  ngOnInit(): void {}
}
