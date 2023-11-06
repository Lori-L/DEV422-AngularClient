import { Component, OnInit } from '@angular/core';
import { CharClasses } from './charClasses';
import { DndApiServiceService } from '../dnd-api-service.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-char-creation-class-tab',
  templateUrl: './char-creation-class-tab.component.html',
  styleUrls: ['./char-creation-class-tab.component.css']
})
export class CharCreationClassTabComponent implements OnInit {

  constructor(private dndApiService: DndApiServiceService) {
  }
  
  charClasses: any[] = [];

  classList: any[] = [];

  totalLevel = 0;

  ngOnInit(): void {
    this.charClasses = JSON.parse(String(sessionStorage.getItem('classList')));
    console.log(this.charClasses);

    this.charClasses.forEach((element: any) => {
      this.totalLevel += element[1];
    })

    //Gets a list of classes from dnd api. Puts into classList.
    //Does not add to classList if the character already has that class (charClasses).
    this.dndApiService.ClassList().subscribe((data) => {
      let results = data.results;
      let validClass: boolean = false;

      results.forEach((apiClass: any) => {
        validClass = true;

        this.charClasses.forEach((charClass: any) => {
          if(apiClass.name == charClass[0]) {
            validClass = false;
          }
        });
        if(validClass) {
          this.classList.push(apiClass);
        }
      });

      console.log(this.classList);
    });
  }

}