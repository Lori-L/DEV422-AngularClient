import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm | undefined;
  constructor(private userApiService: UserApiService) {}

  username: string = '';
  password: string = '';
  hasEmail: boolean = false;
  hasPassword: boolean = false;

  TestApi() {
    this.userApiService.getUserData('123').subscribe((data) => {
      console.log(data);
    });
  }

  Login() {
    if (!this.username || !this.password) {
      return console.log('empty inputs');
    }

    this.userApiService
      .Login(this.username, this.password)
      .subscribe((data) => {
        console.log(data);
      });
  }

  isEmailFilled: boolean = false;
  isPasswordFilled: boolean = false;

  ngOnInit(): void {}
}
