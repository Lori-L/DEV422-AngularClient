import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-sheet-page0',
  templateUrl: './single-sheet-page0.component.html',
  styleUrls: ['./single-sheet-page0.component.css'],
})
export class SingleSheetPage0Component implements OnInit {
  @Input() character: any;
  @Input() characterData: any;
  constructor() {}

  ngOnInit(): void {}
}
