import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hp-container',
  templateUrl: './hp-container.component.html',
  styleUrls: ['./hp-container.component.css'],
})
export class HpContainerComponent implements OnInit {
  @Input() character: any;
  @Input() characterData: any;
  constructor() {}

  ngOnInit(): void {}

  updateCurrentHP(value: any) {
    this.characterData.hp.currentHP = parseInt(
      (event?.target as HTMLInputElement).value
    );
  }

  sendCurrentHP() {
    console.log('Sending current HP:', this.characterData);
  }

  updateTempHP(value: any) {
    this.characterData.hp.tempHP = parseInt(
      (event?.target as HTMLInputElement).value
    );
  }

  sendTempHP() {
    console.log('Sending temp HP:', this.characterData);
  }
}
