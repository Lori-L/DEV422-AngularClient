import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { SharedVariablesService } from '../shared-variables.service';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css'],
})
export class LogoutDialogComponent implements OnInit {
  constructor(private sharedVariablesService: SharedVariablesService) {}

  ngOnInit(): void {}

  Logout() {
    // which is better to use in our case ?
    localStorage.clear();
    sessionStorage.clear();
    this.sharedVariablesService.setSharedData(false, null);
  }
}
