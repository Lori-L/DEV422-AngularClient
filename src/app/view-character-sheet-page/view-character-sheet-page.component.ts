import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-character-sheet-page',
  templateUrl: './view-character-sheet-page.component.html',
  styleUrls: ['./view-character-sheet-page.component.css'],
})
export class ViewCharacterSheetPageComponent implements OnInit {
  @Input() characterData: any;
  character = {
    name: "Gabriel Blake",
    
  }
  constructor() {}

  ngOnInit(): void {
    
  }
}
