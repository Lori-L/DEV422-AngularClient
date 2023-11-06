import { Component, OnInit } from '@angular/core';
import { DndApiServiceService } from '../dnd-api-service.service';

@Component({
  selector: 'app-char-creation-class-info',
  templateUrl: './char-creation-class-info.component.html',
  styleUrls: ['./char-creation-class-info.component.css']
})
export class CharCreationClassInfoComponent implements OnInit {

  constructor(private dndApiService: DndApiServiceService) { }

  

  ngOnInit(): void {
    
  }

}
