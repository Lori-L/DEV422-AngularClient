import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-char-attacks',
  templateUrl: './char-attacks.component.html',
  styleUrls: ['./char-attacks.component.css'],
})
export class CharAttacksComponent implements OnInit {
  @Input() character: any;
  @Input() characterData: any;
  @Input() apiInfo: any;
  armorTitle = ['Armor Class', 'Initiative', 'Speed'];
  constructor() {}

  ngOnInit(): void {}
}
