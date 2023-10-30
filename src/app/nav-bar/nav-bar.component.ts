import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  Logout() {
    this.dialog.open(LogoutDialogComponent);
  }
}
