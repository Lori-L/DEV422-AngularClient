import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-num-box',
  templateUrl: './check-num-box.component.html',
  styleUrls: ['./check-num-box.component.css'],
})
export class CheckNumBoxComponent implements OnInit {
  @Input() title: any;
  @Input() value: any;
  @Input() savingThrows: any;

  isChecked = false;
  constructor() {}

  ngOnInit(): void {
    if (this.value > 12) {
      this.isChecked = true;
    }

    console.log(this.savingThrows, this.title.slice(0, 3).toLowerCase());

    if (this.areValuesEqual()) {
      this.isChecked = true;
    }
  }

  private areValuesEqual(): boolean {
    // Implement your logic to check if stringValue is present in stringArray
    return this.savingThrows.includes(this.title.slice(0, 3).toLowerCase());
  }
}
