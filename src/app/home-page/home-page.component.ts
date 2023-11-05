import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedVariablesService } from '../shared-variables.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm | undefined;
  constructor(
    private userApiService: UserApiService,
    private router: Router,
    private sharedVariablesService: SharedVariablesService
  ) {}

  username: string = '';
  password: string = '';
  hasEmail: boolean = false;
  hasPassword: boolean = false;

  clearInputs() {
    this.username = '';
    this.password = '';
  }

  Login() {
    if (!this.username || !this.password) {
      this.username = '';
      this.password = '';
      return console.log('empty inputs');
    }

    this.userApiService
      .Login(this.username, this.password)
      .subscribe((data) => {
        if (data.message == 'true') {
          localStorage.setItem('userId', JSON.stringify(data._id));
          localStorage.setItem('username', JSON.stringify(this.username));
          this.sharedVariablesService.setSharedData(true, this.username);
          this.router.navigate(['/choose-view']);
        } else {
          console.log(data.message);
          this.clearInputs();
        }
      });
  }

  isEmailFilled: boolean = false;
  isPasswordFilled: boolean = false;

  ngOnInit(): void {}
}
