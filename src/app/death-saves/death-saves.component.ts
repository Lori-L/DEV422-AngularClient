import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-death-saves',
  templateUrl: './death-saves.component.html',
  styleUrls: ['./death-saves.component.css'],
})
export class DeathSavesComponent implements OnInit {
  @Input() character: any;
  @Input() characterData: any;
  constructor() {}

  ngOnInit(): void {}
}
