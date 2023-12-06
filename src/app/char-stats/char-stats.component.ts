import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-char-stats',
  templateUrl: './char-stats.component.html',
  styleUrls: ['./char-stats.component.css'],
})
export class CharStatsComponent implements OnInit {
  title = ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha'];
  @Input() character: any;
  @Input() characterData: any;

  constructor() {}

  findModifier(abilityScore: number) {
    return Math.floor(( abilityScore - 10) / 2);
  }

  ngOnInit(): void {}
}
