import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { Router } from '@angular/router';
import { SharedVariablesService } from '../shared-variables.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    public sharedVariablesService: SharedVariablesService
  ) {}

  showMenu: boolean = true;
  ngOnInit(): void {
    this.localVals();
  }

  Logout() {
    this.dialog.open(LogoutDialogComponent);
  }

  GoHome() {
    if (localStorage.getItem('userId') != null) {
      this.router.navigate(['/choose-view']);
    } else {
      this.router.navigate(['/']);
    }
  }

  GoList() {
    if (localStorage.getItem('userId') != null) {
      this.router.navigate(['/characters']);
    }
  }

  GoCreate() {
    if (localStorage.getItem('userId') != null) {
      this.router.navigate(['/create-edit']);
    }
  }

  localVals() {
    if (localStorage.getItem('userId') != null) {
      this.sharedVariablesService.showMenu = true;
      this.sharedVariablesService.username = localStorage.getItem('username');
    } else {
      this.sharedVariablesService.showMenu = false;
      this.sharedVariablesService.username = null;
    }
  }
}
