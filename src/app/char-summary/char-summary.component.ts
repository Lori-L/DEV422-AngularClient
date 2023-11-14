import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-char-summary',
  templateUrl: './char-summary.component.html',
  styleUrls: ['./char-summary.component.css'],
})
export class CharSummaryComponent implements OnInit {
  @Input() character: any;
  @Input() characterData: any;
  constructor() {}

  ngOnInit(): void {}
}
