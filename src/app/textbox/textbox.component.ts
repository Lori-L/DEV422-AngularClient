import { Component, Input, OnInit } from '@angular/core';
import { DndApiServiceService } from '../dnd-api-service.service';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css'],
})
export class TextboxComponent implements OnInit {
  @Input() trait: any;
  @Input() characterData: any;

  constructor(private apiService: DndApiServiceService) {}

  ngOnInit(): void {}
}
