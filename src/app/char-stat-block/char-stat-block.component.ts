import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-char-stat-block',
  templateUrl: './char-stat-block.component.html',
  styleUrls: ['./char-stat-block.component.css'],
})
export class CharStatBlockComponent implements OnInit {
  @Input() modifier: any;
  @Input() total: any;
  constructor() {}

  ngOnInit(): void {}
}
