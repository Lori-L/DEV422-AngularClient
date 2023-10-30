import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  Logout() {
    this.dialog.open(LogoutDialogComponent);
  }

  GoHome() {
    if (localStorage.getItem('userId') != null) {
      this.router.navigate(['/choose-view']);
    }
    else {
      this.router.navigate(['/']);
    }
  }

  GoList() {
    if (localStorage.getItem('userId') != null) {
      this.router.navigate(['/chars']);
    }
  }

  GoCreate() {
    if (localStorage.getItem('userId') != null) {
      this.router.navigate(['/create-edit']);
    }
  }
}
