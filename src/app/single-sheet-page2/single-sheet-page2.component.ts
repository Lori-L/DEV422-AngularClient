import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-sheet-page2',
  templateUrl: './single-sheet-page2.component.html',
  styleUrls: ['./single-sheet-page2.component.css'],
})
export class SingleSheetPage2Component implements OnInit {
  @Input() character: any;
  @Input() characterData: any;
  constructor() {}

  ngOnInit(): void {}
}
