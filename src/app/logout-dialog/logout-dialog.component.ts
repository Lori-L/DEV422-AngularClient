import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css'],
})
export class LogoutDialogComponent implements OnInit {
  constructor(private userApiService: UserApiService) {}

  ngOnInit(): void {}

  Logout() {
    // which is better to use in our case ?
    localStorage.clear();
    sessionStorage.clear();
  }
}
