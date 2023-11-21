import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-sheet-page1',
  templateUrl: './single-sheet-page1.component.html',
  styleUrls: ['./single-sheet-page1.component.css']
})
export class SingleSheetPage1Component implements OnInit {
  @Input() character: any;
  @Input() characterData: any;
  constructor() { }

  ngOnInit(): void {
  }

}
