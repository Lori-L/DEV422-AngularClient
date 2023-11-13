import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-char-attack-spellcasting',
  templateUrl: './char-attack-spellcasting.component.html',
  styleUrls: ['./char-attack-spellcasting.component.css'],
})
export class CharAttackSpellcastingComponent implements OnInit {
  @Input() character: any;
  @Input() characterData: any;
  constructor() {}

  ngOnInit(): void {}
}
