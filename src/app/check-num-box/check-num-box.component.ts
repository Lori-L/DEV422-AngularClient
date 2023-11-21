import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-num-box',
  templateUrl: './check-num-box.component.html',
  styleUrls: ['./check-num-box.component.css'],
})
export class CheckNumBoxComponent implements OnInit {
  @Input() title: any;
  @Input() value: any;

  isChecked = false;
  constructor() {}

  ngOnInit(): void {
    if (this.value > 12) {
      this.isChecked = true;
    }
  }
}
