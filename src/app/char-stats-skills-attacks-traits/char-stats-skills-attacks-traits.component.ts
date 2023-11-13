import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-char-stats-skills-attacks-traits',
  templateUrl: './char-stats-skills-attacks-traits.component.html',
  styleUrls: ['./char-stats-skills-attacks-traits.component.css'],
})
export class CharStatsSkillsAttacksTraitsComponent implements OnInit {
  @Input() character: any;
  @Input() characterData: any;
  constructor() {}

  ngOnInit(): void {}
}
