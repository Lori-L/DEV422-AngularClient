import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spell',
  templateUrl: './spell.component.html',
  styleUrls: ['./spell.component.css'],
})
export class SpellComponent implements OnInit {
  @Input() spell: any;
  constructor() {}

  ngOnInit(): void {}
}
