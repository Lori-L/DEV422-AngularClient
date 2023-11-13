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
}
