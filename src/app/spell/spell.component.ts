import { Component, Input, OnInit } from '@angular/core';
import { DndApiServiceService } from '../dnd-api-service.service';
@Component({
  selector: 'app-spell',
  templateUrl: './spell.component.html',
  styleUrls: ['./spell.component.css'],
})
export class SpellComponent implements OnInit {
  @Input() spell: any;
  @Input() spellName: any;
  @Input() spellDesc: any;

  constructor(private apiService: DndApiServiceService) {}

  ngOnInit(): void {
    this.apiService.SpellInfo(this.spell[0]).subscribe((data: any) => {
      this.spellDesc = data.desc;
    });
  }
}
